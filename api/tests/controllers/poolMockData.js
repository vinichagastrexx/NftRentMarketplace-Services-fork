const newPoolData = {
  categoryId: 1,
  basePrice: 100,
  gameId: 1,
}

const poolData = {
  id: 1,
  categoryId: 1,
  basePrice: 100,
  gameId: 1,
}

const otherPoolData = {
  id: 2,
  categoryId: 2,
  basePrice: 200,
  gameId: 2,
}

const requiredFields = ['categoryId', 'basePrice', 'gameId'];

module.exports = {newPoolData, poolData, otherPoolData, requiredFields}