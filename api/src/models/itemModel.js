class ItemModel {
  constructor(pool) {
    this.pool = pool;
  }

  async getItemByNftId(nftId) {
    const query = `
    SELECT * 
    FROM items 
    WHERE nftId = $1;
  `;

    try {
      const result = await this.pool.query(query, [nftId]);
      return result.rows;
    } catch (error) {
      console.error("Error getting item by NFT ID: ", error.stack);
      throw error;
    }
  }

  async createItem({ itemId, nftId, categoryId, owner, gameId, nftContractAddress, rarityId, blockchainId }) {
    const query = `
    INSERT INTO items (id, nft_id, category_id, owner_address, rentee_address, is_in_pool, game_id, nft_contract_address, rarity_id, blockchain_id, is_rented) 
    VALUES ($1, $2, $3, NULL, false, $4, $5, $6, $7, $8, false)
    RETURNING *;
  `;

    try {
      const result = await this.pool.query(query, [itemId, nftId, categoryId, owner, gameId, nftContractAddress, rarityId, blockchainId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating item: ", error.stack);
      throw error;
    }
  }

  getByOwner(owner) {
    const query = `
      SELECT *
      FROM items
      WHERE items.owner_address = $1;
    `;
    try {
      const result = this.pool.query(query, [owner]);
      return result.rows;
    }
    catch (error) {
      console.error("Error getting items by owner: ", error.stack);
      throw error;
    }
  }

  getIdleByOwner(owner) {
    const query = `
      SELECT *
      FROM items
      WHERE items.owner_address = $1 AND items.is_in_pool = false;
    `;
    try {
      const result = this.pool.query(query, [owner]);
      return result.rows;
    }
    catch (error) {
      console.error("Error getting idle items by owner: ", error.stack);
      throw error;
    }
  }

  rentItem(itemId, rentee) {
    const query = `
      UPDATE items
      SET rentee_address = $1, is_rented = true
      WHERE id = $2;
    `;
    try {
      const result = this.pool.query(query, [rentee, itemId]);
      return result.rows;
    }
    catch (error) {
      console.error("Error renting item: ", error.stack);
      throw error;
    }
  }

  finishRent(itemId) {
    const query = `
      UPDATE items
      SET rentee_address = NULL, is_rented = false
      WHERE id = $1;
    `;
    try {
      const result = this.pool.query(query, [itemId]);
      return result.rows;
    }
    catch (error) {
      console.error("Error finishing rent: ", error.stack);
      throw error;
    }
  }

  addToPool(itemId) {
    const query = `
      UPDATE items
      SET is_in_pool = true
      WHERE id = $1;
    `;
    try {
      const result = this.pool.query(query, [itemId]);
      return result.rows;
    }
    catch (error) {
      console.error("Error adding item to pool: ", error.stack);
      throw error;
    }
  }

  getItemsInPoolByUser(owner) {
    const query = `
      SELECT *
      FROM items
      WHERE items.owner_address = $1 AND items.is_in_pool = true;
    `;
    try {
      const result = this.pool.query(query, [owner]);
      return result.rows;
    }
    catch (error) {
      console.error("Error getting items in pool by owner: ", error.stack);
      throw error;
    }
  }

  getItemsRentedByUser(owner) {
    const query = `
      SELECT *
      FROM items
      WHERE items.owner_address = $1 AND items.is_rented = true;
    `;
    try {
      const result = this.pool.query(query, [owner]);
      return result.rows;
    }
    catch (error) {
      console.error("Error getting items rented by owner: ", error.stack);
      throw error;
    }
  }
}

module.exports = ItemModel;