import {
  CardanoAddressParameters,
  CardanoInput,
  CardanoOutput,
} from '../../types/trezor';
import { Asset, FinalOutput, Utxo } from '../../types/types';
import { parseAsset } from '../common';

interface AssetInPolicy {
  assetNameBytes: string;
  amount: string;
}
export const transformToTokenBundle = (assets: Asset[]) => {
  // prepare token bundle used in trezor output
  if (assets.length === 0) return undefined;

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

export const transformToTrezorInputs = (
  utxos: Utxo[],
  trezorUtxos: { txid: string; vout: number; path: string }[],
): CardanoInput[] => {
  return utxos.map(utxo => {
    const utxoWithPath = trezorUtxos.find(
      u => u.txid === utxo.txHash && u.vout === utxo.outputIndex,
    );
    // shouldn't happen since utxos should be subset of trezorUtxos (with different shape/fields)
    if (!utxoWithPath)
      throw Error(`Cannot transform utxo ${utxo.txHash}:${utxo.outputIndex}`);

    return {
      path: utxoWithPath.path,
      prev_hash: utxo.txHash,
      prev_index: utxo.outputIndex,
    };
  });
};

export const transformToTrezorOutputs = (
  outputs: FinalOutput[],
  changeAddressParameters: CardanoAddressParameters,
): CardanoOutput[] => {
  return outputs.map(output => {
    let params:
      | { address: string }
      | { addressParameters: CardanoAddressParameters };

    if (output.isChange) {
      params = {
        addressParameters: changeAddressParameters,
      };
    } else {
      params = {
        address: output.address,
      };
    }

    return {
      ...params,
      amount: output.amount,
      tokenBundle: transformToTokenBundle(output.assets),
    };
  });
};
