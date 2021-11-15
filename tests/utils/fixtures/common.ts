const utxo1 = {
  address: 'addr1',
  txHash: 'hash1',
  outputIndex: 0,
  amount: [
    {
      unit: 'lovelace',
      quantity: '1000000',
    },
  ],
};

const utxo2 = {
  address: 'addr1',
  txHash: 'hash1',
  outputIndex: 0,
  amount: [
    {
      unit: 'lovelace',
      quantity: '1000000',
    },
    {
      unit: 'token1',
      quantity: '1000000',
    },
  ],
};

const utxo3 = {
  address: 'addr1',
  txHash: 'hash1',
  outputIndex: 0,
  amount: [
    {
      unit: 'lovelace',
      quantity: '1000000',
    },
    {
      unit: 'token2',
      quantity: '1000000',
    },
  ],
};

export const filterUtxos = [
  {
    description: 'filter lovelace',
    utxos: [utxo1, utxo2, utxo3],
    asset: 'lovelace',
    result: [utxo1, utxo2, utxo3],
  },
  {
    description: 'filter token1',
    utxos: [utxo1, utxo2, utxo3],
    asset: 'token1',
    result: [utxo2],
  },
  {
    description: 'filter token2',
    utxos: [utxo1, utxo2, utxo3],
    asset: 'token2',
    result: [utxo3],
  },
  {
    description: 'filter non existent token',
    utxos: [utxo1, utxo2, utxo3],
    asset: 'token3',
    result: [],
  },
];
