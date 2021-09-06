import { ERROR } from '../constants';
import {
  Certificate,
  ChangeAddress,
  CoinSelectionResult,
  Options,
  Output,
  UserOutput,
  Utxo,
  Withdrawal,
} from '../types/types';
import {
  bigNumFromStr,
  calculateRequiredDeposit,
  getAssetAmount,
  getInputCost,
  getOutputCost,
  prepareCertificates,
  prepareChangeOutput,
  prepareWithdrawals,
  setMinUtxoValueForOutputs,
  sortUtxos,
  getTxBuilder,
  assetsAmountSatisfied,
  getInitialUtxoSet,
} from '../utils/common';

export const largestFirst = (
  utxos: Utxo[],
  outputs: UserOutput[],
  changeAddress: ChangeAddress,
  certificates: Certificate[],
  withdrawals: Withdrawal[],
  options?: Options,
): CoinSelectionResult => {
  const txBuilder = getTxBuilder(options?.feeParams?.a);
  let usedUtxos: Utxo[] = [];

  let sortedUtxos = sortUtxos(utxos);

  // add withdrawals and certs to correctly set a fee
  const preparedCertificates = prepareCertificates(certificates);
  const preparedWithdrawals = prepareWithdrawals(withdrawals);

  if (preparedCertificates.len() > 0) {
    txBuilder.set_certs(preparedCertificates);
  }
  if (preparedWithdrawals.len() > 0) {
    txBuilder.set_withdrawals(preparedWithdrawals);
  }

  // TODO: negative value in case of deregistration (-2000000), but we still need enough utxos to cover fee which can't be (is that right?) paid from returned deposit
  const deposit = calculateRequiredDeposit(certificates);
  const totalWithdrawal = withdrawals.reduce(
    (acc, withdrawal) => acc.checked_add(bigNumFromStr(withdrawal.amount)),
    bigNumFromStr('0'),
  );

  // calc initial fee
  let totalFeesAmount = txBuilder.min_fee();
  let utxosTotalAmount = totalWithdrawal;
  if (deposit < 0) {
    // stake deregistration, 2 ADA returned
    utxosTotalAmount = utxosTotalAmount.checked_add(
      bigNumFromStr(Math.abs(deposit).toString()),
    );
  }

  const preparedOutputs = setMinUtxoValueForOutputs(txBuilder, outputs);

  // set initial utxos set for setMax functionality
  const maxOutput = preparedOutputs[outputs.findIndex(o => !!o.setMax)];
  const { used, remaining } = getInitialUtxoSet(utxos, maxOutput);
  usedUtxos = used;
  sortedUtxos = remaining;

  usedUtxos.forEach(utxo => {
    // this should really be a function
    const { inputFee } = getInputCost(txBuilder, utxo);
    totalFeesAmount = totalFeesAmount.checked_add(inputFee);
    utxosTotalAmount = utxosTotalAmount.checked_add(
      bigNumFromStr(getAssetAmount(utxo)),
    );
  });

  // Calculate fee and minUtxoValue for all external outputs
  const outputsCost = preparedOutputs.map(output =>
    getOutputCost(txBuilder, output),
  );

  const totalOutputsFee = outputsCost.reduce(
    (acc, output) => (acc = acc.checked_add(output.outputFee)),
    bigNumFromStr('0'),
  );

  // Sum of all form outputs (ADA only) and withdrawals (without change output)
  let totalUserOutputsAmount = preparedOutputs.reduce(
    (acc, output) => acc.checked_add(bigNumFromStr(output.amount || '0')),
    bigNumFromStr('0'),
  );
  if (deposit > 0) {
    totalUserOutputsAmount = totalUserOutputsAmount.checked_add(
      bigNumFromStr(deposit.toString()),
    );
  }

  // add external outputs fees to total
  totalFeesAmount = totalFeesAmount.checked_add(totalOutputsFee);

  let changeOutput: Output | null = null;
  let sufficientUtxos = false;

  while (!sufficientUtxos) {
    // Calculate change output
    const preparedChangeOutput = prepareChangeOutput(
      txBuilder,
      usedUtxos,
      preparedOutputs,
      changeAddress,
      utxosTotalAmount,
      totalUserOutputsAmount,
      totalFeesAmount,
      !!options?.byron,
    );

    // set amount for the max output
    if (maxOutput && preparedChangeOutput) {
      const maxOutputAsset = maxOutput.assets[0]?.unit ?? 'lovelace';
      if (maxOutputAsset === 'lovelace') {
        // set maxOutput for ADA
        const newMaxOutputAmount = bigNumFromStr(
          preparedChangeOutput?.output.amount ?? '0',
        ).clamped_sub(preparedChangeOutput.minOutputAmount);
        totalUserOutputsAmount =
          totalUserOutputsAmount.checked_add(newMaxOutputAmount);
        maxOutput.amount = newMaxOutputAmount.to_str();

        preparedChangeOutput.output.amount =
          preparedChangeOutput.minOutputAmount.to_str();
      } else {
        // set maxOutput for token
        maxOutput.assets[0].quantity =
          preparedChangeOutput.output.assets.find(
            a => a.unit === maxOutputAsset,
          )?.quantity ?? '0';

        // remove asset from the change output
        // TODO: fee could also be lowered since there are less assets than before
        preparedChangeOutput.output.assets =
          preparedChangeOutput.output.assets.filter(
            a => a.unit !== maxOutputAsset,
          );
      }
    }

    let requiredAmount = totalFeesAmount.checked_add(totalUserOutputsAmount);
    if (preparedChangeOutput) {
      requiredAmount = requiredAmount
        .checked_add(bigNumFromStr(preparedChangeOutput.output.amount || '0'))
        .checked_add(preparedChangeOutput.outputFee);
    }

    // console.log('----CURRENT UTXO SELECTION ITERATION----');
    // console.log('usedUtxos', usedUtxos);
    // console.log(
    //   'utxosTotalAmount (ADA amount that needs to be spent (sum of utxos = outputs - fee))',
    //   utxosTotalAmount.to_str(),
    // );
    // console.log(
    //   'requiredAmount to cover fees for all inputs, outputs (including additional change output if needed) and output amounts themselves',
    //   requiredAmount.to_str(),
    // );
    // console.log(
    //   `CHANGE OUTPUT (already included in requiredAmount above): amount: ${
    //     preparedChangeOutput?.output.amount
    //   } fe: ${preparedChangeOutput?.outputFee.to_str()}`,
    // );

    // console.log('addAnotherUtxo', addAnotherUtxo);
    if (
      utxosTotalAmount.compare(requiredAmount) >= 0 &&
      assetsAmountSatisfied(usedUtxos, preparedOutputs) &&
      usedUtxos.length > 0 // TODO: force at least 1 utxo, otherwise withdrawal tx is composed without utxo if rewards > tx cost
    ) {
      // we are done. we have enough utxos to cover fees + minUtxoValue for each output. now we can add the cost of the change output to total fees
      if (preparedChangeOutput) {
        totalFeesAmount = totalFeesAmount.checked_add(
          preparedChangeOutput.outputFee,
        );
        // set change output
        changeOutput = preparedChangeOutput.output;
      } else {
        const UnspendableChangeAmount = utxosTotalAmount.clamped_sub(
          totalFeesAmount.checked_add(totalUserOutputsAmount),
        );
        // console.warn(
        //   `Change output would be inefficient. Burning ${UnspendableChangeAmount.to_str()} as fee`,
        // );
        // Since we didn't add a change output we can burn its value + fee we would pay for it. That's equal to initial placeholderChangeOutputAmount

        totalFeesAmount = totalFeesAmount.checked_add(UnspendableChangeAmount);
      }

      sufficientUtxos = true;
    } else {
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
    }
    // END LOOP
  }

  if (!sufficientUtxos) {
    throw Error(ERROR.UTXO_BALANCE_INSUFFICIENT.code);
  }

  const finalOutputs: Output[] = preparedOutputs;
  if (changeOutput) {
    finalOutputs.push(changeOutput);
  }

  const totalSpent = totalUserOutputsAmount.checked_add(totalFeesAmount);
  // console.log('FINAL RESULT START==========');
  // console.log('inputs', usedUtxos);
  // console.log('outputs', finalOutputs);
  // console.log('totalOutputAmount', totalOutputAmount.to_str());
  // console.log('utxosTotalAmount', utxosTotalAmount.to_str());
  // console.log('totalSpent', totalSpent.to_str());
  // console.log('deposit', deposit.to_str());
  // console.log('withdrawal', totalWithdrawal.to_str());
  // console.log('FINAL RESULT END');
  txBuilder.free();

  let max;
  if (maxOutput) {
    max =
      maxOutput.assets.length > 0
        ? maxOutput.assets[0].quantity
        : maxOutput.amount;
  }
  return {
    inputs: usedUtxos,
    outputs: finalOutputs,
    fee: totalFeesAmount.to_str(),
    totalSpent: totalSpent.to_str(), //
    deposit: deposit.toString(),
    withdrawal: totalWithdrawal.to_str(),
    max,
  };
};
