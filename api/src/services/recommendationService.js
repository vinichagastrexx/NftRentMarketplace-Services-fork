const PoolService = require('./poolService');
const RentService = require('./rentService');
const ItemService = require('./itemService');

class RecommendationService {
  static async getByUser({ userAddress, accessToken }) {
    let recommendations = [];
    // check if user is renting some item
    const userIsRentee = await RentService.getActiveByRentee({ accessToken, rentee: userAddress })

    //check if user has some item rented
    const userHasItemRented = await RentService.getActiveByOwner({ accessToken, userAddress })

    //check if user has some item
    const userHasItems = await ItemService.getByOwner({ accessToken, userAddress })

    if (userHasItems.length === 0 && userIsRentee.length === 0) {
      recommendations.push('You do not own any NFTs. Consider renting from a pool to play.')
    }

    if (userHasItems.length > 0 && userHasItemRented.length === 0) {
      recommendations.push('Earn money renting your idle assets')
    }

    //checking if there is only one rent to avoid repeating recommendations
    //just can handle with 2 categories for now
    if (userIsRentee.length === 1) {
      const lastUserRentPool = await PoolService.getById({ accessToken, poolId: userIsRentee[0].POOLID })
      if (lastUserRentPool?.ID === 1) {
        recommendations.push('Rent from pool 2')
      }
      if (lastUserRentPool?.ID === 2) {
        recommendations.push('Rent from pool 1')
      }
    }
    return recommendations;
  }
}

module.exports = RecommendationService;
