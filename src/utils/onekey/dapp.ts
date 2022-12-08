import * as CardanoWasm from '@emurgo/cardano-serialization-lib-asmjs';
import BigNumber from 'bignumber.js';
import { getUtxos as getRawUtxos } from './signTx';
import {
  IAdaAmount,
  IAdaUTXO,
  IEncodedTxADA,
  IEncodeInput,
  IEncodeOutput,
} from './types';

const getBalance = async (balance: BigNumber) => {
  const value = CardanoWasm.Value.new(
    CardanoWasm.BigNum.from_str(balance.toFixed() ?? '0'),
  );
  return Promise.resolve(
    Buffer.from(value.to_bytes() as any, 'hex').toString('hex'),
  );
};

const getAddresses = async (addresses: string[]) => {
  return addresses.map(address => {
    const addr = Buffer.from(
      CardanoWasm.Address.from_bech32(address).to_bytes() as any,
      'hex',
    ).toString('hex');
    return addr;
  });
};

const getUtxos = async (
  address: string,
  utxos: IAdaUTXO[],
  amount?: string,
) => {
  let converted: CardanoWasm.TransactionUnspentOutput[] | null | undefined =
    await getRawUtxos(address, utxos);
  // filter utxos
  if (amount) {
    let filterVaule;
    try {
      filterVaule = CardanoWasm.Value.from_bytes(Buffer.from(amount, 'hex'));
    } catch (e) {
      throw new Error('Invalid Request');
    }

    converted = converted?.filter(
      unspent =>
        !unspent.output().amount().compare(filterVaule) ||
        unspent.output().amount().compare(filterVaule) !== -1,
    );
  }

  if (amount && Array.isArray(converted) && converted.length <= 0) {
    return null;
  }

  return converted?.map(utxo =>
    Buffer.from(utxo.to_bytes() as any, 'hex').toString('hex'),
  );
};

const convertCborTxToEncodeTx = async (
  txHex: string,
  utxos: IAdaUTXO[],
): Promise<IEncodedTxADA> => {
  const tx = CardanoWasm.Transaction.from_bytes(Buffer.from(txHex, 'hex'));
  const body = tx.body();

  // Fee
  const fee = body.fee().to_str();
  console.log('Fee: ', fee);
  const totalFeeInNative = new BigNumber(fee).shiftedBy(-1 * 6).toFixed();

  // inputs txs
  const encodeInputs: IEncodedTxADA['inputs'] = [];
  const inputs: { tx_hash: string; tx_index: number }[] = [];
  const inputsLen = body.inputs().len();
  console.log('input length: ', inputsLen);
  for (let i = 0; i < inputsLen; i++) {
    const input = body.inputs().get(i);
    const txHash = Buffer.from(
      input.transaction_id().to_bytes() as any,
      'utf8',
    ).toString('hex');
    const index = input.index();
    console.log(`input ${i}: txHash: ${txHash}, index: ${index}`);
    inputs.push({ tx_hash: txHash, tx_index: index });
    const utxo = utxos.find(
      utxo => utxo.tx_hash === txHash && +utxo.tx_index === +index,
    );
    encodeInputs.push(utxo as unknown as IEncodeInput);
  }

  console.log('inputs: ', inputs);
  console.log('utxo inputs: ', encodeInputs);

  // outputs txs
  const outputs: IEncodeOutput[] = [];
  const outputsLen = body.outputs().len();
  for (let i = 0; i < outputsLen; i++) {
    const output = body.outputs().get(i);
    const address = output.address().to_bech32();
    const amount = output.amount().coin().to_str();

    // get the asset from output
    const assetsArray: IAdaAmount[] = [];
    const multiasset = output.amount().multiasset();
    if (multiasset) {
      const keys = multiasset.keys(); // policy Ids of thee multiasset
      const N = keys.len();
      // console.log(`${N} Multiassets in the UTXO`)

      for (let i = 0; i < N; i++) {
        const policyId = keys.get(i);
        const policyIdHex = Buffer.from(
          policyId.to_bytes() as any,
          'utf8',
        ).toString('hex');
        const assets = multiasset.get(policyId);
        if (assets) {
          const assetNames = assets.keys();
          const K = assetNames.len();

          for (let j = 0; j < K; j++) {
            const assetName = assetNames.get(j);
            const assetNameHex = Buffer.from(
              assetName.name() as any,
              'utf8',
            ).toString('hex');
            const multiassetAmt = multiasset.get_asset(policyId, assetName);
            assetsArray.push({
              unit: `${policyIdHex}${assetNameHex}`,
              quantity: multiassetAmt.to_str(),
            });
          }
        }
      }
    }
    outputs.push({ amount: amount, address: address, assets: assetsArray });
    console.log(`output ${i}: address: ${address}, amount: ${amount}`);
  }

  const totalSpent = BigNumber.sum(...outputs.map(o => o.amount)).toFixed();

  return {
    inputs: encodeInputs,
    outputs,
    fee,
    totalSpent,
    totalFeeInNative,
    transferInfo: {
      from: encodeInputs[0].address,
      to: outputs[0].address,
      amount: totalSpent,
    },
    tx: {
      body: body.to_hex(),
      hash: Buffer.from(
        CardanoWasm.hash_transaction(body).to_bytes() as any,
        'utf8',
      ).toString('hex'),
      size: 0,
    },
    signOnly: true,
  };
};

export const dAppUtils = {
  getBalance,
  getAddresses,
  getUtxos,
  convertCborTxToEncodeTx,
};
