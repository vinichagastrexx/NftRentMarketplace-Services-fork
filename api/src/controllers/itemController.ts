import ItemService from '../services/itemService';
import { Request, Response } from 'express';

class ItemController {
  constructor(private itemService: ItemService) {
    this.itemService = itemService;
  }

  async getItemByNftId(req: Request, res: Response) {
    const { nftId, nftContractAddress } = req.params;
    if (!nftId || !nftContractAddress) {
      return res.status(400).json({ error: 'NFT ID and NFT Contract Address are required.' });
    }

    try {
      const item = await this.itemService.getItemByNftId({ nftId, nftContractAddress });
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }

      res.status(200).json(item);
    } catch (error) {
      console.error('Error getting item by NFT ID: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async createItem(req: Request, res: Response) {
    const itemData = req.body;
    if (!itemData) {
      return res.status(400).json({ error: 'Item data is required.' });
    }

    const requiredFields = ['id', 'categoryId', 'ownerAddress', 'gameId', 'nftContractAddress', 'nftId', 'rarityId', 'blockchainId'];
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

      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error creating item: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getByOwner(req: Request, res: Response) {
    const { ownerAddress } = req.params;
    if (!ownerAddress) {
      return res.status(400).json({ error: 'Owner address is required.' });
    }

    try {
      const items = await this.itemService.getByOwner(ownerAddress);
      if (!items) {
        return res.status(404).json({ error: 'Items not found.' });
      }

      res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items by owner: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async addToPool(req: Request, res: Response) {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required.' });
    }

    try {
      const item = await this.itemService.getById(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }

      if (item.isInPool) {
        return res.status(400).json({ error: 'Item is already in pool.' });
      }

      const updatedItem = await this.itemService.addToPool(itemId);

      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Error adding item to pool: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getItemsInPoolByUser(req: Request, res: Response) {
    const { ownerAddress } = req.params;
    if (!ownerAddress) {
      return res.status(400).json({ error: 'Owner address is required.' });
    }

    try {
      const items = await this.itemService.getItemsInPoolByUser(ownerAddress);
      if (!items) {
        return res.status(404).json({ error: 'Items in pool by user not found.' });
      }

      res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items in pool by user: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getItemsRentedByUser(req: Request, res: Response) {
    const { ownerAddress } = req.params;
    if (!ownerAddress) {
      return res.status(400).json({ error: 'Owner address is required.' });
    }

    try {
      const items = await this.itemService.getItemsRentedByUser(ownerAddress);
      if (!items) {
        return res.status(404).json({ error: 'Items rented by user not found.' });
      }

      res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items rented by user: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Item id is required.' });
    }

    try {
      const item = await this.itemService.getById(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Error getting item by id: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }
}

export default ItemController;
