const ItemService = require('./itemService');
const SxTApi = require('./sxtApi');

class RentService {
  static async startRent({ accessToken, rentId, nftId, poolId, rentee, price, expirationDate, initDate, owner }) {
    const resourceId = "TREXXGG.RENTS"
    const sqlText = `INSERT INTO TREXXGG.RENTS (Id, initDate, expirationDate, finishDate, rentPrice, rentee, poolId, nftId, owner) VALUES (${rentId}, '${initDate}', '${expirationDate}', null, ${price}, '${rentee}', ${poolId}, ${nftId}, '${owner}');`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    await ItemService.rentItem({ accessToken, nftId, rentee })
    return response;
  }
  static async finishRent({ accessToken, rentId, finishDate }) {
    const resourceId = "TREXXGG.RENTS"
    const sqlText = `UPDATE TREXXGG.RENTS SET finishDate = '${finishDate}' WHERE Id = ${rentId};`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getActiveByRentee({ accessToken, rentee }) {
    const resourceId = "TREXXGG.RENTS"
    const sqlText = `SELECT * FROM TREXXGG.RENTS WHERE TREXXGG.RENTS.RENTEE = '${rentee}' AND TREXXGG.RENTS.FINISHDATE IS NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getActiveByOwner({ accessToken, owner }) {
    const resourceId = "TREXXGG.RENTS"
    const sqlText = `SELECT * FROM TREXXGG.RENTS WHERE TREXXGG.RENTS.OWNER = '${owner}' AND TREXXGG.RENTS.FINISHDATE IS NULL;`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async getAllByRentee({ accessToken, rentee }) {
    const resourceId = "TREXXGG.RENTS"
    const sqlText = `SELECT * FROM TREXXGG.RENTS WHERE TREXXGG.RENTS.RENTEE = '${rentee}';`;
    const response = await SxTApi.dql({
      resourceId,
      sqlText,
      accessToken,
    });
    return response;
  }

  static async checkRentPool({ accessToken, rentId }) {

  }
}

module.exports = RentService;
