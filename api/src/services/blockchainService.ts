import { Blockchain } from "../entities/blockchain";
import { CreateBlockchainRequest } from "../models/blockchain/blockchain.interface";
import BlockchainModel from "../models/blockchain/blockchainModel";

class BlockchainService {
  constructor(private blockchainModel: BlockchainModel) {
    this.blockchainModel = blockchainModel;
  }

  async createBlockchain(blockchainData: CreateBlockchainRequest): Promise<Blockchain> {
    return await this.blockchainModel.createBlockchain(blockchainData);
  }

  async getAll(): Promise<Blockchain[]> {
    return await this.blockchainModel.getAll();
  }

  async getById(id: string): Promise<Blockchain> {
    const idNum = Number(id);
    return await this.blockchainModel.getById(idNum);
  }
}

export default BlockchainService;
