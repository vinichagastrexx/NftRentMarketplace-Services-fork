const SxTApi = require('./sxtApi');

class RentService {
  static async startRent({ accessToken, rentId, nftId, poolId, rentee, price, expirationDate, initDate }) {
    const resourceId = "TREXXGG.RENTS"
    const sqlText = `INSERT INTO TREXXGG.RENTS (Id, initDate,      expirationDate, finishDate, price, rentee, poolId, nftId) VALUES (${rentId}, '${initDate}', '${expirationDate}', null, ${price}, '${rentee}', ${poolId}, ${nftId});`;
    const response = await SxTApi.dml({
      resourceId,
      sqlText,
      accessToken,
    });
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
}

module.exports = RentService;
