import * as fixtures from './fixtures/randomImprove';
import { randomImprove } from '../../src/methods/randomImprove';
import { sanityCheck } from '../setup';

describe('coinSelection - randomImprove', () => {
  fixtures.nonFinalCompose.forEach(f => {
    test(f.description, () => {
      const res = randomImprove(f.utxos, f.outputs, f.changeAddress, f.options);
      expect(res).toMatchObject(f.result);
    });
  });

  fixtures.coinSelection.forEach(f => {
    test(f.description, () => {
      const res = randomImprove(f.utxos, f.outputs, f.changeAddress, f.options);
      expect(res).toMatchObject(f.result);
      sanityCheck(res);
    });
  });

  fixtures.exceptions.forEach(f => {
    test(f.description, () => {
      const res = () =>
        randomImprove(f.utxos, f.outputs, f.changeAddress, f.options);
      expect(res).toThrowError(expect.objectContaining({ code: f.result }));
    });
  });
});
