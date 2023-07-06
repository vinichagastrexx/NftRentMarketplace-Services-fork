const PoolController = require('../../src/controllers/poolController');
const PoolService = require('../../src/services/poolService');
const { newPoolData, poolData, otherPoolData, requiredFields } = require('./poolMockData');


jest.mock('../../src/services/poolService');

let poolController;
let poolService;
let res;

beforeEach(() => {
  poolService = new PoolService();
  poolController = new PoolController(poolService);

  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

describe('PoolController', () => {
  describe('getAll', () => {
    const req = '';
    it('should return 404 if pools is not found', async () => {
      jest.spyOn(poolService, 'getAll').mockResolvedValue(null);

      await poolController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pools not found.' });
    });

    it('should return 200 and get all pools', async () => {
      pools = [poolData, otherPoolData];
      jest.spyOn(poolService, 'getAll').mockResolvedValue(pools);

      await poolController.getAll(req, res);

      expect(poolService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ pools });
    });

    it('should return 500 if a server error occurs', async () => {

      jest.spyOn(poolService, 'getAll').mockRejectedValue(new Error('Server error.'));

      await poolController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

  });
  describe('getById', () => {
    const id = 123;
    it('should return 400 if pool id is not provided', async () => {
    const req = { params: { id: null } };

    await poolController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Pool id is required.' });
    });

    it('should return 404 if pool is not found', async () => {
      const req = { params: { id } };
      jest.spyOn(poolService, 'getById').mockResolvedValue(null);

      await poolController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pool not found.' });
    });
    
    it('should return 200 and the pool by the specified ID', async () => {
      const req = { params: { id } };
      const pool = poolData;
      jest.spyOn(poolService, 'getById').mockResolvedValue(pool);

      await poolController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ pool });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { id } };

      jest.spyOn(poolService, 'getById').mockRejectedValue(new Error('Server error.'));

      await poolController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });
  describe('createPool', () => {  
    it('should return 400 if pool data is not provided', async () => {
      const req = { body: null };

      await poolController.createPool(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pool data is required.' });
    });

    it('should return 400 if any required field is missing', async () => {
      requiredFields.forEach(async (field) => {
        const mockMissingData = {
          categoryId: 1,
          basePrice: 100,
          gameId: 1,
        }
        
        mockMissingData[field] = null;

        const req = { body: mockMissingData };
        await poolController.createPool(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });
    });

    it('should return 201 and the new pool if it is created', async () => {
        const req = { body: newPoolData };
        jest.spyOn(poolService, 'createPool').mockResolvedValue(poolData);
        
      await poolController.createPool(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(poolData);
    });
    it('should return 500 if a server error occurs', async () => {
      const req = { body: poolData };

      jest.spyOn(poolService, 'createPool').mockRejectedValue(new Error('Server error.'));

      await poolController.createPool(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });
});