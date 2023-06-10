const ItemService = require('./itemService');
const SxTApi = require('./sxtApi');
const env = require('../../config/env')
const { logRent } = require('../../helpers/logRents')
const pool = require('../../helpers/pgConnection')

class RentService {
  static async getRentsLastDay() {
    const query = `
      SELECT COUNT(*)
      FROM rents
      WHERE date > NOW() - INTERVAL '24 HOURS';
    `;

    try {
      const result = await pool.query(query);
      return result.rows[0].count;
    } catch (error) {
      console.error('Error getting rent count for the last 24 hours: ', error.stack);
    }
  }

  static async startRent({ accessToken, rentId, nftId, poolId, rentee, price, expirationDate, initDate, owner }) {
    const resourceId = `${env.sxtSchema}.RENTS`
    const sqlText = `INSERT INTO ${env.sxtSchema}.RENTS (Id, initDate, expirationDate, finishDate, rentPrice, rentee, poolId, nftId, owner) VALUES (${rentId}, '${initDate}', '${expirationDate}', null, ${price}, '${rentee}', ${poolId}, ${nftId}, '${owner}');`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    await ItemService.rentItem({ accessToken, nftId, rentee })
    await logRent(rentId, price, initDate);
    return response;
  }

  static async getRentById({ accessToken, rentId }) {
    const resourceId = `${env.sxtSchema}.RENTS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.RENTS WHERE Id = ${rentId};`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });

    return response[0];
  }

  static async finishRent({ accessToken, rentId, finishDate }) {
    const resourceId = `${env.sxtSchema}.RENTS`
    const sqlText = `UPDATE ${env.sxtSchema}.RENTS SET finishDate = '${finishDate}' WHERE Id = ${rentId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    const rent = await RentService.getRentById({ accessToken, rentId });
    const rentedNftId = rent.NFTID;
    await ItemService.finishRent({ accessToken, nftId: rentedNftId });
    return response;
  }

  static async getActiveByRentee({ accessToken, rentee }) {
    const resourceId = `${env.sxtSchema}.RENTS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.RENTS WHERE ${env.sxtSchema}.RENTS.RENTEE = '${rentee}' AND ${env.sxtSchema}.RENTS.FINISHDATE IS NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getActiveByOwner({ accessToken, owner }) {
    const resourceId = `${env.sxtSchema}.RENTS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.RENTS WHERE ${env.sxtSchema}.RENTS.OWNER = '${owner}' AND ${env.sxtSchema}.RENTS.FINISHDATE IS NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getAllByRentee({ accessToken, rentee }) {
    const resourceId = `${env.sxtSchema}.RENTS`
    const sqlText = `SELECT * FROM ${env.sxtSchema}.RENTS WHERE ${env.sxtSchema}.RENTS.RENTEE = '${rentee}';`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }
}

module.exports = RentService;
