const SxTApi = require('./sxtApi');
const env = require('../../config/env')

class ItemService {
  static async getByOwner({ accessToken, owner }) {
    const resourceId = `${env.sxtSchema}`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.ITEMS WHERE ${env.sxtSchema}.ITEMS.OWNER = '${owner}'`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getIdleByOwner({ accessToken, owner }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.ITEMS WHERE ${env.sxtSchema}.ITEMS.OWNER = '${owner}' AND ${env.sxtSchema}.ITEMS.ISINPOOL = false`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async createItem({ accessToken, nftId, categoryId, owner }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `INSERT INTO ${env.sxtSchema}.ITEMS (nftId, categoryId, owner, rentee, isInPool) VALUES (${nftId}, ${categoryId}, '${owner}', NULL, false)`;

    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getItemByNftId({ accessToken, nftId }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.ITEMS WHERE nftId = '${nftId}';`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async rentItem({ accessToken, nftId, rentee }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `UPDATE ${env.sxtSchema}.ITEMS SET rentee = '${rentee}' WHERE nftId = ${nftId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async finishRent({ accessToken, nftId }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `UPDATE ${env.sxtSchema}.ITEMS SET rentee = NULL WHERE nftId = ${nftId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async addToPool({ accessToken, nftId }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `UPDATE ${env.sxtSchema}.ITEMS SET isInPool = true WHERE nftId = ${nftId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getItemsInPoolByUser({ accessToken, owner }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.ITEMS WHERE ${env.sxtSchema}.ITEMS.OWNER = '${owner}' AND ISINPOOL = true AND RENTEE IS NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getItemsRentedByUser({ accessToken, owner }) {
    const resourceId = `${env.sxtSchema}.ITEMS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.ITEMS WHERE ${env.sxtSchema}.ITEMS.OWNER = '${owner}' AND ISINPOOL = true AND RENTEE IS NOT NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }
}

module.exports = ItemService;
