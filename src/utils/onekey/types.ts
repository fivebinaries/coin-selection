export type ITransferInfo = {
  from: string;
  to: string;
  amount: string;
  token?: string; // tokenIdOnNetwork
  isNFT?: boolean;
  tokenId?: string; // NFT token id
  type?: string; // NFT standard: erc721/erc1155
};

export type IAdaAmount = {
  unit: string;
  quantity: string;
};

export type IAdaUTXO = {
  path: string;
  address: string;
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount: IAdaAmount[];
};

export type IOutput = {
  address: string;
  amount: string;
  assets: [];
};

export type IEncodeInput = {
  address: string;
  amount: IAdaAmount[];
  block: string;
  data_hash: string;
  outputIndex: number;
  txHash: string;
  tx_hash: string;
  tx_index: number;
};

export type IEncodeOutput = {
  address: string;
  amount: string;
  assets: IAdaAmount[];
  isChange?: boolean;
};

type ITxInfo = {
  body: string;
  hash: string;
  size: number;
};

export type IEncodedTxADA = {
  inputs: IEncodeInput[];
  outputs: IEncodeOutput[];
  fee: string;
  totalSpent: string;
  totalFeeInNative: string;
  transferInfo: ITransferInfo;
  tx: ITxInfo;
  signOnly?: boolean;
};
