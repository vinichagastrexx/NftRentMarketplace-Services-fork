const SxTApi = require('./sxtApi');

class ItemService {
  static async getByOwner({ accessToken, owner }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `SELECT * FROM TREXXGG.ITEMS WHERE TREXXGG.ITEMS.OWNER = '${owner}'`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getIdleByOwner({ accessToken, owner }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `SELECT * FROM TREXXGG.ITEMS WHERE TREXXGG.ITEMS.OWNER = '${owner}' AND TREXXGG.ITEMS.ISINPOOL = false`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    console.log(response)
    return response;
  }

  static async createItem({ accessToken, nftId, categoryId, owner }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `INSERT INTO TREXXGG.ITEMS (nftId, categoryId, owner, rentee, isInPool) VALUES (${nftId}, ${categoryId}, '${owner}', NULL, false)`;

    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getItemByNftId({ accessToken, nftId }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `SELECT * FROM TREXXGG.ITEMS WHERE nftId = '${nftId}';`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async rentItem({ accessToken, nftId, rentee }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `UPDATE TREXXGG.ITEMS SET rentee = '${rentee}' WHERE nftId = ${nftId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async addToPool({ accessToken, nftId }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `UPDATE TREXXGG.ITEMS SET isInPool = true WHERE nftId = ${nftId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getItemsInPoolByUser({ accessToken, owner }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `SELECT * FROM TREXXGG.ITEMS WHERE TREXXGG.ITEMS.OWNER = '${owner}' AND ISINPOOL = true AND RENTEE IS NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getItemsRentedByUser({ accessToken, owner }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `SELECT * FROM TREXXGG.ITEMS WHERE TREXXGG.ITEMS.OWNER = '${owner}' AND ISINPOOL = true AND RENTEE IS NOT NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }
}

module.exports = ItemService;
