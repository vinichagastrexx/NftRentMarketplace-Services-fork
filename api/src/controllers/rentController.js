const RentService = require('../services/rentService');

class RentController {
  static async startRent(req, res) {
    const { rentId, nftId, poolId, rentee, price, expirationDate, initDate } = req.body;
    const accessToken = req.accessToken;
    await RentService.startRent({ accessToken, rentId, nftId, poolId, rentee, price, expirationDate, initDate });

    res.status(201).json({ message: 'Item added successfully' });
  }

  static async finishRent(req, res) {
    const { nftId, category, id, owner } = req.body;
    const accessToken = req.accessToken;
    await RentService.rentItem({ accessToken, nftId, category, id, owner });

    res.status(201).json({ message: 'Item added successfully' });
  }

  static async getByRentee(req, res) {
    console.log(req.body);
    const accessToken = req.accessToken;
    const rents = await RentService.getByRentee({ accessToken, rentee: req.params.rentee });

    res.status(200).json({ rents });
  }
}
module.exports = RentController;
