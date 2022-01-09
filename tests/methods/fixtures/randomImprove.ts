import {
  changeAddress,
  utxo1,
  utxo2,
  utxo3,
  utxo4,
  utxo5,
  utxo6,
  utxo7,
} from '../../fixtures/constants';

const restrictedUtxoSet = [
  {
    address:
      'addr_test1qq7ajtmfdg0um0ha4e6wgqu33fddfxejxuvj2yfnyz2w3kgle6svh9nacvm632nmcy6fnw9sq85tqkvhagfrhkj9tf6s6jql6l',
    txHash: 'cb0cef9f464523a599f8355d2f241147f70dc2f5d559e670910a122053f1538a',
    outputIndex: 2,
    amount: [
      {
        quantity: '1500000',
        unit: 'lovelace',
      },
    ],
  },
  {
    address:
      'addr_test1qq7ajtmfdg0um0ha4e6wgqu33fddfxejxuvj2yfnyz2w3kgle6svh9nacvm632nmcy6fnw9sq85tqkvhagfrhkj9tf6s6jql6l',
    txHash: 'cb0cef9f464523a599f8355d2f241147f70dc2f5d559e670910a122053f1538a',
    outputIndex: 3,
    amount: [
      {
        quantity: '1300000',
        unit: 'lovelace',
      },
    ],
  },
];

const utxo8 = {
  address:
    'addr_test1qq7ajtmfdg0um0ha4e6wgqu33fddfxejxuvj2yfnyz2w3kgle6svh9nacvm632nmcy6fnw9sq85tqkvhagfrhkj9tf6s6jql6l',
  txHash: 'cb0cef9f464523a599f8355d2f241147f70dc2f5d559e670910a122053f1538a',
  outputIndex: 8,
  amount: [
    {
      quantity: '1000000',
      unit: 'lovelace',
    },
  ],
};

export const nonFinalCompose = [
  {
    description: 'Non-final compose: amount not filled',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '168053',
      fee: '168053',
    },
  },
  {
    description: 'Non-final compose: address not filled',
    utxos: [utxo1],
    outputs: [
      {
        address: undefined,
        amount: '2000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2168053',
      fee: '168053',
    },
  },
  {
    description: 'Non-final compose, 2 outputs, 1 amount not filled',
    utxos: [utxo1, utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '6000000',
        assets: [],
        setMax: false,
      },
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '6174301',
      fee: '174301',
    },
  },
];

export const coinSelection = [
  {
    description:
      '2 ADA utxos (2 ADA, 1 ADA), needs both in order to return change and not to burn it as unnecessarily high fee',
    utxos: [utxo1, utxo2, utxo3, utxo4, utxo5, utxo6, utxo7],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '7000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      // non-deterministic, we rely on sanity check
    },
  },
  {
    description:
      'Use all utxos to cover outputs, 80000 will be burned as fee because utxos would not cover minUtxoValue for a change output',
    utxos: restrictedUtxoSet,
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '2000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2800000',
      fee: '800000',
      // inputs: restrictedUtxoSet, // order changes
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '2000000',
          assets: [],
          setMax: false,
        },
      ],
    },
  },
  {
    description: 'Use all utxos to cover outputs and change',
    utxos: [...restrictedUtxoSet, utxo8],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '2000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2171221',
      fee: '171221',
      // inputs: restrictedUtxoSet, // can't be matched, order changes
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '2000000',
          assets: [],
        },
        {
          address: changeAddress,
          amount: '1628779',
          isChange: true,
          assets: [],
        },
      ],
    },
  },
];

export const exceptions = [
  {
    description: 'Not enough utxos to cover an output amount',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '10000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: 'UTXO_BALANCE_INSUFFICIENT',
  },
  {
    description: 'Number of utxos is less than the number of outputs',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '10000000',
        assets: [],
        setMax: false,
      },
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '20000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: 'UTXO_NOT_FRAGMENTED_ENOUGH',
  },
  {
    description:
      'Not enough utxos to cover mandatory change output (multi asset utxo)',
    utxos: [utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '4800000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: 'UTXO_BALANCE_INSUFFICIENT',
  },
];
