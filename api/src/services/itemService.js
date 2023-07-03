class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  async getItemByNftId(nftId) {
    return await this.itemModel.getItemByNftId({ nftId });
  }

  async createItem(itemData) {
    return await this.itemModel.createItem(itemData);
  }

  async getByOwner(owner) {
    return await this.itemModel.getByOwner({ owner });
  }

  async getIdleByOwner(owner) {
    return await this.itemModel.getIdleByOwner({ owner });
  }

  async rentItem(itemId, rentee) {
    return await this.itemModel.rentItem({ itemId, rentee });
  }

  async finishRent(itemId) {
    return await this.itemModel.finishRent({ itemId });
  }

  async addToPool(itemId) {
    return await this.itemModel.addToPool({ itemId });
  }

  async getItemsInPoolByUser(owner) {
    return await this.itemModel.getItemsInPoolByUser({ owner });
  }

  async getItemsRentedByUser(owner) {
    return await this.itemModel.getItemsRentedByUser({ owner });
  }
}

module.exports = ItemService;
