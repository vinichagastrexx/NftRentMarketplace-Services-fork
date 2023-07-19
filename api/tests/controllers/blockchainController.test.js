const BlockchainController = require('../../src/controllers/blockchainController');
const BlockchainService = require('../../src/services/blockchainService');
const { newBlockchainData, blockchainData, otherBlockchainData, requiredFields } = require('./blockchainMockData');


jest.mock('../../src/services/blockchainService');

let blockchainController;
let blockchainService;
let res;

beforeEach(() => {
  blockchainService = new BlockchainService();
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
          name: 'teste',
          currency: 'tst',
        }
        
        mockMissingData[field] = null;

        const req = { body: mockMissingData };
        await blockchainController.createBlockchain(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });
    });

    it('should return 500 if failed to create blockchain', async () => {
      const req = { body: newBlockchainData };
      jest.spyOn(blockchainService, 'createBlockchain').mockResolvedValue(null);

      await blockchainController.createBlockchain(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create blockchain.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { body: newBlockchainData };

      jest.spyOn(blockchainService, 'createBlockchain').mockRejectedValue(new Error('Test error.'));

      await blockchainController.createBlockchain(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 201 and the new blockchain if it is created', async () => {
        const req = { body: newBlockchainData };
        jest.spyOn(blockchainService, 'createBlockchain').mockResolvedValue(blockchainData);
        
      await blockchainController.createBlockchain(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(blockchainData);
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
      blockchains = [blockchainData, otherBlockchainData];
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
      const blockchain = blockchainData;
      jest.spyOn(blockchainService, 'getById').mockResolvedValue(blockchain);

      await blockchainController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(blockchain);
    });
  });
});