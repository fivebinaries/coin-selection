export interface Utxo {
  address: string; // address to which the utxo belongs to (necessary only for calculating correct cost of an input, maybe could be replaced by a dummy address)
  txHash: string;
  outputIndex: number;
  amount: {
    unit: string;
    quantity: string;
  }[];
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
}
