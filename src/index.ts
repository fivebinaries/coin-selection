import { ERROR } from './constants';
import { largestFirst } from './methods/largestFirst';
import { CoinSelectionError } from './utils/errors';
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
  if (utxos.length === 0) {
    throw new CoinSelectionError(ERROR.UTXO_BALANCE_INSUFFICIENT);
  }

  const res = largestFirst(
    utxos,
    outputs,
    changeAddress,
    certificates,
    withdrawals,
    accountPubKey,
    options,
  );
  const incompleteOutputs = res.outputs.find(o => !o.address || !o.amount);

  if (incompleteOutputs) {
    return {
      type: 'nonfinal',
      fee: res.fee,
      totalSpent: res.totalSpent,
      deposit: res.deposit,
      withdrawal: res.withdrawal,
      max: res.max,
    };
  } else {
    return { type: 'final', ...res, outputs: res.outputs as FinalOutput[] };
  }
};

export * as trezorUtils from './utils/trezor';
export * as types from './types/types';
export { CoinSelectionError } from './utils/errors';
