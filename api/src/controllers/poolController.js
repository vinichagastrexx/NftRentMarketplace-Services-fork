const PoolService = require('../services/poolService')

class PoolController {
  static async getAll(req, res) {
    const accessToken = req.accessToken;
    const pools = await PoolService.getAll({ accessToken });

    res.status(200).json({ pools });
  }
}
module.exports = PoolController;
