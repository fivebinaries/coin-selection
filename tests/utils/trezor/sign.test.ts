import * as CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';
import * as utils from '../../../src/utils/trezor/sign';
import * as fixtures from './fixtures/sign';

describe('trezor sign utils', () => {
  fixtures.sign.forEach(f => {
    test(f.description, async () => {
      const signedTx = await utils.signTransaction(f.hex, f.witnesses, {
        testnet: f.testnet,
      });
      expect(
        await utils.signTransaction(f.hex, f.witnesses, { testnet: f.testnet }),
      ).toBe(f.signedTx);

      const tx = CardanoWasm.Transaction.from_bytes(
        Buffer.from(signedTx, 'hex'),
      );
      const txhash = Buffer.from(
        CardanoWasm.hash_transaction(tx.body()).to_bytes(),
      ).toString('hex');

      // just sanity check, signing shouldn't change the hash
      expect(txhash).toBe(f.txHash);
    });
  });
});
