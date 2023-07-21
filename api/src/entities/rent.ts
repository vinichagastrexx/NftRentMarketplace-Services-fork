import { RENT_STATUS } from "../../enums/rentStatus.enum";

export interface Rent {
  id: number;
  initDate: Date;
  expirationDate: Date;
  finishDate: Date | null;
  priceBlockchain: number;
  ownerAddress: string;
  renteeAddress: string | null;
  categoryId: number;
  itemId: number;
  rentStatusId: RENT_STATUS;
}