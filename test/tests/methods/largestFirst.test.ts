import * as fixtures from '../../fixtures/largestFirst';
import {
  BigNum,
  TransactionBody,
} from '@emurgo/cardano-serialization-lib-browser';
import { largestFirst } from '../../../src/methods/largestFirst';
import { multiAssetToArray } from '../../../src/utils/common';

describe('coinSelection - largestFirst', () => {
  fixtures.nonFinalCompose.forEach(f => {
    test(f.description, () => {
      const res = largestFirst(
        f.utxos,
        f.outputs,
        f.changeAddress,
        f.certificates,
        f.withdrawals,
        f.accountPubKey,
        f.options,
      );

      expect(res).toMatchObject(f.result);
    });
  });

  fixtures.coinSelection.forEach(f => {
    test(f.description, () => {
      const res = largestFirst(
        f.utxos,
        f.outputs,
        f.changeAddress,
        f.certificates,
        f.withdrawals,
        f.accountPubKey,
        f.options,
      );

      expect(res).toMatchObject(f.result);

      const totalAdaInputs = res.inputs
        .reduce(
          (acc, input) =>
            acc.checked_add(
              BigNum.from_str(
                input.amount.find(a => a.unit === 'lovelace').quantity || '0',
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
        totalAdaOutputs = totalAdaOutputs.checked_add(
          BigNum.from_str(res.deposit),
        );
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
    });
  });

  fixtures.exceptions.forEach(f => {
    test(f.description, () => {
      const res = () =>
        largestFirst(
          f.utxos,
          f.outputs,
          f.changeAddress,
          f.certificates,
          f.withdrawals,
          f.accountPubKey,
          f.options,
        );

      expect(res).toThrowError(expect.objectContaining({ code: f.result }));
    });
  });
});
