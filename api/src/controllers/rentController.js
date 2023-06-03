const RentService = require('../services/rentService');

class RentController {
  static async startRent(req, res) {
    console.log(req.body);
    const { rentId, nftId, poolId, rentee, price, expirationDate, initDate } = req.body;
    const accessToken = req.accessToken;
    await RentService.startRent({ accessToken, rentId, nftId, poolId, rentee, price, expirationDate, initDate });

    res.status(201).json({ message: 'Item added successfully' });
  }

  static async finishRent(req, res) {
    console.log(req.body);
    const { nftId, category, id, owner } = req.body;
    const accessToken = req.accessToken;
    await RentService.rentItem({ accessToken, nftId, category, id, owner });

    res.status(201).json({ message: 'Item added successfully' });
  }
}
module.exports = RentController;
