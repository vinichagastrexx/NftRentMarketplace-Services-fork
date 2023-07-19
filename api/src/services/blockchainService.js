class BlockchainService {
  constructor(blockchainModel) {
    this.blockchainModel = blockchainModel;
  }

  async createBlockchain({ name, currency }) {
    return await this.blockchainModel.createBlockchain({ name, currency });
  }

  async getAll() {
    return await this.blockchainModel.getAll();
  }

  async getById(id) {
    return await this.blockchainModel.getById(id);
  }
}

module.exports = BlockchainService;
