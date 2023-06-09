const SxTApi = require('./sxtApi');

class PoolService {
  static async getAll({ accessToken }) {
    const resourceId = `${env.sxtSchema}.POOLS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.POOLS INNER JOIN ${env.sxtSchema}.CATEGORIES ON ${env.sxtSchema}.POOLS.CATEGORYID = ${env.sxtSchema}.CATEGORIES.ID;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getById({ accessToken }) {
    const resourceId = `${env.sxtSchema}.POOLS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.POOLS INNER JOIN ${env.sxtSchema}.CATEGORIES ON ${env.sxtSchema}.POOLS.CATEGORYID = ${env.sxtSchema}.CATEGORIES.ID;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response[0];
  }


  static async createPool({ accessToken, poolId, basePrice }) {
    const resourceId = `${env.sxtSchema}.POOLS`
    const sqlText = `INSERT INTO ${env.sxtSchema}.POOLS (categoryId, isActive, basePrice, ImageUrl) VALUES (${poolId}, true, ${basePrice}, 'https://nft-rent-marketplace.s3.us-east-2.amazonaws.com/categories/${poolId}.png');`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });

    return response[0];
  }
}

module.exports = PoolService;
