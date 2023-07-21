export interface Item {
  id: number; 
  categoryId: number; 
  ownerAddress: string;
  renteeAddress: string | null;
  isInPool: boolean; 
  gameId: number; 
  nftContractAddress: string; 
  nftId: number; 
  rarityId: number; 
  blockchainId: number;
  isRented: boolean;
}