import { Pool } from "../../entities/pool";

export interface CreatePoolRequest {
  categoryId: number,
  gameId: number,
  basePrice: number,
}

export interface GetPoolResponse extends Pool {
  categoryName: string,
  shortDescription: string,
  itemTypeId: number,
  rarityName: string,
  rarityId: number,
}