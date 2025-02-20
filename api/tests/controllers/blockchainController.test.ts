import BlockchainController from '../../src/controllers/blockchainController';
import BlockchainService from '../../src/services/blockchainService';
import BlockchainModel from '../../src/models/blockchain/blockchainModel';
import { mockBlockchain, mockCreateBlockchain, requiredFields } from './blockchainMockData';


jest.mock('../../src/services/blockchainService');

let blockchainModel;
let blockchainController;
let blockchainService;
let res;

beforeEach(() => {
  blockchainModel = new BlockchainModel();
  blockchainService = new BlockchainService(blockchainModel);
  blockchainController = new BlockchainController(blockchainService);

  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

describe('BlockchainController', () => {
    describe('createBlockchain', () => {  
    it('should return 400 if blockchain data is not provided', async () => {
      const req = { body: null };

      await blockchainController.createBlockchain(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Blockchain data is required.' });
    });

    it('should return 400 if any required field is missing', async () => {
      requiredFields.forEach(async (field) => {
        const mockMissingData = {
          name: 'blockchain name',
          currency: 'bc',
        }
        
        mockMissingData[field] = null;

        const req = { body: mockMissingData };
        await blockchainController.createBlockchain(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });
    });

    it('should return 500 if failed to create blockchain', async () => {
      const req = { body: mockCreateBlockchain };
      jest.spyOn(blockchainService, 'createBlockchain').mockResolvedValue(null);

      await blockchainController.createBlockchain(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create blockchain.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { body: mockCreateBlockchain };

      jest.spyOn(blockchainService, 'createBlockchain').mockRejectedValue(new Error('Test error.'));

      await blockchainController.createBlockchain(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 201 and the new blockchain if it is created', async () => {
        const req = { body: mockCreateBlockchain };
        jest.spyOn(blockchainService, 'createBlockchain').mockResolvedValue(mockBlockchain);
        
      await blockchainController.createBlockchain(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockBlockchain);
    });
  });
  describe('getAll', () => {
    const req = '';
    it('should return 404 if blockchains is not found', async () => {
      jest.spyOn(blockchainService, 'getAll').mockResolvedValue(null);

      await blockchainController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Blockchains not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      jest.spyOn(blockchainService, 'getAll').mockRejectedValue(new Error('Server error.'));

      await blockchainController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and get all blockchains', async () => {
      const blockchains = [mockBlockchain];
      jest.spyOn(blockchainService, 'getAll').mockResolvedValue(blockchains);

      await blockchainController.getAll(req, res);

      expect(blockchainService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(blockchains);
    });

  });
  describe('getById', () => {
    const id = 123;
    it('should return 400 if category id is not provided', async () => {
    const req = { params: { id: null } };

    await blockchainController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Id is required.' });
    });

    it('should return 404 if blockchain is not found', async () => {
      const req = { params: { id } };
      jest.spyOn(blockchainService, 'getById').mockResolvedValue(null);

      await blockchainController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Blockchain not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { id } };

      jest.spyOn(blockchainService, 'getById').mockRejectedValue(new Error('Server error.'));

      await blockchainController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the blockchain by the specified ID', async () => {
      const req = { params: { id } };
      jest.spyOn(blockchainService, 'getById').mockResolvedValue(mockBlockchain);

      await blockchainController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBlockchain);
    });
  });
});