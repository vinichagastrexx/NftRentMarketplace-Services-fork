const PoolService = require('../services/poolService')

class PoolController {
  static async getAll(req, res) {
    const accessToken = req.accessToken;
    const pools = await PoolService.getAll({ accessToken });

    res.status(200).json({ pools });
  }

  static async getById(req, res) {
    const accessToken = req.accessToken;
    const pool = await PoolService.getById({ accessToken, id: req.params.poolId });

    res.status(200).json({ pool });
  }
}
module.exports = PoolController;
