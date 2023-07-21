import PoolController from '../../src/controllers/poolController';
import PoolModel from '../../src/models/pool/poolModel';
import PoolService from '../../src/services/poolService';
import { mockPool, mockCreatePoolRequest, mockPoolResponse, requiredFields } from './poolMockData';

jest.mock('../../src/services/poolService');

let poolController;
let poolService;
let poolModel;
let res;
let req;

beforeEach(() => {
  poolModel = new PoolModel();
  poolService = new PoolService(poolModel);
  poolController = new PoolController(poolService);

  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

describe('PoolController', () => {
  describe('getAll', () => {
    req = {};
    it('should return 404 if pools is not found', async () => {
      jest.spyOn(poolService, 'getAll').mockResolvedValue(null);

      await poolController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pools not found.' });
    });

    it('should return 200 and get all pools', async () => {
      const pools = [mockPoolResponse];
      jest.spyOn(poolService, 'getAll').mockResolvedValue(pools);

      await poolController.getAll(req, res);

      expect(poolService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pools);
    });

    it('should return 500 if a server error occurs', async () => {
      jest.spyOn(poolService, 'getAll').mockRejectedValue(new Error('Server error.'));

      await poolController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

  });
  describe('getById', () => {
    const categoryId = 123;

    it('should return 400 if category id is not provided', async () => {
      req = { params: {} };

      await poolController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Category id is required.' });
    });

    it('should return 404 if pool is not found', async () => {      
      req = { params: { categoryId } };
      jest.spyOn(poolService, 'getById').mockResolvedValue(null);

      await poolController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pool not found.' });
    });
    
    it('should return 200 and the pool by the specified ID', async () => {
      const pool = mockPoolResponse;
      jest.spyOn(poolService, 'getById').mockResolvedValue(pool);
      
      await poolController.getById(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pool);
    });

    it('should return 500 if a server error occurs', async () => {
      jest.spyOn(poolService, 'getById').mockRejectedValue(new Error('Server error.'));

      await poolController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });
  describe('createPool', () => {  
    it('should return 400 if pool data is not provided', async () => {
      req = { body: null };

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

        req = { body: mockMissingData };
        await poolController.createPool(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });
    });

    it('should return 201 and the new pool if it is created', async () => {
      req = { body: mockCreatePoolRequest };
      jest.spyOn(poolService, 'createPool').mockResolvedValue(mockPool);
        
      await poolController.createPool(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPool);
    });

    it('should return 500 if failed to create pool', async () => {
      jest.spyOn(poolService, 'createPool').mockResolvedValue(null);

      await poolController.createPool(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create pool.' });
    });

    it('should return 500 if a server error occurs', async () => {
      jest.spyOn(poolService, 'createPool').mockRejectedValue(new Error('Server error.'));

      await poolController.createPool(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });
});