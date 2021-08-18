export interface Utxo {
  address: string; // address to which the utxo belongs to (necessary only for calculating correct cost of an input, maybe could be replaced by a dummy address)
  txHash: string;
  outputIndex: number;
  amount: {
    unit: string;
    quantity: string;
  }[];
}

export interface ChangeAddress {
  address: string;
  path: string;
  stakingPath: string;
}

export interface CardanoCertificatePointer {
  blockIndex: number;
  txIndex: number;
  certificateIndex: number;
}

export interface BaseOutput {
  amount: string;
  assets:
    | {
        unit: string;
        quantity: string;
      }[]
    | undefined;
}

export interface ExternalOutput extends BaseOutput {
  address: string;
  // addressParameters: never;
}

export interface ChangeOutput extends BaseOutput {
  // address?: never;
  addressParameters: {
    addressType: CardanoAddressType;
    path: string | number[];
    stakingPath?: string | number[];
    stakingKeyHash?: string;
    certificatePointer?: CardanoCertificatePointer;
  };
}

export type Output = ExternalOutput | ChangeOutput;

export enum CardanoAddressType {
  BASE = 0,
  BASE_SCRIPT_KEY = 1,
  BASE_KEY_SCRIPT = 2,
  BASE_SCRIPT_SCRIPT = 3,
  POINTER = 4,
  POINTER_SCRIPT = 5,
  ENTERPRISE = 6,
  ENTERPRISE_SCRIPT = 7,
  BYRON = 8,
  REWARD = 14,
  REWARD_SCRIPT = 15,
}

export interface CoinSelectionResult {
  inputs: Utxo[];
  outputs: Output[];
  fee: string;
  totalSpent: string;
  deposit: string;
  withdrawal: string;
}

export interface Withdrawal {
  stakingAddress?: string;
  amount: string;
}

export enum CertificateType {
  STAKE_REGISTRATION = 0,
  STAKE_DEREGISTRATION = 1,
  STAKE_DELEGATION = 2,
  STAKE_POOL_REGISTRATION = 3,
}

export interface CertificateStakeRegistration {
  type:
    | CertificateType.STAKE_REGISTRATION
    | CertificateType.STAKE_DEREGISTRATION;
  stakingKeyHash?: string;
}

export interface CertificateStakeDelegation {
  type: CertificateType.STAKE_DELEGATION;
  stakingKeyHash?: string;
  pool: string;
}

export interface CertificateStakePoolRegistration {
  type: CertificateType.STAKE_POOL_REGISTRATION;
  pool_parameters: Record<string, unknown>;
}

export type Certificate =
  | CertificateStakeRegistration
  | CertificateStakeDelegation
  | CertificateStakePoolRegistration;
