import { Rent } from './../../src/entities/rent';
import { CreateRentRequest } from './../../src/models/rent/rent.interface';
import { RENT_STATUS } from './../../enums/rentStatus.enum';

export const mockCreateRentRequest: CreateRentRequest = {
  id: 1,
  initDate: new Date('2023-07-01'),
  expirationDate: new Date('2023-07-15'),
  priceBlockchain: 100,
  ownerAddress: "owner123",
  renteeAddress: "rentee456",
  categoryId: 1,
  itemId: 123
}

export const mockRent: Rent = {
  id: 1,
  initDate: new Date('2023-07-01'),
  expirationDate: new Date('2023-07-15'),
  finishDate: null,
  priceBlockchain: 100,
  ownerAddress: 'owner123',
  renteeAddress: 'rentee456',
  categoryId: 1,
  itemId: 123,
  rentStatusId: RENT_STATUS.ACTIVE,
}; 

export const mockFinishRentRequest = {
  id: 2,
  finishDate: '2023-07-07',
  itemId: 123
}

export const requiredFieldsFinishRent = ['id', 'finishDate', 'itemId']

export const requiredFieldsCreateRent = ['id', 'initDate', 'expirationDate', 'priceBlockchain', 'ownerAddress', 'renteeAddress', 'categoryId', 'itemId'];