const ItemService = require('../services/itemService');

class ItemController {
  static async addItem(req, res) {
    const { nftId, category, id, owner } = req.body;
    const accessToken = req.accessToken;
    await ItemService.addItem({ accessToken, nftId, category, id, owner });

    res.status(201).json({ message: 'Item added successfully' });
  }
}
module.exports = ItemController;
