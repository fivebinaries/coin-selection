import { Certificate } from '../../../src/types/types';
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
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '2000000',
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
      totalSpent: '2170913',
      fee: '170913',
    },
  },
  {
    description: 'Non-final compose: token amount not filled',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            quantity: '0',
          },
        ],
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
      totalSpent: '1514567',
      fee: '169769',
    },
  },
];

export const coinSelection = [
  {
    description: '1 ADA only utxo, 1 output, no change (dust burned as fee)',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '4820000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    ttl: 123456789,
    options: {},
    result: {
      totalSpent: '5000000',
      fee: '180000',
      inputs: [utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '4820000',
          assets: [],
          setMax: false,
        },
      ],
      ttl: 123456789,
    },
  },
  {
    description: 'Prefer utxo with largest asset (token) value',
    utxos: [utxo2, utxo6],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            quantity: '50',
          },
        ],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    ttl: undefined,
    options: {},
    result: {
      totalSpent: '1517911',
      fee: '173113',
      ttl: undefined,
      inputs: [utxo6],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1344798',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '50',
            },
          ],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '2482089',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '1950',
            },
            {
              quantity: '100',
              unit: 'c6207cbbc916fa3bbb4b91cc7789c7d7ddfb84264fa76f7ee627a9d8',
            },
          ],
        },
      ],
    },
  },
  {
    description: '_maxTokensPerOutput=1 creates 2 changes',
    utxos: [utxo2, utxo6],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            quantity: '50',
          },
        ],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: { _maxTokensPerOutput: 1 },
    result: {
      totalSpent: '1522443',
      fee: '177645',
      inputs: [utxo6, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1344798',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '50',
            },
          ],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1344798',
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '2950',
            },
          ],
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '6132759',
          assets: [
            {
              quantity: '100',
              unit: 'c6207cbbc916fa3bbb4b91cc7789c7d7ddfb84264fa76f7ee627a9d8',
            },
          ],
        },
      ],
    },
  },
  {
    description:
      '2 ADA utxos (2 ADA, 1 ADA), needs both in order to return change and not to burn it as unnecessarily high fee',
    utxos: [utxo4, utxo5],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1000000',
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
      totalSpent: '1169637',
      fee: '169637',
      inputs: [utxo4, utxo5],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1000000',
          assets: [],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1830363',
          assets: [],
        },
      ],
    },
  },
  {
    description: '1 ADA only utxo, 1 output + change (custom fee param A=0)',
    utxos: [utxo1],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '3000000',
        assets: [],
        setMax: false,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: { feeParams: { a: '0' } },
    result: {
      totalSpent: '3155381',
      fee: '155381', // since we set cost per byte to 0, the tx cost wll be equal to fee param B
      inputs: [utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '3000000',
          assets: [],
          setMax: false,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1844619',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'set max on ADA output, no change',
    utxos: [utxo1, utxo3],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '14833223',
      totalSpent: '15000000',
      fee: '166777',
      inputs: [utxo3, utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '14833223',
          assets: [],
          setMax: true,
        },
      ],
    },
  },
  {
    description: 'set max on ADA output, assets returned',
    utxos: [utxo1, utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '8483761',
      totalSpent: '8655202', // plus 1344798 in change output = 10000000
      fee: '171441',
      inputs: [utxo1, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '8483761',
          assets: [],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1344798',
          assets: [
            {
              quantity: '1000',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
        },
      ],
    },
  },
  {
    description: 'set max on ADA output, multiple outputs, assets returned',
    utxos: [utxo1, utxo2],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1000000',
        assets: [],
        setMax: false,
      },
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '7480901',
      totalSpent: '8655202', // plus 1344798 in change output = 10000000
      fee: '174301',
      inputs: [utxo1, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1000000',
          assets: [],
          setMax: false,
        },
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '7480901',
          assets: [],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1344798',
          assets: [
            {
              quantity: '1000',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
        },
      ],
    },
  },
  {
    description: 'set max on token output',
    utxos: [utxo1, utxo7],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: undefined,
        assets: [
          {
            quantity: '',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      max: '1000',
      totalSpent: '1516151', // plus amount in change output = 6410000
      fee: '171353',
      inputs: [utxo7, utxo1],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1344798',
          assets: [
            {
              quantity: '1000',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '4893849',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'withdrawing rewards: 1 ADA only utxo, 1 change output',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [
      {
        amount: '10000000',
        stakingPath: "m/1852'/1815'/0'/2/0",
        stakeAddress:
          'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2',
      },
    ],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '171309',
      fee: '171309',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '14828691',
          assets: [],
        },
      ],
    },
  },
  {
    description:
      'withdrawing rewards: multiple utxos, multiple withdrawals, 1 change output',
    utxos: [utxo1, utxo2],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [
      {
        amount: '10000000',
        stakingPath: "m/1852'/1815'/0'/2/0",
        stakeAddress:
          'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2',
      },
      {
        amount: '10000000',
        stakingPath: "m/1852'/1815'/1'/2/0",
        stakeAddress:
          'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2',
      },
    ],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '171309',
      fee: '171309',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '24828691',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'stake registration',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 0,
      },
    ] as Certificate[],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2166777',
      fee: '166777',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '2833223',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'stake delegation',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 2 as const,

        pool: '0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
      },
    ] as Certificate[],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '172541',
      fee: '172541',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '4827459',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'stake deregistration',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 1,
      },
    ] as Certificate[],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '171221',
      fee: '171221',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '6828779',
          assets: [],
        },
      ],
    },
  },
  {
    description:
      'multiple utxos (including multi asset), 2 user defined outputs (ADA only) + 1 change output (with an asset)',
    utxos: [
      {
        address:
          'addr1q9vf2uqwv9cx23rsfeqqa4g9rv8s2ha464sycdwpzdhm7ana9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqka2l2d',
        txHash:
          '1bfb8b1d06bd28fb33493afaa5b22dec02bb8e292bbd7a6965c9037b5964a808',
        outputIndex: 1,
        amount: [
          {
            quantity: '3831173306',
            unit: 'lovelace',
          },
          {
            quantity: '998900',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
      },
      {
        address:
          'addr1qydd8kf2vtzv05y703kvsq0tcrgnwynqemxkp7rw4nwnq2ma9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqqdz40d',
        txHash:
          '064ebc7096680b94de4e1c014938ea44886829c08ec01025578104b7b60d6bcf',
        outputIndex: 1,
        amount: [
          {
            quantity: '848035104',
            unit: 'lovelace',
          },
        ],
      },
      {
        address:
          'addr1q80vvrk4syazwl6w706ah9rgzvr5heq6hq2tjqxxu3x8wnma9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqvmacgp',
        txHash:
          'd49c08164d3f2abc1a2e1b16a2c81122240a99bb6bd2f8d33628048df7529adc',
        outputIndex: 1,
        amount: [
          {
            quantity: '1180285694',
            unit: 'lovelace',
          },
        ],
      },
      {
        address:
          'addr1q984228shp7a6m0xrj39k7uuvcpsqt2dkjn8r6lvrpnmdfna9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaq77p62n',
        txHash:
          'ca0bad48270c5345bbcce7a850f545be5582a780d5a0337385d1b7413dfc60e3',
        outputIndex: 0,
        amount: [
          {
            quantity: '2000000',
            unit: 'lovelace',
          },
        ],
      },
    ],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1000000',
        assets: [],
        setMax: false,
      },
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
      totalSpent: '3172805',
      fee: '172805',
      inputs: [
        {
          address:
            'addr1q9vf2uqwv9cx23rsfeqqa4g9rv8s2ha464sycdwpzdhm7ana9nxu0t6xjurg0qqcwwdulh56uglsp8z2uw9wuzjtfuaqka2l2d',
          txHash:
            '1bfb8b1d06bd28fb33493afaa5b22dec02bb8e292bbd7a6965c9037b5964a808',
          outputIndex: 1,
          amount: [
            {
              quantity: '3831173306',
              unit: 'lovelace',
            },
            {
              quantity: '998900',
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
            },
          ],
        },
      ],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1000000',
          assets: [],
          setMax: false,
        },
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '2000000',
          assets: [],
          setMax: false,
        },
        {
          amount: '3828000501',
          isChange: true,
          address: changeAddress,
          assets: [
            {
              unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
              quantity: '998900',
            },
          ],
        },
      ],
    },
  },
  {
    description: 'Correctly recalculate change output after set max on token',
    utxos: [
      {
        address:
          'addr_test1qzhts48qcr2s76qcrh4rvwwah5xc52g7fr4xtzfzq9ffxme9j9xney949w6u957hfn5r7gmlh789208l4g9cal4m9p3qyt8vq9',
        txHash:
          'd8ff7a39d1daf80ae2e99351c51fbb823f223e717cee09d23bc1b2691092632d',
        outputIndex: 0,
        amount: [
          {
            quantity: '1344798',
            unit: 'lovelace',
          },
          {
            quantity: '1',
            unit: '3b746b6a5f8c43acc6bed9259ff7fc5f0b9e0be8adc3d63edfea98c77072657373757265',
          },
        ],
      },
      {
        address:
          'addr_test1qq6r7mgs3q42n8ja7sf9wkn747lnttke2zx7khdrc5a2e4p9j9xney949w6u957hfn5r7gmlh789208l4g9cal4m9p3q83lu76',
        txHash:
          '280c49a69c0fc24c3fdcdbcdd4030da3533a87e4378639bcd4a8841b3d2c6e21',
        outputIndex: 2,
        amount: [
          {
            quantity: '1344798',
            unit: 'lovelace',
          },
        ],
      },
      {
        address:
          'addr_test1qzhts48qcr2s76qcrh4rvwwah5xc52g7fr4xtzfzq9ffxme9j9xney949w6u957hfn5r7gmlh789208l4g9cal4m9p3qyt8vq9',
        txHash:
          '05cf0d8c9824b6e1bf403329d159cc57d89b4c22d93835bbdee46687f7c69c69',
        outputIndex: 0,
        amount: [
          {
            quantity: '1344798',
            unit: 'lovelace',
          },
          {
            quantity: '1',
            unit: '4f740e06506c0b8a1584760780ce3c61aea3b6061d5596d580e9aae66265726e617264',
          },
        ],
      },
    ],
    outputs: [
      {
        address:
          'addr_test1qztq45fff6e84v0qctnzpg86lny8zf7nx0lmn47p3msk5tvw8qpyux7tm435rjuk5dqr6kny4ks9w7vqjnfrsvtjk82quqe75s',
        assets: [
          {
            unit: '3b746b6a5f8c43acc6bed9259ff7fc5f0b9e0be8adc3d63edfea98c77072657373757265',
            quantity: '1',
          },
        ],
        setMax: false,
      },
      {
        address:
          'addr_test1qztq45fff6e84v0qctnzpg86lny8zf7nx0lmn47p3msk5tvw8qpyux7tm435rjuk5dqr6kny4ks9w7vqjnfrsvtjk82quqe75s',
        assets: [
          {
            unit: '4f740e06506c0b8a1584760780ce3c61aea3b6061d5596d580e9aae66265726e617264',
            quantity: '',
          },
        ],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'ec8fdf616242f430855ad7477acda53395eb30c295f5a7ef038712578877375b5a2f00353c9c5cc88c7ff18e71dc08724d90fc238213b789c0b02438e336be07',
    options: {},
    result: {
      totalSpent: '2871861',
      fee: '182265',
      inputs: [
        {
          address:
            'addr_test1qzhts48qcr2s76qcrh4rvwwah5xc52g7fr4xtzfzq9ffxme9j9xney949w6u957hfn5r7gmlh789208l4g9cal4m9p3qyt8vq9',
          txHash:
            '05cf0d8c9824b6e1bf403329d159cc57d89b4c22d93835bbdee46687f7c69c69',
          outputIndex: 0,
          amount: [
            {
              quantity: '1344798',
              unit: 'lovelace',
            },
            {
              quantity: '1',
              unit: '4f740e06506c0b8a1584760780ce3c61aea3b6061d5596d580e9aae66265726e617264',
            },
          ],
        },
        {
          address:
            'addr_test1qzhts48qcr2s76qcrh4rvwwah5xc52g7fr4xtzfzq9ffxme9j9xney949w6u957hfn5r7gmlh789208l4g9cal4m9p3qyt8vq9',
          txHash:
            'd8ff7a39d1daf80ae2e99351c51fbb823f223e717cee09d23bc1b2691092632d',
          outputIndex: 0,
          amount: [
            {
              quantity: '1344798',
              unit: 'lovelace',
            },
            {
              quantity: '1',
              unit: '3b746b6a5f8c43acc6bed9259ff7fc5f0b9e0be8adc3d63edfea98c77072657373757265',
            },
          ],
        },
        {
          address:
            'addr_test1qq6r7mgs3q42n8ja7sf9wkn747lnttke2zx7khdrc5a2e4p9j9xney949w6u957hfn5r7gmlh789208l4g9cal4m9p3q83lu76',
          txHash:
            '280c49a69c0fc24c3fdcdbcdd4030da3533a87e4378639bcd4a8841b3d2c6e21',
          outputIndex: 2,
          amount: [
            {
              quantity: '1344798',
              unit: 'lovelace',
            },
          ],
        },
      ],
      outputs: [
        {
          address:
            'addr_test1qztq45fff6e84v0qctnzpg86lny8zf7nx0lmn47p3msk5tvw8qpyux7tm435rjuk5dqr6kny4ks9w7vqjnfrsvtjk82quqe75s',
          amount: '1344798',
          assets: [
            {
              quantity: '1',
              unit: '3b746b6a5f8c43acc6bed9259ff7fc5f0b9e0be8adc3d63edfea98c77072657373757265',
            },
          ],
          setMax: false,
        },
        {
          address:
            'addr_test1qztq45fff6e84v0qctnzpg86lny8zf7nx0lmn47p3msk5tvw8qpyux7tm435rjuk5dqr6kny4ks9w7vqjnfrsvtjk82quqe75s',
          amount: '1344798',
          assets: [
            {
              quantity: '1',
              unit: '4f740e06506c0b8a1584760780ce3c61aea3b6061d5596d580e9aae66265726e617264',
            },
          ],
          setMax: true,
        },
        {
          address:
            'addr1q8u2f05rprqjhygz22m06mhy4xrnqvqqpyuzhmxqfxnwvxz8d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90s22tk0f',
          amount: '1162533',
          assets: [],
          isChange: true,
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
  {
    description: 'Computed max output amount is lower than minUtxoVal',
    // utxos: 3.544443 ADA, outputs: 1 ADA + 1.443 ADA in change output + fee. This leaves less than 1 ADA which would be set as "max"
    utxos: [
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        txHash:
          'b5d1abd05c1eb0564a34c5daa4a71185aa11568c375ab7f946da889ebcb23a01',
        outputIndex: 1,
        amount: [
          {
            quantity: '2100000',
            unit: 'lovelace',
          },
          {
            quantity: '90',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
      },
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        txHash:
          'b5d1abd05c1eb0564a34c5daa4a71185aa11568c375ab7f946da889ebcb23a01',
        outputIndex: 0,
        amount: [
          {
            quantity: '1344798',
            unit: 'lovelace',
          },
          {
            quantity: '10',
            unit: '02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7a47524943',
          },
        ],
      },
    ],
    outputs: [
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        amount: undefined,
        assets: [],
        setMax: true,
      },
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        amount: '1000000',
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

export const params = [
  {
    description: 'ttl',
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
    ttl: undefined,
    result: {
      ttl: undefined,
    },
  },
  {
    description: 'ttl',
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
    ttl: 123456789,
    result: {
      ttl: 123456789,
    },
  },
];
