export const dummyStakingKeyHash =
  '32c728d3861e164cab28cb8f006448139c8f1740ffb8e7aa9e5232dc';
export const dummyAddress =
  'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp';
export const dummyStakingAddress =
  'stake1u8yk3dcuj8yylwvnzz953yups6mmuvt0vtjmxl2gmgceqjqz2yfd2';

export const CertificateType = {
  STAKE_REGISTRATION: 0,
  STAKE_DEREGISTRATION: 1,
  STAKE_DELEGATION: 2,
  STAKE_POOL_REGISTRATION: 3,
} as const;

export const ERROR = {
  UTXO_BALANCE_INSUFFICIENT: {
    code: 'UTXO_BALANCE_INSUFFICIENT',
    message: 'UTxO balance insufficient',
  },
};
