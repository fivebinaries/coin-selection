import {
  CardanoDRepType,
  Certificate,
  CertificateVoteDelegation,
} from '../../../src/types/types';
import {
  changeAddress,
  setMaxAdaInputs,
  utxo1,
  utxo2,
  utxo3,
  utxo4,
  utxo5,
  utxo6,
  utxo7,
  utxo8,
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
      totalSpent: '1307609',
      fee: '169769',
    },
  },
];

export const coinSelection = [
  {
    description: 'send max ada only utxos',
    utxos: setMaxAdaInputs,
    outputs: [
      {
        address:
          'addr_test1qr9tax9jxzt05y65m8xanngng36mh7hpf23jy53xwyd9y5qj922xhxkn6twlq2wn4q50q352annk3903tj00h45mgfms0kcepv',
        amount: undefined,
        assets: [],
        setMax: true,
      },
    ],
    changeAddress: changeAddress,
    certificates: [],
    withdrawals: [],
    accountPubKey:
      'd507c8f866691bd96e131334c355188b1a1d0b2fa0ab11545075aab332d77d9eb19657ad13ee581b56b0f8d744d66ca356b93d42fe176b3de007d53e9c4c4e7a',
    ttl: 66578367,
    options: {},
    result: {
      totalSpent: '5222414726',
      fee: '176721',
      tx: {
        body: 'a40088825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c02825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c05825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c08825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c0b825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c0e825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c11825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c15825820d6de3f33c3b421167eb1726c48129990ec16512dd829ad2239751ba49773b30c16018182583900cabe98b23096fa1354d9cdd9cd134475bbfae14aa3225226711a5250122a946b9ad3d2ddf029d3a828f0468aece76895f15c9efbd69b42771b0000000137450735021a0002b251031a03f7e7bf',
        hash: '74a66a069530d96224b56d955eb1e58dde84774168f3d1fb4b5a972431cc18fa',
        size: 481,
      },
      inputs: setMaxAdaInputs,
      outputs: [
        {
          address:
            'addr_test1qr9tax9jxzt05y65m8xanngng36mh7hpf23jy53xwyd9y5qj922xhxkn6twlq2wn4q50q352annk3903tj00h45mgfms0kcepv',
          amount: '5222238005',
          assets: [],
        },
      ],
    },
  },
  {
    description: 'send max sundae',
    utxos: [
      {
        address:
          'addr1qy4xpnf4lk560dgrds5zsunh6xdssg94c5sc8dqdclcn2fdl85agr52j3ffkwzq2yasu59ccwvfj39kel85ng3u7lhlq4e4m4l',
        txHash:
          '9ed3ef581f545f2143eca490d7f20a511100add747bb3d651cc2aa5815f77b1d',
        outputIndex: 1,
        amount: [
          {
            quantity: '1344974',
            unit: 'lovelace',
          },
          {
            quantity: '5675656536',
            unit: '9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d7753554e444145',
          },
        ],
      },
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        txHash:
          '06227a5ee5640d26224470ad195c82941bfa49386a85149c09c465c4edb0edc0',
        outputIndex: 0,
        amount: [
          {
            quantity: '10000000',
            unit: 'lovelace',
          },
        ],
      },
    ],
    outputs: [
      {
        address:
          'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
        amount: '1344798',
        assets: [
          {
            unit: '9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d7753554e444145',
            quantity: '5675656536',
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
    ttl: 66578367,
    options: {},
    result: {
      totalSpent: '1357441',
      fee: '176501',
      tx: {
        body: 'a4008282582006227a5ee5640d26224470ad195c82941bfa49386a85149c09c465c4edb0edc0008258209ed3ef581f545f2143eca490d7f20a511100add747bb3d651cc2aa5815f77b1d010182825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d821a0012050ca1581c9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d77a14653554e4441451b00000001524ba55882583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a009865cd021a0002b175031a03f7e7bf',
        hash: '37b4fe1cd8bcb4315e8465d05b8b77f7b7368aa073dc3e555f0eccf3215b4003',
        size: 476,
      },
      inputs: [
        {
          address:
            'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
          txHash:
            '06227a5ee5640d26224470ad195c82941bfa49386a85149c09c465c4edb0edc0',
          outputIndex: 0,
          amount: [
            {
              quantity: '10000000',
              unit: 'lovelace',
            },
          ],
        },
        {
          address:
            'addr1qy4xpnf4lk560dgrds5zsunh6xdssg94c5sc8dqdclcn2fdl85agr52j3ffkwzq2yasu59ccwvfj39kel85ng3u7lhlq4e4m4l',
          txHash:
            '9ed3ef581f545f2143eca490d7f20a511100add747bb3d651cc2aa5815f77b1d',
          outputIndex: 1,
          amount: [
            {
              quantity: '1344974',
              unit: 'lovelace',
            },
            {
              quantity: '5675656536',
              unit: '9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d7753554e444145',
            },
          ],
        },
      ],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1180940',
          assets: [
            {
              quantity: '5675656536',
              unit: '9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d7753554e444145',
            },
          ],
          setMax: true,
        },
        {
          address: changeAddress,
          amount: '9987533',
          assets: [],
        },
      ],
    },
  },

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
      tx: {
        body: 'a400818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d000181825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a00498c20021a0002bf20031a075bcd15',
        hash: '9dcf7d216b0f8a87194ca8fe33484d63744ae68e419d20ebab8e22a824d2ed5c',
        size: 225,
      },
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
      totalSpent: '1315263',
      tx: {
        body: 'a300818258209e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0070182825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d821a00116d86a1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa14447524943183282583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f821a0028f741a2581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa1444752494319079e581cc6207cbbc916fa3bbb4b91cc7789c7d7ddfb84264fa76f7ee627a9d8a1401864021a0002a439',
        hash: '1a53ffb7eb300446fc492a6920f9d121a184a95f7eca380d39ac0392fb2bb413',
        size: 399,
      },
      fee: '173113',
      ttl: undefined,
      inputs: [utxo6],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1142150',
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
          amount: '2684737',
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
    utxos: [utxo2, utxo8],
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
      tx: {
        body: 'a300828258209e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0018258209e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0070183825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d821a00116d86a1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa14447524943183282583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f821a00117e5ca1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa14447524943190b8682583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f821a00452df1a1581cc6207cbbc916fa3bbb4b91cc7789c7d7ddfb84264fa76f7ee627a9d8a1401864021a0002b5ed',
        hash: '2432c899ff9abd9d6d11f861a8644da7f016ca4d530506a697907872bd6f22bf',
        size: 502,
      },
      totalSpent: '1319795',
      fee: '177645',
      inputs: [utxo2, utxo8],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1142150',
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
          amount: '1146460',
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
          amount: '4533745',
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
      tx: {
        body: 'a300828258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d038258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d040182825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a000f424082583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a001beddb021a000296a5',
        hash: 'b08162d0b0458ec5c25688215f56e4a730cc3d591f5e032db851174ab22c7610',
        size: 320,
      },
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
      tx: {
        body: 'a300818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d000182825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a002dc6c082583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a001c258b021a00025ef5',
        hash: 'e6186b479212e677bea51b5108e669fe4d99cfb632e951880bfdf98b9dbc56ab',
        size: 284,
      },
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
      tx: {
        body: 'a300828258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d008258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d020181825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a00e25647021a00028b79',
        hash: '4b2a77115ccb6af30822fc058bdb7bdf5a75be239779e5530e3c50302be82ee3',
        size: 255,
      },
      max: '14833223',
      totalSpent: '15000000',
      fee: '166777',
      inputs: [utxo1, utxo3],
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
      tx: {
        body: 'a300828258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d008258209e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0010182825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a00847a7382583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f821a00117e5ca1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa144475249431903e8021a00029db1',
        hash: '28b67745f005944607a86f03443a759873029e4e336857b100d04fcceeaf6622',
        size: 361,
      },
      max: '8682099',
      totalSpent: '8853540', // plus 1344798 in change output = 10000000
      fee: '171441',
      inputs: [utxo1, utxo2],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '8682099',
          assets: [],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1146460',
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
      tx: {
        body: 'a300828258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d008258209e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0010183825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a000f4240825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a00752d0782583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f821a00117e5ca1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa144475249431903e8021a0002a8dd',
        hash: '4ba68db040d5501d420012f36c33733f5ab2d50ecfbecb574e451db0a2604c4a',
        size: 426,
      },
      max: '7679239',
      totalSpent: '8853540', // plus 1146460 in change output = 10000000
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
          amount: '7679239',
          assets: [],
          setMax: true,
        },
        {
          isChange: true,
          address: changeAddress,
          amount: '1146460',
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
      tx: {
        body: 'a300828258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d008258209e63fddf20cb7b5472e2c9a1bb4bbe3112b8f2b22e45bc441206bcddde5c58a0080182825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d821a00117e5ca1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa144475249431903e882583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a004db303021a00029db1',
        hash: '316246128e30216ca6b52da6f8fe294754a7e6fb12f5e2e68cca3d3be2216cf5',
        size: 361,
      },
      max: '1000',
      totalSpent: '1317901', // plus amount in change output = 6410000
      fee: '171441',
      inputs: [utxo1, utxo7],
      outputs: [
        {
          address:
            'addr1qya0nkzrf04gmcpu66vdt7sudwptnyg5df6475y7jhtt2wc44vzmgrfy6wwf69xlaszdslksw8evveyykw4c82eavq7sx29tlc',
          amount: '1146460',
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
          amount: '5092099',
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
      tx: {
        body: 'a400818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a00e24493021a00029d2d05a1581de1c968b71c91c84fb993108b48938186b7be316f62e5b37d48da3190481a00989680',
        hash: 'abb31a05d06c33d67455b9be93e4fb1f6778c063a29e11a9489997a8b7fdbacf',
        size: 358,
      },
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
      'withdrawing rewards: 1 ADA only utxo, 1 change output, vote drep keyhash',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 9,
        dRep: {
          type: 0, // keyhash
          keyHash: '4519f294d80b0fcc6697bde8f36629be8ebf9527be023fe73673f1a9',
        },
      } as CertificateVoteDelegation,
    ],
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
      tx: {
        body: 'a500818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a00e22787021a0002ba39048183098200581cfb52d3055a3a3a3238ce219a3fc13fe4d8797d5062e8dd4670c7d29b8200581c4519f294d80b0fcc6697bde8f36629be8ebf9527be023fe73673f1a905a1581de1c968b71c91c84fb993108b48938186b7be316f62e5b37d48da3190481a00989680',
        hash: 'b05209422a811ccfc5a1795b2b65c39437611f615799e430a7968ee53c47e908',
        size: 527,
      },
      totalSpent: '178745',
      fee: '178745',
      deposit: '0',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '14821255',
          assets: [],
        },
      ],
    },
  },
  {
    description:
      'withdrawing rewards: 1 ADA only utxo, 1 change output, vote delegation abstain',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 9,
        dRep: {
          type: 2, // abstain
        },
      } as CertificateVoteDelegation,
    ],
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
      tx: {
        body: 'a500818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a00e22caf021a0002b511048183098200581cfb52d3055a3a3a3238ce219a3fc13fe4d8797d5062e8dd4670c7d29b810205a1581de1c968b71c91c84fb993108b48938186b7be316f62e5b37d48da3190481a00989680',
        hash: 'b2db184413b50a57cc7d95bbe10682186bc2d374f7e92ebbe95ffdb726f6836f',
        size: 497,
      },
      totalSpent: '177425',
      fee: '177425',
      deposit: '0',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '14822575',
          assets: [],
        },
      ],
    },
  },
  {
    description:
      'withdrawing rewards: 1 ADA only utxo, 1 change output, vote delegation drep id',
    utxos: [utxo1],
    outputs: [],
    changeAddress: changeAddress,
    certificates: [
      {
        type: 9,
        dRep: {
          type: CardanoDRepType.KEY_HASH,
          keyHash: '3a7f09d3df4cf66a7399c2b05bfa234d5a29560c311fc5db4c490711',
        },
      } as CertificateVoteDelegation,
    ],
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
      tx: {
        body: 'a500818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a00e22787021a0002ba39048183098200581cfb52d3055a3a3a3238ce219a3fc13fe4d8797d5062e8dd4670c7d29b8200581c3a7f09d3df4cf66a7399c2b05bfa234d5a29560c311fc5db4c49071105a1581de1c968b71c91c84fb993108b48938186b7be316f62e5b37d48da3190481a00989680',
        hash: 'fa63ef301262a2b72c430d8234987073aa3199aaa1a5480230a562eae84d1b2c',
        size: 527,
      },
      totalSpent: '178745',
      fee: '178745',
      deposit: '0',
      inputs: [utxo1],
      outputs: [
        {
          isChange: true,
          address: changeAddress,
          amount: '14821255',
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
      tx: {
        body: 'a400818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a017adb13021a00029d2d05a1581de1c968b71c91c84fb993108b48938186b7be316f62e5b37d48da3190481a00989680',
        hash: 'db24027f5f9ad900e506a10b237fb22436645b33c3d057bac2f7d6d941c8039a',
        size: 358,
      },
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
      tx: {
        body: 'a400818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a002b3b47021a00028b79048182008200581cfb52d3055a3a3a3238ce219a3fc13fe4d8797d5062e8dd4670c7d29b',
        hash: '98a5fc454e1d995708172084d1c8e19000015ef0fef2ddc92cbf60de16443005',
        size: 255,
      },
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
      tx: {
        body: 'a400818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a0049a943021a0002a1fd048183028200581cfb52d3055a3a3a3238ce219a3fc13fe4d8797d5062e8dd4670c7d29b581c0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735',
        hash: '8c764ce502653f5970d1e687ec067f9f9e5f6bb11eaf8462846a7b7adabbebb5',
        size: 386,
      },
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
      tx: {
        body: 'a400818258203c388acb799a37a4f1cc99bec7626637b0b80626b9ef7c7a687282cab701178d00018182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a006832eb021a00029cd5048182018200581cfb52d3055a3a3a3238ce219a3fc13fe4d8797d5062e8dd4670c7d29b',
        hash: 'd940832a02c87da9af39ed1396a03b4e5df9b20483473a6ac7959653a2e3746c',
        size: 356,
      },
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
      tx: {
        body: 'a300818258201bfb8b1d06bd28fb33493afaa5b22dec02bb8e292bbd7a6965c9037b5964a808010183825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a000f4240825839013af9d8434bea8de03cd698d5fa1c6b82b991146a755f509e95d6b53b15ab05b40d24d39c9d14dfec04d87ed071f2c66484b3ab83ab3d603d1a001e848082583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f821ae42aa6f5a1581c02477d7c23b4c2834b0be8ca8578dde47af0cc82a964688f6fc95a7aa144475249431a000f3df4021a0002a305',
        hash: 'd94325dbdb650c049bc98e2692373725edd345a1049cdfdd6c0597a5841b3e4f',
        size: 392,
      },
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
      tx: {
        body: 'a3008382582005cf0d8c9824b6e1bf403329d159cc57d89b4c22d93835bbdee46687f7c69c6900825820280c49a69c0fc24c3fdcdbcdd4030da3533a87e4378639bcd4a8841b3d2c6e2102825820d8ff7a39d1daf80ae2e99351c51fbb823f223e717cee09d23bc1b2691092632d00018382583900960ad1294eb27ab1e0c2e620a0fafcc87127d333ffb9d7c18ee16a2d8e38024e1bcbdd6341cb96a3403d5a64ada057798094d2383172b1d4821a0011a008a1581c3b746b6a5f8c43acc6bed9259ff7fc5f0b9e0be8adc3d63edfea98c7a14870726573737572650182583900960ad1294eb27ab1e0c2e620a0fafcc87127d333ffb9d7c18ee16a2d8e38024e1bcbdd6341cb96a3403d5a64ada057798094d2383172b1d4821a00118f32a1581c4f740e06506c0b8a1584760780ce3c61aea3b6061d5596d580e9aae6a1476265726e6172640182583901f8a4be8308c12b910252b6fd6ee4a98730300009382becc049a6e618476aacdafaf01e68c2f072270f078c9689da6139eba4b309e1d5615f1a00179827021a0002c7f9',
        hash: '5cefbb1598171f91bc1b66bce90cfdb872c29b155b6db637ed13fc855b5ee43b',
        size: 607,
      },
      totalSpent: '2488115',
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
      ],
      outputs: [
        {
          address:
            'addr_test1qztq45fff6e84v0qctnzpg86lny8zf7nx0lmn47p3msk5tvw8qpyux7tm435rjuk5dqr6kny4ks9w7vqjnfrsvtjk82quqe75s',
          amount: '1155080',
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
          amount: '1150770',
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
          amount: '1546279',
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
    // utxos: 3.344443 ADA, outputs: 1 ADA + 1.443 ADA in change output + fee. This leaves less than 1 ADA which would be set as "max"
    utxos: [
      {
        address:
          'addr1q860vxljhadqxnrrsr2j6yxnwpdkyquq74lmghx502aj0r28d2kd47hsre5v9urjyu8s0ryk38dxzw0t5jesncw4v90sp0878u',
        txHash:
          'b5d1abd05c1eb0564a34c5daa4a71185aa11568c375ab7f946da889ebcb23a01',
        outputIndex: 1,
        amount: [
          {
            quantity: '1900000',
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
