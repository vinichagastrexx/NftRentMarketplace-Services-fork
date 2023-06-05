const RecommendationService = require('../services/recommendationService');
const RentService = require('../services/rentService');

class RecommendationController {
  static async checkRecommendations(req, res) {
    const userAddress = req.params.userAddress;
    const accessToken = req.accessToken;
    const recommendations = await RecommendationService.getByUser({ accessToken, userAddress })
    res.json({ recommendations });
  }
}
module.exports = RecommendationController;
