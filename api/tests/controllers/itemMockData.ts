import { CreateItemRequest, GetItemByNftIdRequest } from './../../src/models/item/item.interface';
import { Item } from "./../../src/entities/item";

export const mockCreateItem: CreateItemRequest = { 
  id: 123, 
  nftId: 456, 
  categoryId: 123, 
  ownerAddress: 'owner123',
  gameId: 456, 
  nftContractAddress: 'nftContractAddress123', 
  rarityId: 123, 
  blockchainId: 456,
};

export const mockItem: Item = { 
  id: 456, 
  nftId: 123, 
  categoryId: 123, 
  ownerAddress: 'owner123',
  renteeAddress: null,
  isInPool: false, 
  gameId: 123, 
  nftContractAddress: 'nftContractAddress123', 
  rarityId: 123, 
  blockchainId: 456,
  isRented: false,
};

export const mockNftData: GetItemByNftIdRequest = {
  nftId: '123',
  nftContractAddress: 'nftContractAddress123',
}

export const requiredFields = ['id', 'categoryId', 'ownerAddress', 'gameId', 'nftContractAddress', 'nftId', 'rarityId', 'blockchainId'];