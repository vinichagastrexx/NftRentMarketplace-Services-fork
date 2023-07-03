const PoolService = require("../services/poolService");

class PoolController {
  constructor() {
    this.poolService = new PoolService();
  }

  async getAll(_, res) {
    try {
      const pools = await this.poolService.getAll();
      res.status(200).json({ pools });
    } catch (error) {
      console.error('Error getting all pools: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }

  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const pool = await this.poolService.getById(id);
      res.status(200).json({ pool });
    }
    catch (error) {
      console.error('Error getting pool by ID: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async createPool(req, res) {
    const poolData = req.body;
    const requiredFields = ['categoryId', 'basePrice', 'gameId'];
    for (const field of requiredFields) {
      if (!poolData[field]) {
        return res.status(400).json({ error: `Field ${field} is required.` });
      }
    }
    try {
      const pool = await this.poolService.createPool(poolData);
      return res.status(201).json(pool);
    } catch (error) {
      console.error('Error creating pool: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }
}
module.exports = PoolController;
