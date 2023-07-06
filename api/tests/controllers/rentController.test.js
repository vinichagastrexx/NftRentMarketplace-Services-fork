const RentController = require('../../src/controllers/rentController');
const RentService = require('../../src/services/rentService');
const ItemService = require('../../src/services/itemService');
const { newRentData, rentData, requiredFields } = require('./rentMockData');

jest.mock('../../src/services/rentService');
jest.mock('../../src/services/itemService');

let rentController;
let rentService;
let itemService;
let res;

beforeEach(() => {
  rentService = new RentService();
  itemService = new ItemService();
  rentController = new RentController(rentService, itemService);
  
  res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
});

describe('RentController', () => {
  describe('createRent', () => {
    it('should return 400 if rent data is not provided', async () => {
      const req = { body: null };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await rentController.createRent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Rent data is required.' });
    });

    it('should return 400 if any required field is missing', async () => {
      requiredFields.forEach(async (field) => {
        const mockMissingRentData= { 
          id: 2,
          initDate: '2023-07-01',
          expirationDate: '2023-07-15',
          priceBlockchain: 100,
          ownerAddress: 'owner123',
          renteeAddress: 'rentee123',
          poolId: 1,
          itemId: 123,
      };
        mockMissingRentData[field] = null;

        const req = { body: mockMissingRentData };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await rentController.createRent(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });
    });

    it('should return 201 and the new rent if it is created', async () => {
      const req = { body: newRentData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'createRent').mockResolvedValue(newRentData);
      jest.spyOn(itemService, 'rentItem').mockResolvedValue();

      await rentController.createRent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newRentData);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { body: rentData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'createRent').mockRejectedValue(new Error('Test error'));
      jest.spyOn(itemService, 'rentItem').mockRejectedValue(new Error('Test error'));      

      await rentController.createRent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('getRentById', () => {
    const rentId = { id: 1 };
    it('should return 404 if rented item is not found', async () => {
      const req = { params: rentId };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'getRentById').mockResolvedValue(null);

      await rentController.getRentById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Rent not found.' });
    });
    
    it('should return 200 and the rent data with the specified ID', async () => {
      const req = { params: rentId };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'getRentById').mockResolvedValue(rentData);

      await rentController.getRentById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(rentData);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: rentId };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'getRentById').mockRejectedValue(new Error('Test error'));

      await rentController.getRentById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('getActiveByOwner', () => {
    const ownerAddress = 'owner123';
    it('should return 404 if rented item is not found', async () => {
      const req = { params: { ownerAddress } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'getActiveByOwner').mockResolvedValue(null);

      await rentController.getActiveByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Active rents by owner not found.' });
    });

    it('should return 200 and active rents for the specified owner', async () => {
      const req = { params: { ownerAddress } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };


      jest.spyOn(rentService, 'getActiveByOwner').mockResolvedValue([rentData]);


      await rentController.getActiveByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([rentData]);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'getActiveByOwner').mockRejectedValue(new Error('Test error'));

      await rentController.getActiveByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('getActiveByRentee', () => {
    const renteeAddress = 'rentee123';
    it('should return 200 and active rents for the specified rentee', async () => {
      const req = { params: { renteeAddress } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(rentService, 'getActiveByRentee').mockResolvedValue([rentData]);

      await rentController.getActiveByRentee(req, res);

      expect(rentService.getActiveByRentee).toHaveBeenCalledWith(renteeAddress);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([rentData]);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { renteeAddress } };

      jest.spyOn(rentService, 'getActiveByRentee').mockRejectedValue(new Error('Test error'));

      await rentController.getActiveByRentee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('finishRent', () => {
    const id = 1;
    it('should return 200 and finish the rent with the specified ID', async () => {
      const req = { params: { id } }

      jest.spyOn(rentService, 'finishRent').mockResolvedValue(rentData);
      jest.spyOn(itemService, 'finishRent').mockResolvedValue();
      
      await rentController.finishRent(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(rentData);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { id } };

      jest.spyOn(rentService, 'finishRent').mockRejectedValue(new Error('Test error'));
      
      await rentController.finishRent(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('getAllByRentee', () => {
    const renteeAddress = 'rentee123';
    it('should return all rents for the specified rentee', async () => {
      const req = { params: { renteeAddress } };
      rentService.getAllByRentee.mockResolvedValue([rentData]);

      await rentController.getAllByRentee(req, res);

      expect(rentService.getAllByRentee).toHaveBeenCalledWith(renteeAddress);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([rentData]);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { renteeAddress } };

      jest.spyOn(rentService, 'getAllByRentee').mockRejectedValue(new Error('Test error'));

      await rentController.getAllByRentee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

});