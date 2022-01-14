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

export const buildTxOutput = [
  {
    description: 'Byron address output',
    output: {
      address:
        '37btjrVyb4KDXBNC4haBVPCrro8AQPHwvCMp3RFhhSVWwfFmZ6wwzSK6JK1hY6wHNmtrpTf1kdbva8TCneM2YsiXT7mrzT21EacHnPpz5YyUdj64na',
      amount: '5000000',
      assets: [],
      setMax: false,
    },
    dummyAddress:
      'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
    asset: 'lovelace',
    result: {
      address:
        '37btjrVyb4KDXBNC4haBVPCrro8AQPHwvCMp3RFhhSVWwfFmZ6wwzSK6JK1hY6wHNmtrpTf1kdbva8TCneM2YsiXT7mrzT21EacHnPpz5YyUdj64na',
      amount: '5000000',
      assets: [],
    },
  },
  {
    description: 'Shelley address output with same policy assets',
    output: {
      address:
        'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
      amount: '5000000',
      assets: [
        {
          quantity: '5000',
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf391652243484f43',
        },
        {
          quantity: '10000',
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54',
        },
        {
          quantity: '1000000',
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522534245525259',
        },
      ],
      setMax: false,
    },
    dummyAddress:
      'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
    asset: 'lovelace',
    result: {
      address:
        'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
      amount: '5000000',
      assets: [
        {
          quantity: '5000',
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf391652243484f43',
        },
        {
          quantity: '10000',
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf39165224d494e54',
        },
        {
          quantity: '1000000',
          unit: '57fca08abbaddee36da742a839f7d83a7e1d2419f1507fcbf3916522534245525259',
        },
      ],
    },
  },
];
