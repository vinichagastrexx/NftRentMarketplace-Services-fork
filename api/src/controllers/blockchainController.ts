import { Request, Response } from "express";
import BlockchainService from "../services/blockchainService";

class BlockchainController {
  constructor(private blockchainService: BlockchainService) {
    this.blockchainService = blockchainService;
  }

  async createBlockchain(req: Request, res: Response) {
    const blockchainData = req.body;
    if (!blockchainData) {
      return res.status(400).json({ error: 'Blockchain data is required.' });
    }

    const requiredFields = ['name', 'currency'];
    for (const field of requiredFields) {
      if (!blockchainData[field]) {
        return res.status(400).json({ error: `Field ${field} is required.` });
      }
    }
    try {
      const blockchain = await this.blockchainService.createBlockchain(blockchainData);
      if (!blockchain) {
        return res.status(500).json({ error: 'Failed to create blockchain.' });
      }

      return res.status(201).json(blockchain);
    } catch (error) {
      console.error('Error creating blockchain: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Id is required.' });
    }

    try {
      const blockchain = await this.blockchainService.getById(id);
      if (!blockchain) {
        return res.status(404).json({ error: 'Blockchain not found.' });
      }

      return res.status(200).json(blockchain);
    } catch (error) {
      console.error('Error getting blockchain by ID: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const blockchains = await this.blockchainService.getAll();

      if (!blockchains) {
        return res.status(404).json({ error: 'Blockchains not found.' });
      }
      return res.status(200).json(blockchains);
    } catch (error) {
      console.error('Error getting all blockchains: ', error.stack);
      res.status(500).json({ error: 'Server error.' });
    }
  }
}
export default BlockchainController;
