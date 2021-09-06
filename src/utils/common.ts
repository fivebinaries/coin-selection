import * as CardanoWasm from '@emurgo/cardano-serialization-lib-browser';
import {
  dummyStakingAddress,
  dummyStakingKeyHash,
  CertificateType,
  dummyAddress,
  ERROR,
} from '../constants';
import {
  Certificate,
  Output,
  Utxo,
  Withdrawal,
  ChangeAddress,
  OutputCost,
  UserOutput,
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
  assets: {
    unit: string;
    quantity: string;
  }[],
): CardanoWasm.MultiAsset => {
  const multiAsset = CardanoWasm.MultiAsset.new();
  assets.forEach(assetEntry => {
    const asset = CardanoWasm.Assets.new();
    const { policyId, assetNameInHex } = parseAsset(assetEntry.unit);
    asset.insert(
      CardanoWasm.AssetName.new(Buffer.from(assetNameInHex, 'hex')),
      bigNumFromStr(assetEntry.quantity || '0'), // fallback for an empty string
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

export const getAssetAmount = (
  obj: Pick<Utxo, 'amount'>,
  asset = 'lovelace',
): string => obj.amount.find(a => a.unit === asset)?.quantity ?? '0';

export const getSumAssetAmount = (
  utxos: Utxo[],
  asset = 'lovelace',
): CardanoWasm.BigNum =>
  utxos.reduce(
    (acc, utxo) => acc.checked_add(bigNumFromStr(getAssetAmount(utxo, asset))),
    bigNumFromStr('0'),
  );

export const getSumOutputAmount = (
  outputs: Output[],
  asset = 'lovelace',
): CardanoWasm.BigNum =>
  outputs.reduce(
    (acc, output) =>
      acc.checked_add(
        bigNumFromStr(
          output.assets?.find(a => a.unit === asset)?.quantity ?? '0',
        ),
      ),
    bigNumFromStr('0'),
  );

export const sortUtxos = (utxos: Utxo[], asset = 'lovelace'): Utxo[] => {
  const copy: Utxo[] = JSON.parse(JSON.stringify(utxos));
  return copy.sort((u1, u2) =>
    bigNumFromStr(getAssetAmount(u2, asset)).compare(
      bigNumFromStr(getAssetAmount(u1, asset)),
    ),
  );
};

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
    const multiAsset = buildMultiAsset(assets);
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
  output: Output,
  minUtxoValue = bigNumFromStr('1000000'),
): OutputCost => {
  let minOutputAmount = minUtxoValue; // ADA only output
  let outputValue = CardanoWasm.Value.new(minOutputAmount);

  if (output.assets.length > 0) {
    const multiAsset = buildMultiAsset(output.assets);
    minOutputAmount = getMinAdaRequired(multiAsset, minUtxoValue);
    outputValue = CardanoWasm.Value.new(minOutputAmount);
    outputValue.set_multiasset(multiAsset);
  }

  const outputAddr = CardanoWasm.Address.from_bech32(
    output.address ?? dummyAddress,
  ); // TODO: compatibility with byron
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
      CardanoWasm.Ed25519KeyHash.from_bytes(
        Uint8Array.from(
          Buffer.from(stakingKeyHash ?? dummyStakingKeyHash, 'hex'),
        ),
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

export const calculateRequiredDeposit = (
  certificates: Certificate[],
): number => {
  const CertificateDeposit = {
    [CertificateType.STAKE_DELEGATION]: 0,
    [CertificateType.STAKE_POOL_REGISTRATION]: 500000000,
    [CertificateType.STAKE_REGISTRATION]: 2000000,
    [CertificateType.STAKE_DEREGISTRATION]: -2000000,
  } as const;
  return certificates.reduce(
    (acc, cert) => (acc += CertificateDeposit[cert.type]),
    0,
  );
};

export const setMinUtxoValueForOutputs = (
  txBuilder: CardanoWasm.TransactionBuilder,
  outputs: UserOutput[],
): UserOutput[] => {
  const preparedOutputs = outputs.map(output => {
    // sets minimal output ADA amount in case of multi-asset output
    const { minOutputAmount } = getOutputCost(txBuilder, output);
    const outputAmount = bigNumFromStr(output.amount || '0');

    let amount;
    if (output.assets.length > 0 && outputAmount.compare(minOutputAmount) < 0) {
      amount = minOutputAmount.to_str();
    } else {
      amount = output.amount;
    }

    if (output.setMax) {
      // if setMax is active set initial value to 0
      if (output.assets.length > 0) {
        output.assets[0].quantity = '0';
      } else {
        amount = '0';
      }
    }

    return {
      ...output,
      // if output contains assets make sure that minUtxoValue is at least minOutputAmount  (even for output where we want to setMax)
      amount,
    } as UserOutput;
  });
  return preparedOutputs;
};

export const prepareChangeOutput = (
  txBuilder: CardanoWasm.TransactionBuilder,
  usedUtxos: Utxo[],
  preparedOutputs: Output[],
  changeAddress: ChangeAddress,
  utxosTotalAmount: CardanoWasm.BigNum,
  totalOutputAmount: CardanoWasm.BigNum,
  totalFeesAmount: CardanoWasm.BigNum,
  byron?: boolean,
): OutputCost | null => {
  // change output amount should be lowered by the cost of the change output (fee + minUtxoVal)
  // The cost will be subtracted once we calculate it.
  const placeholderChangeOutputAmount = utxosTotalAmount.clamped_sub(
    totalFeesAmount.checked_add(totalOutputAmount),
  );
  const uniqueAssets: string[] = [];
  usedUtxos.forEach(utxo => {
    const assets = utxo.amount.filter(a => a.unit !== 'lovelace');
    assets.forEach(asset => {
      if (!uniqueAssets.includes(asset.unit)) {
        uniqueAssets.push(asset.unit);
      }
    });
  });

  const changeOutputAssets = uniqueAssets
    .map(assetUnit => {
      const assetInputAmount = getSumAssetAmount(usedUtxos, assetUnit);
      const assetSpentAmount = getSumOutputAmount(preparedOutputs, assetUnit);
      return {
        unit: assetUnit,
        quantity: assetInputAmount.clamped_sub(assetSpentAmount).to_str(),
      };
    })
    .filter(asset => asset.quantity !== '0');

  const changeOutputCost = getOutputCost(txBuilder, {
    address: changeAddress.address,
    amount: placeholderChangeOutputAmount.to_str(),
    assets: changeOutputAssets,
  });

  // calculate change output amount as utxosTotalAmount - totalFeesAmount - change output fee
  const totalSpent = totalOutputAmount
    .checked_add(totalFeesAmount)
    .checked_add(changeOutputCost.outputFee);
  let changeOutputAmount = utxosTotalAmount.clamped_sub(totalSpent);

  // Sum of all tokens in utxos must be same as sum of the tokens in external + change outputs
  // If computed change output doesn't contain any tokens then it makes sense to add it only if the fee + minUtxoValue is less then the amount
  const isChangeOutputNeeded =
    changeOutputAssets.length > 0 ||
    changeOutputAmount.compare(changeOutputCost.minOutputAmount) >= 0;

  if (isChangeOutputNeeded) {
    if (changeOutputAmount.compare(changeOutputCost.minOutputAmount) < 0) {
      // computed change amount would be below minUtxoValue
      // set change output amount to met minimum requirements for minUtxoValue
      changeOutputAmount = changeOutputCost.minOutputAmount;
    }

    // WARNING: It returns a change output also in a case where although it is needed because it contains additional assets but we don't have enough utxos to cover the output cost
    return {
      outputFee: changeOutputCost.outputFee,
      minOutputAmount: changeOutputCost.minOutputAmount,
      output: {
        amount: changeOutputAmount.to_str(),
        addressParameters: {
          path: changeAddress.path,
          addressType: getAddressType(byron),
          stakingPath: changeAddress.stakingPath,
        },
        assets: changeOutputAssets,
      },
    };
  }
  // Change output not needed
  return null;
};

export const getTxBuilder = (a = '44'): CardanoWasm.TransactionBuilder =>
  CardanoWasm.TransactionBuilder.new(
    CardanoWasm.LinearFee.new(bigNumFromStr(a), bigNumFromStr('155381')),
    bigNumFromStr('1000000'),
    // pool deposit
    bigNumFromStr('500000000'),
    // key deposit
    bigNumFromStr('2000000'),
  );

export const assetsAmountSatisfied = (
  utxos: Utxo[],
  outputs: Output[],
): boolean => {
  let assetsAmountSatisfied = true;
  outputs.forEach(output => {
    if (output.assets.length > 0) {
      const asset = output.assets[0];
      const assetAmountInUtxos = getSumAssetAmount(utxos, asset.unit);
      if (assetAmountInUtxos.compare(bigNumFromStr(asset.quantity)) < 0) {
        assetsAmountSatisfied = false;
      }
    }
  });
  return assetsAmountSatisfied;
};

export const getInitialUtxoSet = (
  utxos: Utxo[],
  maxOutput: UserOutput | undefined,
): {
  used: Utxo[];
  remaining: Utxo[];
} => {
  // Picks all utxos containing an asset on which the user requested to set maximum value
  if (!maxOutput)
    return {
      used: [],
      remaining: utxos,
    };

  const used: Utxo[] = [];
  const remaining: Utxo[] = [];

  const maxOutputAsset = maxOutput.assets[0]?.unit ?? 'lovelace';
  // either all UTXOs will be used (send max for ADA output) or initial set of used utxos will contain all utxos containing given token
  utxos.forEach(u => {
    if (u.amount.find(a => a.unit === maxOutputAsset)) {
      used.push(u);
    } else {
      remaining.push(u);
    }
  });
  return {
    used,
    remaining,
  };
};

export const setMaxOutput = (
  maxOutput: UserOutput,
  changeOutput: OutputCost | null,
): {
  maxOutput: UserOutput;
  changeOutput: OutputCost | null;
  newMaxAmount: CardanoWasm.BigNum;
  maxOutputAsset: string;
} => {
  const maxOutputAsset = maxOutput.assets[0]?.unit ?? 'lovelace';
  let newMaxAmount = bigNumFromStr('0');

  if (maxOutputAsset === 'lovelace') {
    // set maxOutput for ADA
    if (changeOutput) {
      newMaxAmount = bigNumFromStr(changeOutput?.output.amount ?? '0');
      if (changeOutput.output.assets.length === 0) {
        // we don't need the change output anymore
        newMaxAmount = newMaxAmount.checked_add(changeOutput.outputFee);
        changeOutput = null;
      } else {
        newMaxAmount = newMaxAmount.clamped_sub(changeOutput.minOutputAmount);
        if (newMaxAmount.compare(bigNumFromStr('1000000')) < 0) {
          // the amount would be less than min required ADA
          throw Error(ERROR.UTXO_BALANCE_INSUFFICIENT.code);
        }
        changeOutput.output.amount = changeOutput.minOutputAmount.to_str();
      }
    }
    maxOutput.amount = newMaxAmount.to_str();
  } else {
    // set maxOutput for token
    if (changeOutput) {
      newMaxAmount = bigNumFromStr(
        changeOutput.output.assets.find(a => a.unit === maxOutputAsset)
          ?.quantity ?? '0',
      );
      // remove asset from the change output
      // TODO: fee could also be lowered since there are less assets than before
      changeOutput.output.assets = changeOutput.output.assets.filter(
        a => a.unit !== maxOutputAsset,
      );
    }
    maxOutput.assets[0].quantity = newMaxAmount.to_str();
  }
  return { maxOutput, newMaxAmount, changeOutput, maxOutputAsset };
};

export const getTotalUserOutputsAmount = (
  outputs: UserOutput[],
  deposit: number,
): CardanoWasm.BigNum => {
  let amount = outputs.reduce(
    (acc, output) => acc.checked_add(bigNumFromStr(output.amount || '0')),
    bigNumFromStr('0'),
  );
  if (deposit > 0) {
    amount = amount.checked_add(bigNumFromStr(deposit.toString()));
  }
  return amount;
};
