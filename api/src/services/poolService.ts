import { Pool } from "../entities/pool";
import { CreatePoolRequest, GetPoolResponse } from "../models/pool/pool.interface";
import PoolModel from "../models/pool/poolModel";

class PoolService {
  constructor(private poolModel: PoolModel) {
    this.poolModel = poolModel;
  }

  async getAll(): Promise <GetPoolResponse[]> {
    return await this.poolModel.getAll();
  }

  async getById(categoryId: string): Promise <GetPoolResponse> {
    const categoryIdNum = Number(categoryId);
    return await this.poolModel.getById(categoryIdNum);
  }

  async createPool(poolData: CreatePoolRequest): Promise<Pool> {
    return await this.poolModel.createPool(poolData);
  }
}

export default PoolService;
