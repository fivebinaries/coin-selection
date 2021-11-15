import * as utils from '../../src/utils/common';
import * as fixtures from './fixtures/common';

describe('common utils', () => {
  test('multiAssetToArray', () => {
    const multiAsset = utils.buildMultiAsset([
      {
        quantity: '1000',
        unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
      },
    ]);
    const res = utils.multiAssetToArray(multiAsset);
    expect(res).toMatchObject([
      {
        quantity: '1000',
        unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
      },
    ]);
  });

  fixtures.filterUtxos.forEach(f => {
    test(f.description, () => {
      expect(utils.filterUtxos(f.utxos, f.asset)).toMatchObject(f.result);
    });
  });
});
