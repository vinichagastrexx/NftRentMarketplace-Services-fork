const SxTApi = require('./sxtApi');

class ItemService {
  static async getByOwner({ accessToken, userAddress }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `SELECT * FROM TREXXGG.ITEMS WHERE TREXXGG.ITEMS.OWNER = ${userAddress}`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async createItem({ accessToken, nftId, categoryId, owner, rentee }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `INSERT INTO TREXXGG.ITEMS (nftId, categoryId, owner, rentee, isInPool) VALUES (${nftId}, ${categoryId}, '${owner}', '${rentee}', false)`;

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
    const sqlText = `UPDATE TREXXGG.ITEMS SET isRented = true, rentee = '${rentee}' WHERE nftId = ${nftId};`;
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
}

module.exports = ItemService;
