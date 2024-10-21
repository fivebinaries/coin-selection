jest.setTimeout(30000);

import {
  BigNum,
  TransactionBody,
} from '@emurgo/cardano-serialization-lib-nodejs';
import { CoinSelectionResult } from '../src/types/types';
import { multiAssetToArray } from '../src/utils/common';

export const sanityCheck = (res: CoinSelectionResult): void => {
  const totalAdaInputs = res.inputs
    .reduce(
      (acc, input) =>
        acc.checked_add(
          BigNum.from_str(
            input.amount.find(a => a.unit === 'lovelace')?.quantity || '0',
          ),
        ),
      BigNum.from_str('0'),
    )
    .checked_add(BigNum.from_str(res.withdrawal));

  let totalAdaOutputs = res.outputs.reduce(
    (acc, output) => acc.checked_add(BigNum.from_str(output.amount ?? '0')),
    BigNum.from_str('0'),
  );
  if (res.deposit.startsWith('-')) {
    totalAdaOutputs = totalAdaOutputs.clamped_sub(
      BigNum.from_str(res.deposit.slice(1)),
    );
  } else {
    totalAdaOutputs = totalAdaOutputs.checked_add(BigNum.from_str(res.deposit));
  }

  // Check ADA value: inputs + withdrawals (rewards) = outputs + fee
  const delta = totalAdaInputs.compare(
    totalAdaOutputs.checked_add(BigNum.from_str(res.fee)),
  );

  expect(delta).toBe(0);

  // txBody sanity check
  const tx = TransactionBody.from_bytes(Buffer.from(res.tx.body, 'hex'));
  expect(tx.inputs().len()).toBe(res.inputs.length);
  expect(tx.outputs().len()).toBe(res.outputs.length);

  for (let i = 0; i < res.outputs.length; i++) {
    // lovelace amount
    expect(tx.outputs().get(i).amount().coin().to_str()).toBe(
      res.outputs[i].amount,
    );
    // address
    expect(tx.outputs().get(i).address().to_bech32()).toBe(
      res.outputs[i].address,
    );
    // assets
    expect(
      multiAssetToArray(tx.outputs().get(i).amount().multiasset()),
    ).toMatchObject(res.outputs[i].assets);
  }

  // fee set in txBuilder really matches fee returned in json object
  expect(res.fee).toBe(tx.fee().to_str());
};
