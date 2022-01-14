import * as utils from '../../../src/utils/trezor/transformations';
import * as fixtures from './fixtures/transformations';
import { FinalOutput } from '../../../src/types/types';

describe('trezor transformation utils', () => {
  fixtures.transformToTrezorOutputs.forEach(f => {
    test(f.description, () => {
      expect(
        utils.transformToTrezorOutputs(
          f.outputs as FinalOutput[],
          f.changeAddressParameters,
        ),
      ).toMatchObject(f.result);
    });
  });
});
