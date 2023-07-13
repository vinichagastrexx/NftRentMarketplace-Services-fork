const ItemController = require('../../src/controllers/itemController');
const ItemService = require('../../src/services/itemService');
const { mockNewItem, resMockNewItem, requiredFields, mockItemIsInPool, mockItemIsRented } = require('./itemMockData');

jest.mock('../../src/services/itemService');

let itemController;
let itemService;
let res;

beforeEach(() => {
  itemService = new ItemService();
  itemController = new ItemController(itemService);
  res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
});

describe('ItemController', () => {
  describe('getItemByNftId', () => {
    const nftId = 123;
    const nftContractAddress = 'asd';
    it('should return 400 if no nftId or nftContractAddress is provided', async () => {
      const req = { params: {} };

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'NFT ID and NFT Contract Address are required.' });
    });

    it('should return 404 if item is not found', async () => {
      const req = { params: { nftId, nftContractAddress } };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(null);

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { nftId, nftContractAddress } };

      jest.spyOn(itemService, 'getItemByNftId').mockRejectedValue(new Error('Test error'));

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the item if it is found', async () => {
      const req = { params: { nftId, nftContractAddress } };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(resMockNewItem);

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(resMockNewItem);
    });
  });

  describe('createItem', () => {
    it('should return 400 if item data is not provided', async () => {
      const req = { body: null };

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

        await itemController.createItem(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: `Field ${field} is required.` });
      });

    });
    it('should return 500 if failed to create item', async () => {
      const req = { body: mockNewItem };

      jest.spyOn(itemService, 'createItem').mockResolvedValue(null);

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create item.' });
    });
    it('should return 500 if an error occurs', async () => {
      const req = { body: mockNewItem };

      jest.spyOn(itemService, 'createItem').mockRejectedValue(new Error('Test error'));

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });
    it('should return 201 and the new item if it is created', async () => {
      const req = { body: mockNewItem };

      jest.spyOn(itemService, 'createItem').mockResolvedValue(resMockNewItem);

      await itemController.createItem(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(resMockNewItem);
    });
  });

  describe('getByOwner', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner address is not provided', async () => {
      const req = { params: {} };

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if items are not found', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getByOwner').mockResolvedValue(null);

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getByOwner').mockRejectedValue(new Error('Test error'));

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and items owned by the specified owner', async () => {
      const req = { params: { ownerAddress } };

      const items = [
        mockItemIsInPool,
        mockItemIsRented,
      ];

      jest.spyOn(itemService, 'getByOwner').mockResolvedValue(items);

      await itemController.getByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });
  });

  describe('getIdleByOwner', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner address is not provided', async () => {
      const req = { params: {} };

      await itemController.getIdleByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if items are not found', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getIdleByOwner').mockResolvedValue(null);

      await itemController.getIdleByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getIdleByOwner').mockRejectedValue(new Error('Test error'));

      await itemController.getIdleByOwner(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and idle items owned by the specified owner', async () => {
      const req = { params: { ownerAddress } };

      const items = [
        resMockNewItem,
        mockItemIsInPool
      ]
      jest.spyOn(itemService, 'getIdleByOwner').mockResolvedValue(items);

      await itemController.getIdleByOwner(req, res);

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
      const req = { params: { itemId } };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(null);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 400 if item is already in pool', async () => {
      const req = { params: { itemId } };

      jest.spyOn(itemService, 'getById').mockResolvedValue(mockItemIsInPool);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item is already in pool.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { itemId } };

      jest.spyOn(itemService, 'getById').mockResolvedValue(resMockNewItem);
      jest.spyOn(itemService, 'addToPool').mockRejectedValue(new Error('Test error'));

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the item if it is added to the pool', async () => {
      const req = { params: { itemId } };

      jest.spyOn(itemService, 'getById').mockResolvedValue(resMockNewItem);

      jest.spyOn(itemService, 'addToPool').mockResolvedValue(mockItemIsInPool);

      await itemController.addToPool(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItemIsInPool);
    });
  });

  describe('getItemsInPoolByUser', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner address is not provided', async () => {
      const req = { params: {} };

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if item is not found', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getItemsInPoolByUser').mockResolvedValue(null);

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items in pool by user not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getItemsInPoolByUser').mockRejectedValue(new Error('Test error'));

      await itemController.getItemsInPoolByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and the items in pool for the specified owner', async () => {
      const req = { params: { ownerAddress } };
      const items = [
        mockItemIsInPool,
      ]
      jest.spyOn(itemService, 'getItemsInPoolByUser').mockResolvedValue(items);

      await itemController.getItemsInPoolByUser(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(items);
    });

  });

  describe('getItemsRentedByUser', () => {
    const ownerAddress = 'Ana123';
    it('should return 400 if owner address is not provided', async () => {
      const req = { params: {} };

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Owner address is required.' });
    });

    it('should return 404 if item is not found', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getItemsRentedByUser').mockResolvedValue(null);

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Items rented by user not found.' });
    });

    it('should return 200 and items rented by the specified owner', async () => {
      const req = { params: { ownerAddress } };

      jest.spyOn(itemService, 'getItemsRentedByUser').mockResolvedValue([mockItemIsRented]);

      await itemController.getItemsRentedByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([mockItemIsRented]);
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

    describe('getById', () => {
    const id = 'Ana123';
    it('should return 400 if item id is not provided', async () => {
      const req = { params: {} };

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item id is required.' });
    });

    it('should return 404 if item is not found', async () => {
      const req = { params: { id } };

      jest.spyOn(itemService, 'getById').mockResolvedValue(null);

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found.' });
    });

    it('should return 500 if a server error occurs', async () => {
      const req = { params: { id } };

      jest.spyOn(itemService, 'getById').mockRejectedValue(new Error('Test error'));

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return 200 and items rented by the specified owner', async () => {
      const req = { params: { id } };

      jest.spyOn(itemService, 'getById').mockResolvedValue(resMockNewItem);

      await itemController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(resMockNewItem);
    });
  });
});
