import {
  CardanoAddressParameters,
  CardanoInput,
  CardanoOutput,
} from '../../types/trezor';
import { FinalOutput, Utxo } from '../../types/types';
import { parseAsset } from '../common';

interface AssetInPolicy {
  assetNameBytes: string;
  amount: string;
}
export const transformToTokenBundle = (
  assets: { unit: string; quantity: string }[],
) => {
  // prepare token bundle used in trezor output
  const uniquePolicies: string[] = [];
  assets.forEach(asset => {
    const { policyId } = parseAsset(asset.unit);
    if (!uniquePolicies.includes(policyId)) {
      uniquePolicies.push(policyId);
    }
  });

  const assetsByPolicy: {
    policyId: string;
    tokenAmounts: AssetInPolicy[];
  }[] = [];
  uniquePolicies.forEach(policyId => {
    const assetsInPolicy: AssetInPolicy[] = [];
    assets.forEach(asset => {
      const assetInfo = parseAsset(asset.unit);
      if (assetInfo.policyId !== policyId) return;

      assetsInPolicy.push({
        assetNameBytes: assetInfo.assetNameInHex,
        amount: asset.quantity,
      });
    }),
      assetsByPolicy.push({
        policyId,
        tokenAmounts: assetsInPolicy,
      });
  });

  return assetsByPolicy;
};

export const transformToTrezorInput = (
  utxo: Utxo,
  path: string,
): CardanoInput => ({
  path: path,
  prev_hash: utxo.txHash,
  prev_index: utxo.outputIndex,
});

export const transformToTrezorOutput = (output: FinalOutput): CardanoOutput => {
  let params:
    | { address: string }
    | { addressParameters: CardanoAddressParameters };

  if (output.addressParameters) {
    params = {
      addressParameters: output.addressParameters,
    };
  } else {
    params = {
      address: output.address,
    };
  }

  return {
    ...params,
    amount: output.amount,
    tokenBundle: output.assets ? transformToTokenBundle(output.assets) : [],
  };
};
