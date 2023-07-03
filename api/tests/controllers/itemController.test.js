const ItemController = require('../../src/controllers/itemController');
const ItemService = require('../../src/services/itemService');

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

    it('should return 500 if an error occurs', async () => {
      const req = { params: { nftId: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(itemService, 'getItemByNftId').mockRejectedValue(new Error('Test error'));

      await itemController.getItemByNftId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error.' });
    });

    it('should return the item if it is found', async () => {
      const req = { params: { nftId: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockItem = { id: 123, name: 'Test item' };

      jest.spyOn(itemService, 'getItemByNftId').mockResolvedValue(mockItem);

      await itemController.getItemByNftId(req, res);

      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
  });
});
