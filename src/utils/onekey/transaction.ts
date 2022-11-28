import BigNumber from 'bignumber.js';
import { coinSelection } from '../../index';
import { PrecomposedTransaction, UserOutput, Utxo } from '../../types/types';
import { getLogger } from '../logger';
import { ITransferInfo, IAdaUTXO, IOutput } from './types';

export const composeTxPlan = (
  transferInfo: ITransferInfo,
  accountXpub: string,
  utxos: IAdaUTXO[],
  changeAddress: string,
  outputs: IOutput[],
  options?: { debug: boolean },
): Promise<PrecomposedTransaction> => {
  const logger = getLogger(!!options?.debug);
  const transformUtxos = utxos.map(utxo => ({
    ...utxo,
    txHash: utxo.tx_hash,
    outputIndex: utxo.output_index,
    address: utxo.address ?? transferInfo.from,
  }));
  try {
    const txPlan = coinSelection(
      {
        utxos: transformUtxos as unknown as Utxo[],
        outputs: outputs as UserOutput[],
        changeAddress,
        certificates: [],
        withdrawals: [],
        accountPubKey: accountXpub,
      },
      {
        debug: options?.debug ?? false,
      },
    );
    return Promise.resolve(txPlan);
  } catch (err: unknown) {
    if ((err as { code: string })?.code === 'UTXO_BALANCE_INSUFFICIENT') {
      logger.debug('UTxO balance insufficient');
      if (outputs.length === 1) {
        const fixedOutput = [...outputs];
        const amountBN = new BigNumber(outputs[0].amount);
        const oneLovelace = new BigNumber('100000');
        if (amountBN.gte(oneLovelace)) {
          fixedOutput[0].amount = amountBN.minus(oneLovelace).toFixed();
          return composeTxPlan(
            transferInfo,
            accountXpub,
            utxos,
            changeAddress,
            fixedOutput,
          );
        }
      }
      throw err;
    } else {
      throw err;
    }
  }
};
