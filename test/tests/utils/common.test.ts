import * as utils from '../../../src/utils/common';

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
});
