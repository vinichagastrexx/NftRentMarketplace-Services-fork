const ItemService = require('../services/itemService');
const RentService = require('../services/rentService');

class RentController {
  constructor() {
    this.rentService = new RentService();
    this.itemService = new ItemService();
  }

  async createRent(req, res) {
    const { rentData } = req.body;
    const requiredFields = ['id', 'initDate', 'expirationDate', 'priceBlockchain', 'ownerAddress', 'renteeAddress', 'poolId', 'itemId'];
    for (const field of requiredFields) {
      if (!rentData[field]) {
        return res.status(400).json({ error: `Field ${field} is required.` });
      }
    }
    try {
      const rent = await this.rentService.createRent(rentData);
      await this.itemService.rentItem(rentData.itemId, rentData.renteeAddress);
      return res.status(201).json(rent);
    } catch (error) {
      console.error('Error creating rent: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getRentById(req, res) {
    const { id } = req.params;
    try {
      const rent = await this.rentService.getRentById(id);
      return res.status(200).json(rent);
    } catch (error) {
      console.error('Error getting rent by ID: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getActiveByOwner(req, res) {
    const { ownerAddress } = req.params;
    try {
      const rents = await this.rentService.getActiveByOwner(ownerAddress);
      return res.status(200).json(rents);
    } catch (error) {
      console.error('Error getting active rents by owner: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getActiveByRentee(req, res) {
    const { renteeAddress } = req.params;
    try {
      const rents = await this.rentService.getActiveByRentee(renteeAddress);
      return res.status(200).json(rents);
    } catch (error) {
      console.error('Error getting active rents by rentee: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async finishRent(req, res) {
    const { id } = req.params;
    try {
      const rent = await this.rentService.finishRent(id);
      const itemId = rent.item_id;
      this.itemService.finishRent(itemId);
      return res.status(200).json(rent);
    } catch (error) {
      console.error('Error finishing rent: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getAllByRentee(req, res) {
    const { renteeAddress } = req.params;
    try {
      const rents = await this.rentService.getAllByRentee(renteeAddress);
      return res.status(200).json(rents);
    } catch (error) {
      console.error('Error getting all rents by rentee: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }
}

module.exports = RentController;
