import { Blockchain } from './../../src/entities/blockchain';
import { CreateBlockchainRequest } from "./../../src/models/blockchain/blockchain.interface";

export const mockCreateBlockchain: CreateBlockchainRequest = {
  name: 'Blockchain Name',
  currency: 'bcn',
}

export const mockBlockchain: Blockchain = {
  id: 1,
  name: 'Blockchain Name',
  currency: 'bcn',
}

export const requiredFields = ['name', 'currency'];