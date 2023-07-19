const newPoolData = {
  categoryId: 2,
  basePrice: 100,
  gameId: 1,
}

const resNewPoolData = {
  "categoryId": 4,
  "gameId": 1,
  "isActive": true,
  "basePrice": "100",
  "imageUrl": "https://nft-rent-marketplace.s3.us-east-2.amazonaws.com/categories/4.png"
}

const poolData = {
  "categoryId": 4,
  "gameId": 1,
  "isActive": true,
  "basePrice": "100",
  "imageUrl": "https://nft-rent-marketplace.s3.us-east-2.amazonaws.com/categories/4.png",
  "categoryName": "Character Common",
  "shortDescription": "This is a basic Character, ideal for beginners. Although common, it is reliable and can be a great choice for those learning the ropes.",
  "itemTypeId": 1,
  "rarityName": "Common",
  "rarityId": 3
}

const requiredFields = ['categoryId', 'basePrice', 'gameId'];

module.exports = {newPoolData, resNewPoolData, poolData, requiredFields}