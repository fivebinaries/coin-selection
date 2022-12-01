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
