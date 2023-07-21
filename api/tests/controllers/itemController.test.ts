import ItemController from '../../src/controllers/itemController';
import ItemModel from '../../src/models/item/itemModel';
import ItemService from '../../src/services/itemService';
import { mockCreateItem, mockItem, mockNftData, requiredFields } from './itemMockData';

jest.mock('../../src/services/itemService');

let itemController;
let itemService;
let itemModel;
let res;
let req;

beforeEach(() => {
  itemModel = new ItemModel();
  itemService = new ItemService(itemModel);
  itemController = new ItemController(itemService);
  res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
});

describe('ItemController', () => {
  describe('getItemByNftId', () => {
    it('should return 400 if no nftId or nftContractAddress is provided', async () => {
      req = { params: { } };

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'NFT ID and NFT Contract Address are required.' });
    });

    it('should return 404 if item is not found', async () => {
      req = { params: mockNftData };
      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(null);

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      req = { params: mockNftData };
      jest.spyOn(itemService, 'getItemByNftId').mockRejectedValue(new Error('Test error'));

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the item if it is found', async () => {
      req = { params: mockNftData };
      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(mockItem);

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
  });

  describe('createItem', () => {
    it('should return 400 if item data is not provided', async () => {
      req = { body: null };

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
          ownerAddress: 'owner123',
          gameId: 123, 
          nftContractAddress: 'nftContractAddress123', 
          rarityId: 123, 
          blockchainId: 456,
      };
        mockMissingItem[field] = null;

        req = { body: mockMissingItem };

        await itemController.createItem(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });

    });
    it('should return 500 if failed to create item', async () => {
      req = { body: mockCreateItem };
      jest.spyOn(itemService, 'createItem').mockResolvedValue(null);

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create item.' });
    });
    it('should return 500 if an error occurs', async () => {
      req = { body: mockCreateItem };
      jest.spyOn(itemService, 'createItem').mockRejectedValue(new Error('Test error'));

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
    it('should return 201 and the new item if it is created', async () => {
      req = { body: mockCreateItem };
      jest.spyOn(itemService, 'createItem').mockResolvedValue(mockItem);

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
  });

  describe('getByOwner', () => {
    const ownerAddress = 'owner123';
    it('should return 400 if owner address is not provided', async () => {
      const req = { params: {} };

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if items are not found', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getByOwner').mockResolvedValue(null);

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getByOwner').mockRejectedValue(new Error('Test error'));

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and items owned by the specified owner', async () => {
      req = { params: { ownerAddress } };
      const items = [mockItem];

      jest.spyOn(itemService, 'getByOwner').mockResolvedValue(items);

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });
  });

  describe('addToPool', () => {
    const itemId = 456;
    it('should return 400 if nft ID is not provided', async () => {
      const req = { params: {} };

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item ID is required.' });
    });

    it('should return 404 if item is not found', async () => {
      req = { params: { itemId } };
      jest.spyOn(itemService, 'getById').mockResolvedValue(null);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 400 if item is already in pool', async () => {
      req = { params: { itemId } };
      const mockItemIsInPool = { ...mockItem };
      mockItemIsInPool.isInPool = true;
      jest.spyOn(itemService, 'getById').mockResolvedValue(mockItemIsInPool);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item is already in pool.' });
    });

    it('should return 500 if a server error occurs', async () => {
      req = { params: { itemId } };
      jest.spyOn(itemService, 'getById').mockResolvedValue(mockItem);
      jest.spyOn(itemService, 'addToPool').mockRejectedValue(new Error('Test error'));

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the item if it is added to the pool', async () => {
      req = { params: { itemId } };

      jest.spyOn(itemService, 'getById').mockResolvedValue(mockItem);
      jest.spyOn(itemService, 'addToPool').mockResolvedValue(mockItem);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
  });

  describe('getItemsInPoolByUser', () => {
    const ownerAddress = 'owner123';
    
    it('should return 400 if owner address is not provided', async () => {
      req = { params: {} };

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if item is not found', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getItemsInPoolByUser').mockResolvedValue(null);

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items in pool by user not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getItemsInPoolByUser').mockRejectedValue(new Error('Test error'));

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the items in pool for the specified owner', async () => {
      req = { params: { ownerAddress } };
      const items = [mockItem];
      jest.spyOn(itemService, 'getItemsInPoolByUser').mockResolvedValue(items);

      await itemController.getItemsInPoolByUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });

  });

  describe('getItemsRentedByUser', () => {
    const ownerAddress = 'owner123';
    req = { params: { ownerAddress } };

    it('should return 400 if owner address is not provided', async () => {
      req = { params: {} };

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if item is not found', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getItemsRentedByUser').mockResolvedValue(null);

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items rented by user not found.' });
    });

    it('should return 200 and items rented by the specified owner', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getItemsRentedByUser').mockResolvedValue([mockItem]);

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([mockItem]);
    });

    it('should return 500 if a server error occurs', async () => {
      req = { params: { ownerAddress } };
      jest.spyOn(itemService, 'getItemsRentedByUser').mockRejectedValue(new Error('Test error'));

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
  });

  describe('getById', () => {
    const id = 'owner123';

    it('should return 400 if item id is not provided', async () => {
      req = { params: {} };

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item id is required.' });
    });

    it('should return 404 if item is not found', async () => {
      req = { params: { id } };
      jest.spyOn(itemService, 'getById').mockResolvedValue(null);

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      req = { params: { id } };
      jest.spyOn(itemService, 'getById').mockRejectedValue(new Error('Test error'));

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and items rented by the specified owner', async () => {
      req = { params: { id } };
      jest.spyOn(itemService, 'getById').mockResolvedValue(mockItem);

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
  });
});
