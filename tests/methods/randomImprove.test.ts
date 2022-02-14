import * as fixtures from './fixtures/randomImprove';
import { randomImprove } from '../../src/methods/randomImprove';
import { sanityCheck } from '../setup';

describe('coinSelection - randomImprove', () => {
  fixtures.nonFinalCompose.forEach(f => {
    const { utxos, outputs, changeAddress } = f;

    test(f.description, () => {
      const res = randomImprove(
        {
          utxos,
          outputs,
          changeAddress,
        },
        f.options,
      );
      expect(res).toMatchObject(f.result);
    });
  });

  fixtures.coinSelection.forEach(f => {
    const { utxos, outputs, changeAddress, ttl } = f;

    test(f.description, () => {
      const res = randomImprove(
        {
          utxos,
          outputs,
          changeAddress,
          ttl,
        },
        f.options,
      );
      expect(res).toMatchObject(f.result);
      sanityCheck(res);
    });
  });

  fixtures.exceptions.forEach(f => {
    const { utxos, outputs, changeAddress } = f;
    test(f.description, () => {
      const res = () =>
        randomImprove(
          {
            utxos,
            outputs,
            changeAddress,
          },
          f.options,
        );
      expect(res).toThrowError(expect.objectContaining({ code: f.result }));
    });
  });
});
