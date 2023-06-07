const PoolService = require('./poolService');
const RentService = require('./rentService');
const ItemService = require('./itemService');

const recommendations = {
  rentItem: {
    type: 1,
    text: "You don't own any game items yet. Why not rent one from a pool and start playing?",
    callToAction: "Explore Pools",
  },
  rentFromAnotherPool: {
    type: 2,
    text: `You've recently rented from Pool {poolId}. Have you considered checking out other pools too?`,
    callToAction: "Discover More Pools",
  },
  earnMoney: {
    type: 3,
    text: "Did you know you can earn money by renting out your idle game assets? Give it a try!",
    callToAction: "Visit Your Inventory",
  }
}


class RecommendationService {
  static async getByUser({ userAddress, accessToken }) {
    let userRecommendations = [];
    // check if user is renting some item
    const userIsRentee = await RentService.getActiveByRentee({ accessToken, rentee: userAddress })

    //check if user has some item rented
    const userHasItemRented = await RentService.getActiveByOwner({ accessToken, userAddress })

    //check if user has some item
    const userHasItems = await ItemService.getByOwner({ accessToken, userAddress })

    if (userHasItems.length === 0 && userIsRentee.length === 0) {
      userRecommendations.push(recommendations.rentItem)
    }

    if (userHasItems.length > 0 && userHasItemRented.length === 0) {
      userRecommendations.push(recommendations.earnMoney)
    }

    //checking if there is only one rent to avoid repeating recommendations
    //just can handle with 2 categories for now
    if (userIsRentee.length === 1) {
      const lastUserRentPool = await PoolService.getById({ accessToken, poolId: userIsRentee[0].POOLID })
      if (lastUserRentPool?.ID === 1) {
        userRecommendations.push(recommendations.rentFromAnotherPool)
      }
      if (lastUserRentPool?.ID === 2) {
        userRecommendations.push(recommendations.rentFromAnotherPool)
      }
    }
    return userRecommendations;
  }
}

module.exports = RecommendationService;
