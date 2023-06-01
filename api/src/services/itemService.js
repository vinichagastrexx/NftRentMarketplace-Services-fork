const SxTApi = require('./sxtApi');

class ItemService {
  static async addItem({ id, accessToken, nftId, category, owner }) {
    const resourceId = "TREXXGG.ITEMS"
    const sqlText = `INSERT INTO TREXXGG.ITEMS (Id, nftId, categoryId, isRented, owner, rentee, isInPool) VALUES (${id}, ${nftId}, ${category}, false, '${owner}', '0', false);`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }
}

module.exports = ItemService;
