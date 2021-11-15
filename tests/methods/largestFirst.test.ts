import * as fixtures from './fixtures/largestFirst';
import { largestFirst } from '../../src/methods/largestFirst';
import { sanityCheck } from '../setup';

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
      sanityCheck(res);
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
