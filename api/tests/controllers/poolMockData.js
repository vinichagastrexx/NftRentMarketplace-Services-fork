const newPoolData = {
  categoryId: 2,
  basePrice: 100,
  gameId: 1,
}

const poolData = {
  categoryId: 1,
  basePrice: 100,
  gameId: 1,
}

const otherPoolData = {
  categoryId: 2,
  basePrice: 200,
  gameId: 2,
}

const requiredFields = ['categoryId', 'basePrice', 'gameId'];

module.exports = {newPoolData, poolData, otherPoolData, requiredFields}