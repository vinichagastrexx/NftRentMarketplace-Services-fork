const newRentData = {
  id: 1,
  initDate: '2023-07-01',
  expirationDate: '2023-07-15',
  priceBlockchain: 100,
  ownerAddress: "0x64B6D0Df31a5435fca0F00cf210E909b2d91c603",
  renteeAddress: "Bia456",
  categoryId: 1,
  itemId: 124
}

const rentData = {
  id: 1,
  initDate: '2023-07-01',
  expirationDate: '2023-07-15',
  finishDate: "",
  priceBlockchain: 100,
  ownerAddress: 'owner123',
  renteeAddress: 'rentee123',
  categoryId: 1,
  itemId: 123,
  rentStatusId: 1,
}; 

const resFinishedRentData = {
  id: 1,
  initDate: '2023-07-01',
  expirationDate: '2023-07-15',
  finishDate: '2023-07-07',
  priceBlockchain: 100,
  ownerAddress: 'owner123',
  renteeAddress: 'rentee123',
  categoryId: 1,
  itemId: 123,
  rentStatusId: 0,
}; 


const finishedRentData = {
  id: 2,
  finishDate: '2023-07-07',
  itemId: 123
}

const requiredFieldsFinishRent = ['id', 'finishDate', 'itemId']

const requiredFields = ['id', 'initDate', 'expirationDate', 'priceBlockchain', 'ownerAddress', 'renteeAddress', 'categoryId', 'itemId'];

module.exports = { newRentData, rentData, requiredFields, finishedRentData, resFinishedRentData, requiredFieldsFinishRent };