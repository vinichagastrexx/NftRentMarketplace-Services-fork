const mockNewItem = { 
  id: 123, 
  nftId: 456, 
  categoryId: 123, 
  ownerAddress: 'Ana123',
  gameId: 123, 
  nftContractAddress: 'qwe', 
  rarityId: 123, 
  blockchainId: 123,
};

const resMockNewItem = { 
  id: 456, 
  nftId: 123, 
  categoryId: 123, 
  ownerAddress: 'Ana123',
  renteeAdress: null,
  isInPool: false, 
  gameId: 123, 
  nftContractAddress: 'asd', 
  rarityId: 123, 
  blockchainId: 456,
  isRented: false,
};

const mockItemIsRented = { 
  id: 456, 
  nftId: 123, 
  categoryId: 123, 
  ownerAddress: 'Ana123',
  renteeAdress: 'Bia456',
  isInPool: true, 
  gameId: 123, 
  nftContractAddress: 'asd', 
  rarityId: 123, 
  blockchainId: 456,
  isRented: true,
};

const mockItemIsInPool = { 
  id: 123, 
  nftId: 456, 
  categoryId: 123, 
  ownerAddress: 'Ana123',
  renteeAdress: 'Bia456',
  isInPool: true, 
  gameId: 123, 
  nftContractAddress: 'qwe', 
  rarityId: 123, 
  blockchainId: 123,
  isRented: false,
};

const requiredFields = ['id', 'categoryId', 'ownerAddress', 'gameId', 'nftContractAddress', 'nftId', 'rarityId', 'blockchainId'];


module.exports = { mockNewItem, resMockNewItem, requiredFields, mockItemIsInPool, mockItemIsRented }