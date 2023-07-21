export interface GetItemByNftIdRequest {
  nftId: string,
  nftContractAddress: string,
}

export interface CreateItemRequest { 
  id: number, 
  categoryId: number, 
  ownerAddress: string,
  gameId: number, 
  nftContractAddress: string, 
  nftId: number, 
  rarityId: number, 
  blockchainId: number,
}

export interface RentItemRequest {
  itemId: number,
  renteeAddress: string,
}