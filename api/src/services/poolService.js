const SxTApi = require('./sxtApi');

class PoolService {
  static async getAll({ accessToken }) {
    const resourceId = "TREXXGG.POOLS"
    const sqlText = `SELECT * FROM TREXXGG.POOLS INNER JOIN TREXXGG.CATEGORIES ON TREXXGG.POOLS.CATEGORYID = TREXXGG.CATEGORIES.ID;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }
}

module.exports = PoolService;
