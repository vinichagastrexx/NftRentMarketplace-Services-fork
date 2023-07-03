const RentService = require("./rentService");
const ItemService = require("./itemService");

const recommendations = {
  rentItem: {
    type: 1,
    text: "You don't own any game items yet. Why not rent one from a pool and start playing?",
    callToAction: "Explore Pools",
  },
  rentFromAnotherPool: (poolRented, poolToRent) => ({
    type: 2,
    text: `Recently rented from ${poolRented}? Consider exploring ${poolToRent} too!`,
    callToAction: "Discover More Pools",
  }),
  earnMoney: {
    type: 3,
    text: "Did you know you can earn money by renting out your idle game assets? Give it a try!",
    callToAction: "Visit Your Inventory",
  },
};

class RecommendationService {
  static async getByUser({ userAddress }) {
    let userRecommendations = [];
    // check if user is renting some item
    const userIsRentee = await RentService.getActiveByRentee({
      rentee: userAddress,
    });

    //check if user has some item rented
    const userHasItemRented = await RentService.getActiveByOwner({
      userAddress,
    });

    //check if user has some item
    const userHasIdleItems = await ItemService.getIdleByOwner({
      owner: userAddress,
    });

    if (userHasIdleItems.length === 0 && userIsRentee.length === 0) {
      userRecommendations.push(recommendations.rentItem);
    }

    if (userHasIdleItems.length > 0 && userHasItemRented.length === 0) {
      userRecommendations.push(recommendations.earnMoney);
    }

    //checking if there is only one rent to avoid repeating recommendations
    //just can handle with 2 categories for now
    if (userIsRentee.length >= 1) {
      if (userIsRentee?.[userIsRentee.length - 1].POOLID === 1) {
        userRecommendations.push(
          recommendations.rentFromAnotherPool(
            "Common Weapon Pool",
            "Common Shield Pool"
          )
        );
      }
      if (userIsRentee?.[userIsRentee.length - 1].POOLID === 3) {
        userRecommendations.push(
          recommendations.rentFromAnotherPool(
            "Common Shield Pool",
            "Common Weapon Pool"
          )
        );
      }
    }
    return userRecommendations;
  }
}

module.exports = RecommendationService;
