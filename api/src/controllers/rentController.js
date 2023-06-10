const RentService = require('../services/rentService');
const ItemService = require('../services/itemService');

class RentController {
  static async startRent(req, res) {
    const { rentId, nftId, poolId, rentee, price, expirationDate, initDate, owner } = req.body;
    const accessToken = req.accessToken;
    await RentService.startRent({ accessToken, rentId, nftId, poolId, rentee, price, expirationDate, initDate, owner });
    res.status(201).json({ message: 'Rent started successfully' });
  }

  static async finishRent(req, res) {
    const { rentId, finishDate } = req.body;
    const accessToken = req.accessToken;
    await RentService.finishRent({ accessToken, rentId, finishDate });

    res.status(201).json({ message: 'Rent finished successfully' });
  }

  static async getActiveByRentee(req, res) {
    const accessToken = req.accessToken;
    const rents = await RentService.getActiveByRentee({ accessToken, rentee: req.params.rentee });

    res.status(200).json({ rents });
  }

  static async getAllByRentee(req, res) {
    const accessToken = req.accessToken;
    const rents = await RentService.getAllByRentee({ accessToken, rentee: req.params.rentee });

    res.status(200).json({ rents });
  }

  static async getRentsLastDay(_, res) {
    const lastDayRents = await RentService.getRentsLastDay();

    res.status(200).json({ lastDayRents });
  }
}
module.exports = RentController;
