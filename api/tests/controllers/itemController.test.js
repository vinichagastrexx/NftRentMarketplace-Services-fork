const ItemController = require('../../src/controllers/itemController');
const ItemService = require('../../src/services/itemService');
const { requiredFields, mockItem, mockNewItem, mockUpdateItem } = require('./itemMockData');

jest.mock('../../src/services/itemService');

let itemController;
let itemService;

beforeEach(() => {
  itemService = new ItemService();
  itemController = new ItemController(itemService);
});

describe('ItemController', () => {
  describe('getItemByNftId', () => {
    it('should return 400 if no nftId is provided', async () => {
      const req = { params: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'NFT ID is required.' });
    });

    it('should return 404 if item is not found', async () => {
      const req = { params: { nftId: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(null);

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { nftId: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'getItemByNftId').mockRejectedValue(new Error('Test error'));

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the item if it is found', async () => {
      const req = { params: { nftId: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(mockItem);

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
  });

  describe('createItem', () => {
    it('should return 400 if item data is not provided', async () => {
      const req = { body: null };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item data is required.' });
    });
    it('should return 400 if any required field is missing', async () => {
      requiredFields.forEach(async (field) => {
        const mockMissingItem = { 
          id: 456, 
          nftId: 123, 
          categoryId: 123, 
          ownerAddress: 'Ana123',
          gameId: 123, 
          nftContractAddress: 'asd', 
          rarityId: 123, 
          blockchainId: 456,
      };
        mockMissingItem[field] = null;

        const req = { body: mockMissingItem };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await itemController.createItem(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });

    });
    it('should return 500 if failed to create item', async () => {
      const req = { body: mockNewItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'createItem').mockResolvedValue(null);

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create item.' });
    });
    it('should return 500 if an error occurs', async () => {
      const req = { body: mockNewItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'createItem').mockRejectedValue(new Error('Test error'));

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
    it('should return 201 and the new item if it is created', async () => {
      const req = { body: mockNewItem };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'createItem').mockResolvedValue(mockNewItem);

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewItem);
    });
  });

  describe('getByOwner', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner adress is not provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner adress is required.' });
    });

    it('should return 404 if items are not found', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getByOwner').mockResolvedValue(null);

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getByOwner').mockRejectedValue(new Error('Test error'));

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and items owned by the specified owner', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const items = [
        mockItem,
        mockNewItem,
      ];

      jest.spyOn(itemService, 'getByOwner').mockResolvedValue(items);

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });
  });

  describe('getIdleByOwner', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner adress is not provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await itemController.getIdleByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner adress is required.' });
    });

    it('should return 404 if items are not found', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getIdleByOwner').mockResolvedValue(null);

      await itemController.getIdleByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getIdleByOwner').mockRejectedValue(new Error('Test error'));

      await itemController.getIdleByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and idle items owned by the specified owner', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getIdleByOwner').mockResolvedValue([mockItem]);

      await itemController.getIdleByOwner(req, res);

      expect(res.json).toHaveBeenCalledWith([mockItem]);
    });

    });

  describe('addToPool', () => {
    const nftId = 456;
    it('should return 400 if nft ID is not provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Nft ID is required.' });
    });

    it('should return 404 if item is not found', async () => {
      const req = { params: { nftId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(null);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 400 if item is already in pool', async () => {
      const req = { params: { nftId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(mockItem);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item is already in pool.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { nftId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(mockNewItem);
      jest.spyOn(itemService, 'addToPool').mockRejectedValue(new Error('Test error'));

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the item if it is added to the pool', async () => {
      const req = { params: { nftId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(mockNewItem);

      jest.spyOn(itemService, 'addToPool').mockResolvedValue(mockUpdateItem);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdateItem);
    });
  });

  describe('getItemsInPoolByUser', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner address is not provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const itemController = new ItemController(null);
      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemsInPoolByUser').mockRejectedValue(new Error('Test error'));

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the items in pool for the specified owner', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemsInPoolByUser').mockResolvedValue([mockItem]);

      await itemController.getItemsInPoolByUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockItem]);
    });

  });

  describe('getItemsRentedByUser', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner address is missing', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 200 and items rented by the specified owner', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemsRentedByUser').mockResolvedValue([mockItem]);

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([mockItem]);
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(itemService, 'getItemsRentedByUser').mockRejectedValue(new Error('Test error'));

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });
});
