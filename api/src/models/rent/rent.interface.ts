export interface CreateRentRequest {
  id: number,
  initDate: Date,
  expirationDate: Date,
  priceBlockchain: number,
  ownerAddress: string,
  renteeAddress: string,
  categoryId: number,
  itemId: number
}

export interface FinishRent {
  id: number,
  finishDate: Date,
}

export interface FinishRentRequest extends FinishRent {
  itemId: number
}