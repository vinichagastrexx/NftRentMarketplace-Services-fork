const ItemService = require('../services/itemService');

class ItemController {
  static async createItem(req, res) {
    const { nftId, categoryId, owner, rentee } = req.body;
    const accessToken = req.accessToken;
    await ItemService.createItem({ accessToken, nftId, categoryId, owner, rentee });

    res.status(201).json({ message: 'Item created successfully' });
  }

  static async addToPool(req, res) {
    const nftId = req.params.nftId;
    const accessToken = req.accessToken;
    await ItemService.addToPool({ accessToken, nftId });

    res.status(201).json({ message: 'Item added to pool successfully' });
  }
}

module.exports = ItemController;
