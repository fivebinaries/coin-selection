import { ERROR } from './constants';
import { largestFirst } from './methods/largestFirst';
import { randomImprove } from './methods/randomImprove';
import { CoinSelectionError } from './utils/errors';
import { getLogger } from './utils/logger';
import {
  Certificate,
  FinalOutput,
  Options,
  PrecomposedTransaction,
  UserOutput,
  Utxo,
  Withdrawal,
} from './types/types';

export const coinSelection = (
  utxos: Utxo[],
  outputs: UserOutput[],
  changeAddress: string,
  certificates: Certificate[],
  withdrawals: Withdrawal[],
  accountPubKey: string,
  options?: Options,
): PrecomposedTransaction => {
  const logger = getLogger(!!options?.debug);
  logger.debug(
    JSON.stringify(
      {
        utxos,
        outputs,
        changeAddress,
        certificates,
        withdrawals,
        accountPubKey,
        options,
      },
      null,
      2,
    ),
  );

  if (utxos.length === 0) {
    logger.debug('Empty Utxo set');
    throw new CoinSelectionError(ERROR.UTXO_BALANCE_INSUFFICIENT);
  }

  // logger.profile('coin-selection-alg');
  const t1 = new Date().getTime();
  let res;
  if (
    outputs.find(o => o.setMax) ||
    certificates.length > 0 ||
    withdrawals.length > 0 ||
    options?.forceLargestFirstSelection
  ) {
    logger.debug('Running largest-first alg');
    res = largestFirst(
      utxos,
      outputs,
      changeAddress,
      certificates,
      withdrawals,
      accountPubKey,
      options,
    );
  } else {
    logger.debug('Running random-improve alg');
    try {
      res = randomImprove(utxos, outputs, changeAddress, options);
    } catch (error) {
      if (
        error instanceof CoinSelectionError &&
        error.code === 'UTXO_NOT_FRAGMENTED_ENOUGH'
      ) {
        logger.debug(
          `random-improve failed with ${error.code}. Retrying with largest-first alg.`,
        );
        res = largestFirst(
          utxos,
          outputs,
          changeAddress,
          certificates,
          withdrawals,
          accountPubKey,
          options,
        );
      } else {
        throw error;
      }
    }
  }

  const t2 = new Date().getTime();
  logger.debug(`Duration: ${(t2 - t1) / 1000} seconds`);

  const incompleteOutputs = res.outputs.find(o => !o.address || !o.amount);

  if (incompleteOutputs) {
    logger.debug('Returning selection for a draft transaction');
    const selection = {
      type: 'nonfinal',
      fee: res.fee,
      totalSpent: res.totalSpent,
      deposit: res.deposit,
      withdrawal: res.withdrawal,
      max: res.max,
    } as const;
    logger.debug(JSON.stringify(selection, null, 2));
    return selection;
  } else {
    logger.debug('Coin selection for a final transaction');
    const selection = {
      type: 'final',
      ...res,
      outputs: res.outputs as FinalOutput[],
    } as const;
    logger.debug(JSON.stringify(selection, null, 2));
    return selection;
  }
};

export * as trezorUtils from './utils/trezor';
export * as types from './types/types';
export { CoinSelectionError } from './utils/errors';
