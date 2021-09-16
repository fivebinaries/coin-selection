import { ERROR } from '../constants';
import * as CardanoWasm from '@emurgo/cardano-serialization-lib-browser';
import {
  Certificate,
  ChangeOutput,
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
  setMaxOutput,
  getTotalUserOutputsAmount,
  multiAssetToArray,
  buildTxInput,
  buildTxOutput,
} from '../utils/common';
import { CoinSelectionError } from '../utils/errors';

export const largestFirst = (
  utxos: Utxo[],
  outputs: UserOutput[],
  changeAddress: string,
  certificates: Certificate[],
  withdrawals: Withdrawal[],
  accountPubKey: string,
  options?: Options,
): CoinSelectionResult => {
  const txBuilder = getTxBuilder(options?.feeParams?.a);
  let usedUtxos: Utxo[] = [];

  let sortedUtxos = sortUtxos(utxos);

  const accountKey = CardanoWasm.Bip32PublicKey.from_bytes(
    Buffer.from(accountPubKey, 'hex'),
  );

  // add withdrawals and certs to correctly set a fee
  const preparedCertificates = prepareCertificates(certificates, accountKey);
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
  const { used, remaining } = getInitialUtxoSet(sortedUtxos, maxOutput);
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

  // add external outputs fees to total
  totalFeesAmount = totalFeesAmount.checked_add(totalOutputsFee);

  let changeOutput: ChangeOutput | null = null;
  let sufficientUtxos = false;

  let totalUserOutputsAmount = getTotalUserOutputsAmount(
    preparedOutputs,
    deposit,
  );

  let forceAnotherRound = false;
  while (!sufficientUtxos) {
    // Calculate change output
    let preparedChangeOutput = prepareChangeOutput(
      txBuilder,
      usedUtxos,
      preparedOutputs,
      changeAddress,
      utxosTotalAmount,
      getTotalUserOutputsAmount(preparedOutputs, deposit),
      totalFeesAmount,
    );

    if (maxOutput) {
      // set amount for the max output
      const { changeOutput: newChangeOutput } = setMaxOutput(
        maxOutput,
        preparedChangeOutput,
      );
      // change output may be completely removed if all ADA are consumed by max output
      preparedChangeOutput = newChangeOutput;

      // recalculate  total user outputs amount
      totalUserOutputsAmount = getTotalUserOutputsAmount(
        preparedOutputs,
        deposit,
      );
    }

    let requiredAmount = totalFeesAmount.checked_add(totalUserOutputsAmount);
    if (preparedChangeOutput) {
      requiredAmount = requiredAmount
        .checked_add(preparedChangeOutput.output.amount().coin())
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
      usedUtxos.length > 0 && // TODO: force at least 1 utxo, otherwise withdrawal tx is composed without utxo if rewards > tx cost
      !forceAnotherRound
    ) {
      // we are done. we have enough utxos to cover fees + minUtxoValue for each output. now we can add the cost of the change output to total fees
      if (preparedChangeOutput) {
        totalFeesAmount = totalFeesAmount.checked_add(
          preparedChangeOutput.outputFee,
        );
        // set change output
        changeOutput = {
          isChange: true,
          amount: preparedChangeOutput.output.amount().coin().to_str(),
          address: changeAddress,
          assets: multiAssetToArray(
            preparedChangeOutput.output.amount().multiasset(),
          ),
        };
      } else {
        const unspendableChangeAmount = utxosTotalAmount.clamped_sub(
          totalFeesAmount.checked_add(totalUserOutputsAmount),
        );
        if (sortedUtxos.length > 0) {
          // In current iteration we don't have enough utxo to meet min utxo value for an output,
          // but some utxos are still available, force adding another one in order to create a change output
          forceAnotherRound = true;
          continue;
        }

        // console.warn(
        //   `Change output would be inefficient. Burning ${UnspendableChangeAmount.to_str()} as fee`,
        // );
        // Since we didn't add a change output we can burn its value + fee we would pay for it. That's equal to initial placeholderChangeOutputAmount

        totalFeesAmount = totalFeesAmount.checked_add(unspendableChangeAmount);
      }
      sufficientUtxos = true;
    } else {
      const utxo = sortedUtxos.shift();
      if (!utxo) break;

      usedUtxos.push(utxo);

      const { input, address, amount } = buildTxInput(utxo);
      const inputFee = txBuilder.fee_for_input(address, input, amount);
      txBuilder.add_input(address, input, amount);

      // const { inputFee } = getInputCost(txBuilder, utxo);
      // add input fee to total
      totalFeesAmount = totalFeesAmount.checked_add(inputFee);
      utxosTotalAmount = utxosTotalAmount.checked_add(
        bigNumFromStr(getAssetAmount(utxo)),
      );
      forceAnotherRound = false;
    }
    // END LOOP
  }

  if (!sufficientUtxos) {
    throw new CoinSelectionError(ERROR.UTXO_BALANCE_INSUFFICIENT);
  }

  preparedOutputs.forEach(output => {
    const txOutput = buildTxOutput(output);
    txBuilder.add_output(txOutput);
  });

  const finalOutputs: Output[] = JSON.parse(JSON.stringify(preparedOutputs));
  if (changeOutput) {
    finalOutputs.push(changeOutput);
    txBuilder.add_output(buildTxOutput(changeOutput));
  }

  txBuilder.set_fee(totalFeesAmount);
  const txBody = txBuilder.build();
  const txHash = Buffer.from(
    CardanoWasm.hash_transaction(txBody).to_bytes(),
  ).toString('hex');
  const txBodyHex = Buffer.from(txBody.to_bytes()).toString('hex');

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
    tx: { body: txBodyHex, hash: txHash },
    max,
  };
};
