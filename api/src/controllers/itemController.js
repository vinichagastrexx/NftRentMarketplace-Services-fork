class ItemController {
  constructor(itemService) {
    this.itemService = itemService;
  }

  async getItemByNftId(req, res) {
    const { nftId } = req.params;

    if (!nftId) {
      return res.status(400).json({ error: 'NFT ID is required.' });
    }

    try {
      const item = await this.itemService.getItemByNftId(nftId);

      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      console.error('Error getting item by NFT ID: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async createItem(req, res) {
    const itemData = req.body;

    if (!itemData) {
      return res.status(400).json({ error: 'Item data is required.' });
    }

    const requiredFields = ['itemId', 'nftId', 'categoryId', 'owner', 'gameId', 'nftContractAddress', 'rarityId', 'blockchainId'];
    for (const field of requiredFields) {
      if (!itemData[field]) {
        return res.status(400).json({ error: `Field ${field} is required.` });
      }
    }

    try {
      const newItem = await this.itemService.createItem(itemData);
      if (!newItem) {
        return res.status(500).json({ error: 'Failed to create item.' });
      }

      res.json(newItem);
    } catch (error) {
      console.error('Error creating item: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }


  async getByOwner(req, res) {
    const { owner } = req.params;

    if (!owner) {
      return res.status(400).json({ error: 'Owner is required.' });
    }

    try {
      const items = await this.itemService.getByOwner(owner);

      if (!items) {
        return res.status(404).json({ error: 'Items not found.' });
      }

      res.json(items);
    } catch (error) {
      console.error('Error getting items by owner: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getIdleByOwner(req, res) {
    const { owner } = req.params;

    if (!owner) {
      return res.status(400).json({ error: 'Owner is required.' });
    }

    try {
      const items = await this.itemService.getIdleByOwner(owner);

      if (!items) {
        return res.status(404).json({ error: 'Items not found.' });
      }

      res.json(items);
    } catch (error) {
      console.error('Error getting idle items by owner: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async addToPool(req, res) {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required.' });
    }

    try {
      const item = await this.itemService.getItemByNftId(itemId);


      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }

      if (item.is_in_pool) {
        return res.status(400).json({ error: 'Item is already in pool.' });
      }

      const updatedItem = await this.itemService.addToPool(itemId);
      res.json(updatedItem);
    } catch (error) {
      console.error('Error adding item to pool: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getItemsInPoolByUser(req, res) {
    const { owner } = req.params;

    if (!owner) {
      return res.status(400).json({ error: 'Owner address is required.' });
    }

    try {
      const items = await this.itemService.getItemsInPoolByUser(owner);
      res.json(items);
    } catch (error) {
      console.error('Error getting items in pool by user: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getItemsRentedByUser(req, res) {
    const { owner } = req.params;
    if (!owner) {
      return res.status(400).json({ error: 'Owner address is required.' });
    }

    try {
      const items = await this.itemService.getItemsRentedByUser(owner);
      res.json(items);
    } catch (error) {
      console.error('Error getting items rented by user: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

}

module.exports = ItemController;
