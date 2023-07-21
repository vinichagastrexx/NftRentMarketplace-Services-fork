import { Pool } from "./../../src/entities/pool";
import { CreatePoolRequest, GetPoolResponse } from "./../../src/models/pool/pool.interface";

export const mockCreatePoolRequest: CreatePoolRequest = {
  categoryId: 2,
  basePrice: 100,
  gameId: 1,
}

export const mockPool: Pool = {
  categoryId: 1,
  basePrice: 100,
  gameId: 1,
  imageUrl: 'aws.com/image.png',
  isActive: true,
}

export const mockPoolResponse: GetPoolResponse = {
  categoryId: 1,
  basePrice: 100,
  gameId: 1,
  imageUrl: 'aws.com/image.png',
  isActive: true,
  categoryName: 'category name',
  shortDescription: 'short description about category',
  itemTypeId: 1,
  rarityName: 'rarity name',
  rarityId: 1,
}

export const requiredFields = ['categoryId', 'basePrice', 'gameId'];