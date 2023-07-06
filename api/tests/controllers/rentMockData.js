const newRentData = {
  id: 2,
  initDate: '2023-07-01',
  expirationDate: '2023-07-15',
  priceBlockchain: 100,
  ownerAddress: 'owner123',
  renteeAddress: 'rentee123',
  poolId: 1,
  itemId: 123,
}

const rentData = {
  id: 1,
  initDate: '2023-07-01',
  expirationDate: '2023-07-15',
  priceBlockchain: 100,
  ownerAddress: 'owner123',
  renteeAddress: 'rentee123',
  poolId: 1,
  itemId: 123,
}; 

const requiredFields = ['id', 'initDate', 'expirationDate', 'priceBlockchain', 'ownerAddress', 'renteeAddress', 'poolId', 'itemId'];

module.exports = {newRentData, rentData, requiredFields};