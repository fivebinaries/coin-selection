import { ERROR } from './constants';
import { largestFirst } from './methods/largestFirst';
import {
  Certificate,
  ChangeAddress,
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
  changeAddress: ChangeAddress,
  certificates: Certificate[],
  withdrawals: Withdrawal[],
  options?: Options,
): PrecomposedTransaction => {
  if (utxos.length === 0) {
    throw Error(ERROR.UTXO_BALANCE_INSUFFICIENT.code);
  }

  const res = largestFirst(
    utxos,
    outputs,
    changeAddress,
    certificates,
    withdrawals,
    options,
  );
  const incompleteOutputs = res.outputs.find(
    o => (!o.address && !o.addressParameters) || !o.amount,
  );

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

export * as trezorUtils from './utils/trezor/transformations';
export * as types from './types/types';
