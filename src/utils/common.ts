import * as CardanoWasm from '@emurgo/cardano-serialization-lib-browser';
import { dummyStakingAddress, dummyStakingKeyHash } from '../constants';
import {
  ExternalOutput,
  Certificate,
  Output,
  Utxo,
  CertificateType,
  Withdrawal,
} from '../types/types';

export const CARDANO = {
  PROTOCOL_MAGICS: {
    mainnet: 764824073,
    testnet: 1097911063,
  },
  NETWORK_IDS: {
    mainnet: 1,
    testnet: 0,
  },
  ADDRESS_TYPE: {
    Base: 0,
    Pointer: 4,
    Enterprise: 6,
    Byron: 8,
    Reward: 14,
  },
  CERTIFICATE_TYPE: {
    StakeRegistration: 0,
    StakeDeregistration: 1,
    StakeDelegation: 2,
    StakePoolRegistration: 3,
  },
} as const;

export const bigNumFromStr = (num: string): CardanoWasm.BigNum =>
  CardanoWasm.BigNum.from_str(num);

export const getProtocolMagic = (
  tesnet?: boolean,
):
  | typeof CARDANO.PROTOCOL_MAGICS['mainnet']
  | typeof CARDANO.PROTOCOL_MAGICS['testnet'] =>
  tesnet ? CARDANO.PROTOCOL_MAGICS.testnet : CARDANO.PROTOCOL_MAGICS.mainnet;

export const getNetworkId = (
  testnet?: boolean,
):
  | typeof CARDANO.NETWORK_IDS['mainnet']
  | typeof CARDANO.NETWORK_IDS['testnet'] =>
  testnet ? CARDANO.NETWORK_IDS.testnet : CARDANO.NETWORK_IDS.mainnet;

export const getAddressType = (
  byron?: boolean,
): typeof CARDANO.ADDRESS_TYPE.Byron | typeof CARDANO.ADDRESS_TYPE.Base =>
  byron ? CARDANO.ADDRESS_TYPE.Byron : CARDANO.ADDRESS_TYPE.Base;

export const parseAsset = (
  hex: string,
): {
  policyId: string;
  assetNameInHex: string;
} => {
  const policyIdSize = 56;
  const policyId = hex.slice(0, policyIdSize);
  const assetNameInHex = hex.slice(policyIdSize);
  return {
    policyId,
    assetNameInHex,
  };
};

export const buildMultiAsset = (
  multiAsset: CardanoWasm.MultiAsset,
  assets: {
    unit: string;
    quantity: string;
  }[],
): CardanoWasm.MultiAsset => {
  assets.forEach(assetEntry => {
    const asset = CardanoWasm.Assets.new();
    const { policyId, assetNameInHex } = parseAsset(assetEntry.unit);
    asset.insert(
      CardanoWasm.AssetName.new(Buffer.from(assetNameInHex, 'hex')),
      bigNumFromStr(assetEntry.quantity),
    );
    const scriptHash = CardanoWasm.ScriptHash.from_bytes(
      Buffer.from(policyId, 'hex'),
    );
    multiAsset.insert(scriptHash, asset);
  });
  return multiAsset;
};

export const getMinAdaRequired = (
  multiAsset: CardanoWasm.MultiAsset | null,
  minUtxoValue = bigNumFromStr('1000000'),
): CardanoWasm.BigNum => {
  if (!multiAsset) return minUtxoValue;
  const Value = CardanoWasm.Value.new(minUtxoValue);
  Value.set_multiasset(multiAsset);
  return CardanoWasm.min_ada_required(Value, minUtxoValue);
};

export const getAssetAmount = (obj: Pick<Utxo, 'amount'>, asset = 'lovelace') =>
  obj.amount.find(a => a.unit === asset)?.quantity ?? '0';

export const getSumAssetAmount = (utxos: Utxo[], asset = 'lovelace') =>
  utxos.reduce(
    (acc, utxo) => acc.checked_add(bigNumFromStr(getAssetAmount(utxo, asset))),
    bigNumFromStr('0'),
  );

export const getSumOutputAmount = (outputs: Output[], asset = 'lovelace') =>
  outputs.reduce(
    (acc, output) =>
      acc.checked_add(
        bigNumFromStr(
          output.assets?.find(a => a.unit === asset)?.quantity ?? '0',
        ),
      ),
    bigNumFromStr('0'),
  );

export const sortUtxos = (utxos: Utxo[], asset = 'lovelace') =>
  utxos.sort((u1, u2) =>
    bigNumFromStr(getAssetAmount(u2, asset)).compare(
      bigNumFromStr(getAssetAmount(u1, asset)),
    ),
  );

