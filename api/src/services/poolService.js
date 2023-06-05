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

  static async getById({ accessToken }) {
    const resourceId = "TREXXGG.POOLS"
    const sqlText = `SELECT * FROM TREXXGG.POOLS INNER JOIN TREXXGG.CATEGORIES ON TREXXGG.POOLS.CATEGORYID = TREXXGG.CATEGORIES.ID;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response[0];
  }


  static async createPool({ accessToken, poolId, basePrice }) {
    const resourceId = "TREXXGG.POOLS"
    const sqlText = `INSERT INTO TREXXGG.POOLS (categoryId, isActive, basePrice, ImageUrl) VALUES (${poolId}, true, ${basePrice}, 'https://nft-rent-marketplace.s3.us-east-2.amazonaws.com/categories/${poolId}.png');`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });

    return response[0];
  }
}

module.exports = PoolService;
