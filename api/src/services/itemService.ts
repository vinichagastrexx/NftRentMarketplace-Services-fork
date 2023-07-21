import { Item } from "../entities/item";
import { CreateItemRequest, GetItemByNftIdRequest, RentItemRequest } from '../models/item/item.interface';
import ItemModel from '../models/item/itemModel';

class ItemService {
  constructor(private itemModel: ItemModel) {
    this.itemModel = itemModel;
  }

  async getItemByNftId(nftData: GetItemByNftIdRequest): Promise<Item> {
    return await this.itemModel.getItemByNftId(nftData);
  }

  async getById(itemId: string): Promise<Item> {
    const itemIdNum = Number(itemId);
    return await this.itemModel.getById(itemIdNum);
  }

  async createItem(itemData: CreateItemRequest): Promise<Item> {
    return await this.itemModel.createItem(itemData);
  }

  async getByOwner(ownerAddress: string): Promise<Item[]> {
    return await this.itemModel.getByOwner(ownerAddress);
  }

  async rentItem(rentItemData: RentItemRequest): Promise<Item> {
    return await this.itemModel.rentItem(rentItemData);
  }

  async finishRent(itemId: number): Promise<Item> {
    return await this.itemModel.finishRent(itemId);
  }

  async addToPool(itemId: string): Promise<Item> {
    const itemIdNum = Number(itemId);
    return await this.itemModel.addToPool(itemIdNum);
  }

  async getItemsInPoolByUser(ownerAddress: string): Promise<Item[]> {
    return await this.itemModel.getItemsInPoolByUser(ownerAddress);
  }

  async getItemsRentedByUser(ownerAddress: string): Promise<Item[]> {
    return await this.itemModel.getItemsRentedByUser(ownerAddress);
  }
}

export default ItemService;