export const getInputCost = (
  txBuilder: CardanoWasm.TransactionBuilder,
  utxo: Utxo,
): {
  input: Utxo;
  inputFee: CardanoWasm.BigNum;
} => {
  // Calculate additional fee required to add utxo to a transaction
  const input = CardanoWasm.TransactionInput.new(
    CardanoWasm.TransactionHash.from_bytes(Buffer.from(utxo.txHash, 'hex')),
    utxo.outputIndex,
  );

  const inputValue = CardanoWasm.Value.new(bigNumFromStr(getAssetAmount(utxo)));
  const assets = utxo.amount.filter(a => a.unit !== 'lovelace');
  if (assets) {
    const multiAsset = CardanoWasm.MultiAsset.new();
    buildMultiAsset(multiAsset, assets);
    inputValue.set_multiasset(multiAsset);
  }

  const utxoAddr = CardanoWasm.Address.from_bech32(utxo.address);
  const inputFee = txBuilder.fee_for_input(utxoAddr, input, inputValue); // does utxoAddr make sense here?
  return {
    input: utxo,
    inputFee,
  };
};

export const getOutputCost = (
  txBuilder: CardanoWasm.TransactionBuilder,
  output: Pick<ExternalOutput, 'amount' | 'assets' | 'address'>,
  assets: { unit: string; quantity: string }[] | null,
  minUtxoValue = bigNumFromStr('1000000'),
) => {
  let minOutputAmount = minUtxoValue; // ADA only output
  let outputValue = CardanoWasm.Value.new(minOutputAmount);

  if (assets?.length) {
    const multiAsset = CardanoWasm.MultiAsset.new();
    buildMultiAsset(multiAsset, assets);

    minOutputAmount = getMinAdaRequired(multiAsset, minUtxoValue);
    outputValue = CardanoWasm.Value.new(minOutputAmount);
    outputValue.set_multiasset(multiAsset);
  }

  const outputAddr = CardanoWasm.Address.from_bech32(output.address); // TODO: compatibility with byron
  const testOutput = CardanoWasm.TransactionOutput.new(outputAddr, outputValue);
  const outputFee = txBuilder.fee_for_output(testOutput);
  return {
    output,
    outputFee,
    minOutputAmount, // should match https://cardano-ledger.readthedocs.io/en/latest/explanations/min-utxo.html
  };
};

export const prepareWithdrawals = (
  withdrawals: Withdrawal[],
): CardanoWasm.Withdrawals => {
  const preparedWithdrawals = CardanoWasm.Withdrawals.new();

  withdrawals.forEach(withdrawal => {
    const rewardAddress = CardanoWasm.RewardAddress.from_address(
      CardanoWasm.Address.from_bech32(
        withdrawal.stakingAddress ?? dummyStakingAddress,
      ),
    );

    if (rewardAddress) {
      preparedWithdrawals.insert(
        rewardAddress,
        bigNumFromStr(withdrawal.amount),
      );
    }
  });

  return preparedWithdrawals;
};

export const prepareCertificates = (
  certificates: Certificate[],
): CardanoWasm.Certificates => {
  const preparedCertificates = CardanoWasm.Certificates.new();

  const buildStakeCred = (stakingKeyHash?: string) =>
    CardanoWasm.StakeCredential.from_keyhash(
      CardanoWasm.Ed25519KeyHash.from_bech32(
        stakingKeyHash ?? dummyStakingKeyHash,
      ),
    );

  certificates.forEach(cert => {
    if (cert.type === CertificateType.STAKE_REGISTRATION) {
      preparedCertificates.add(
        CardanoWasm.Certificate.new_stake_registration(
          CardanoWasm.StakeRegistration.new(
            buildStakeCred(cert.stakingKeyHash),
          ),
        ),
      );
    } else if (cert.type === CertificateType.STAKE_DELEGATION) {
      preparedCertificates.add(
        CardanoWasm.Certificate.new_stake_delegation(
          CardanoWasm.StakeDelegation.new(
            buildStakeCred(cert.stakingKeyHash),
            CardanoWasm.Ed25519KeyHash.from_bytes(
              Buffer.from(cert.pool, 'hex'),
            ),
          ),
        ),
      );
    } else if (cert.type === CertificateType.STAKE_DEREGISTRATION) {
      preparedCertificates.add(
        CardanoWasm.Certificate.new_stake_deregistration(
          CardanoWasm.StakeDeregistration.new(
            buildStakeCred(cert.stakingKeyHash),
          ),
        ),
      );
    }
  });
  return preparedCertificates;
};

export function calculateRequiredDeposit(
  certificates: Certificate[],
): CardanoWasm.BigNum {
  const CertificateDeposit = {
    [CertificateType.STAKE_DELEGATION]: '0',
    [CertificateType.STAKE_POOL_REGISTRATION]: '500000000',
    [CertificateType.STAKE_REGISTRATION]: '2000000',
    [CertificateType.STAKE_DEREGISTRATION]: '-2000000',
  } as const;
  return certificates.reduce(
    (acc, cert) =>
      acc.checked_add(bigNumFromStr(CertificateDeposit[cert.type])),
    bigNumFromStr('0'),
  );
}
