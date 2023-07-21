import { Rent } from '../entities/rent';
import { CreateRentRequest, FinishRent } from '../models/rent/rent.interface';
import RentModel from '../models/rent/rentModel';


class RentService {
  constructor(private rentModel: RentModel) {
    this.rentModel = rentModel;
  }

  async createRent(rentData: CreateRentRequest): Promise<Rent> {
    return await this.rentModel.createRent(rentData);
  }

  async getRentById(id: string): Promise<Rent> {
    const idNum = Number(id); 
    return await this.rentModel.getRentById(idNum);
  }

  async getActiveByOwner(ownerAddress: string): Promise<Rent[]> {
    return await this.rentModel.getActiveByOwner(ownerAddress);
  }

  async getActiveByRentee(renteeAddress: string): Promise<Rent[]> {
    return await this.rentModel.getActiveByRentee(renteeAddress);
  }

  async finishRent(finishRentData: FinishRent): Promise<Rent> {
    return await this.rentModel.finishRent(finishRentData);
  }

  async getAllByRentee(renteeAddress: string): Promise<Rent[]> {
    return await this.rentModel.getAllByRentee(renteeAddress);
  }
}

export default RentService;
