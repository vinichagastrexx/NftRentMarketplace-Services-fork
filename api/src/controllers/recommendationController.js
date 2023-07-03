const RecommendationService = require("../services/recommendationService");
const RentService = require("../services/rentService");

class RecommendationController {
  static async checkRecommendations(req, res) {
    const userAddress = req.params.userAddress;
    
    const recommendations = await RecommendationService.getByUser({
      userAddress,
    });
    res.json({ recommendations });
  }
}
module.exports = RecommendationController;
