import * as CardanoWasm from '@emurgo/cardano-serialization-lib-browser';
import {
  ChangeOutput,
  CoinSelectionResult,
  ExternalOutput,
  Output,
  Utxo,
} from './types/types';
import {
  bigNumFromStr,
  getAddressType,
  getAssetAmount,
  getInputCost,
  getOutputCost,
  getSumAssetAmount,
  getSumOutputAmount,
  sortUtxos,
} from './utils/common';

const txBuilder = CardanoWasm.TransactionBuilder.new(
  CardanoWasm.LinearFee.new(bigNumFromStr('44'), bigNumFromStr('155381')),
  bigNumFromStr('1000000'),
  // pool deposit
  bigNumFromStr('500000000'),
  // key deposit
  bigNumFromStr('2000000'),
);

const ERROR = {
  ERROR_UTXO_BALANCE_INSUFFICIENT: {
    code: 'UTXO_BALANCE_INSUFFICIENT',
    message: 'UTxO Balance Insufficient',
  },
};

export const coinSelection = (
  utxos: Utxo[],
  outputs: ExternalOutput[],
  changeAddress: {
    address: string;
    path: string;
    stakingPath: string;
  },
  byron?: boolean,
): CoinSelectionResult => {
  if (utxos.length === 0) {
    throw Error(ERROR.ERROR_UTXO_BALANCE_INSUFFICIENT.code);
  }

  const usedUtxos: Utxo[] = [];
  let totalFeesAmount = txBuilder.min_fee();
  let utxosTotalAmount = bigNumFromStr('0');
  const sortedUtxos = sortUtxos(utxos);

  const preparedOutputs = outputs.map(output => {
    const { minOutputAmount } = getOutputCost(
      txBuilder,
      output,
      output.assets ?? null,
    );
    const outputAmount = bigNumFromStr(output.amount);

    return {
      ...output,
      // if output contains assets make sure that minUtxoValue is at least minOutputAmount
      amount:
        output.assets && outputAmount.compare(minOutputAmount) < 0
          ? minOutputAmount.to_str()
          : output.amount,
    };
  });

  console.log('preparedOutputs after conversion', preparedOutputs);

  // Calculate fee and minUtxoValue for all external outputs
  const outputsCost = preparedOutputs.map(output =>
    getOutputCost(txBuilder, output, output.assets ?? null),
  );

  const totalOutputsFee = outputsCost.reduce(
    (acc, output) => (acc = acc.checked_add(output.outputFee)),
    bigNumFromStr('0'),
  );

  // Sum of all form outputs (ADA only)
  const totalOutputAmount = preparedOutputs.reduce(
    (acc, output) => acc.checked_add(bigNumFromStr(output.amount)),
    bigNumFromStr('0'),
  );

  // add external outputs fees to total
  totalFeesAmount = totalFeesAmount.checked_add(totalOutputsFee);
  let changeOutput: ChangeOutput | undefined;
  let sufficientUtxos = false;
  const selectUtxos = () => {
    while (sortedUtxos.length) {
      const utxo = sortedUtxos.shift();
      if (!utxo) break;

      usedUtxos.push(utxo);

      const { inputFee } = getInputCost(txBuilder, utxo);

      // txBuilder.add_input(utxo.address, input, inputValue);
      // add input fee to total
      totalFeesAmount = totalFeesAmount.checked_add(inputFee);

      utxosTotalAmount = utxosTotalAmount.checked_add(
        bigNumFromStr(getAssetAmount(utxo)),
      );

      // Calculate change output

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
          const assetSpentAmount = getSumOutputAmount(
            preparedOutputs,
            assetUnit,
          );
          return {
            unit: assetUnit,
            quantity: assetInputAmount.clamped_sub(assetSpentAmount).to_str(),
          };
        })
        .filter(asset => asset.quantity !== '0');

      const changeOutputCost = getOutputCost(
        txBuilder,
        {
          address: changeAddress.address,
          amount: placeholderChangeOutputAmount.to_str(),
          assets: undefined,
        },
        changeOutputAssets,
      );

      const totalSpent = totalOutputAmount
        .checked_add(totalFeesAmount)
        .checked_add(changeOutputCost.outputFee);
      let changeOutputAmount = utxosTotalAmount.clamped_sub(totalSpent);

      // Sum of all tokens in utxos must be same as sum of the tokens in external + change outputs
      // If computed change output doesn't contain any tokens then it makes sense to add it only if the fee + minUtxoValue is less then the amount
      const isChangeOutputNeeded =
        changeOutputAssets.length > 0 ||
        changeOutputAmount.compare(changeOutputCost.minOutputAmount) > 0;

      let requiredAmount = totalFeesAmount.checked_add(totalOutputAmount); // fees + regulars outputs
      // let addAnotherUtxo = false;
      if (isChangeOutputNeeded) {
        if (changeOutputAmount.compare(changeOutputCost.minOutputAmount) < 0) {
          // computed change amount would be below minUtxoValue
          // but since we need to return assets let's try to add another utxo
          // and set change output amount to met minimum requirements for minUtxoValue
          changeOutputAmount = changeOutputCost.minOutputAmount;
          // addAnotherUtxo = true; // flag probably not necessary anymore
          if (!utxos.length) {
            console.warn(
              "We need to add change output because of utxos are containing some assets which we are not spending in regular output, but we don't have enough ADA to cover change output's minUtxoVal ",
            );
          }
        }
        // adding change output grows the required amount
        requiredAmount = requiredAmount
          .checked_add(changeOutputAmount)
          .checked_add(changeOutputCost.outputFee);
      }

      console.log('----CURRENT UTXO SELECTION ITERATION----');
      console.log('usedUtxos', usedUtxos);
      console.log(
        'utxosTotalAmount (ADA amount that needs to be spent (sum of utxos = outputs - fee))',
        utxosTotalAmount.to_str(),
      );
      console.log(
        'requiredAmount to cover fees for all inputs, outputs (including additional change output if needed) and output amounts themselves',
        requiredAmount.to_str(),
      );
      console.log(
        `CHANGE OUTPUT (already included in requiredAmount above): amount: ${changeOutputAmount.to_str()} fe: ${changeOutputCost.outputFee.to_str()}`,
      );

      // Check if we have enough utxos to cover assets
      // TODO: sort utxos by asset amount instead of lovelace
      let assetsAmountSatisfied = true;
      preparedOutputs.forEach(output => {
        if (output.assets) {
          const asset = output.assets[0];
          const assetAmountInUtxos = getSumAssetAmount(usedUtxos, asset.unit);
          if (assetAmountInUtxos.compare(bigNumFromStr(asset.quantity)) < 0) {
            assetsAmountSatisfied = false;
          }
        }
      });

      // console.log('addAnotherUtxo', addAnotherUtxo);
      if (
        utxosTotalAmount.compare(requiredAmount) >= 0 &&
        assetsAmountSatisfied
      ) {
        // we have enough utxos to cover fees + minUtxoValue for each output
        if (isChangeOutputNeeded) {
          totalFeesAmount = totalFeesAmount.checked_add(
            changeOutputCost.outputFee,
          );

          // prepare trezor change output
          changeOutput = {
            amount: changeOutputAmount.to_str(),
            addressParameters: {
              path: changeAddress.path,
              addressType: getAddressType(byron),
              stakingPath: changeAddress.stakingPath,
            },
            assets: changeOutputAssets,
          };
        } else {
          console.warn(
            `Change output would be inefficient. Burning ${placeholderChangeOutputAmount.to_str()} as fee`,
          );
          // Since we didn't add a change output we can burn its value + fee we would pay for it. That's equal to initial placeholderChangeOutputAmount
          totalFeesAmount = totalFeesAmount.checked_add(
            placeholderChangeOutputAmount,
          );
        }
        sufficientUtxos = true;
        break;
      }
    }
  };

  selectUtxos();

  if (!sufficientUtxos) {
    throw Error(ERROR.ERROR_UTXO_BALANCE_INSUFFICIENT.code);
  }

  const outputsWithChange: Output[] = preparedOutputs;

  if (changeOutput) {
    outputsWithChange.push(changeOutput);
  }

  const totalSpent = totalOutputAmount.checked_add(totalFeesAmount);
  console.log('FINAL RESULT START');
  console.log('usedUtxos', usedUtxos);
  console.log('totalOutputAmount', totalOutputAmount.to_str());
  console.log('utxosTotalAmount', utxosTotalAmount.to_str());
  console.log('totalSpent', totalSpent.to_str());
  console.log('FINAL RESULT END');
  return {
    inputs: usedUtxos,
    outputs: outputsWithChange,
    fee: totalFeesAmount.to_str(),
    totalSpent: totalSpent.to_str(),
  };
};

export * as trezorUtils from './utils/trezor/transformations';
export * as types from './types/types';
