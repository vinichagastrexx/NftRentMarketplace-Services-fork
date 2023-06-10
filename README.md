# NFTRentMarketplace

NFTRentMarketplace is a platform that allows users to rent their NFTs to others. The platform is built using a microservices architecture, with each service running in its own Docker container. The services include:

- `nft-rent-marketplace-api`: This is the backend API service that handles all the business logic.
- `nft-rent-marketplace-worker`: This service listens for events on the blockchain and updates the application's database on Space and Time accordingly.
- `nft-rent-marketplace-client`: This is the frontend service that provides the user interface for the platform.


## [Architecture Explained](docs/architecture.md)

The NFTRentMarketplace is a robust and efficient platform for NFT rentals, built with a variety of technologies to ensure a seamless user experience. Here's a brief overview of what we have used to built the system:

- Lambda AWS + Api Gateway
- Elastic Container Service AWS
- AWS S3
- Chainlink Functions + Automations
- Chainlink VRF
- Chainlink DataFeed
- Space and Time


## How to Test

To test the NFTRentMarketplace, follow these steps:

1. Ensure you have Node.js v18 installed. If you're using nvm, you can switch to v18 with the following command:

```bash
nvm use 18
```

2. Navigate to each service's directory and install the necessary dependencies:

```bash
cd ./api
npm install

cd ../client
npm install

cd ../workers
npm install
```

3. Copy the provided `.env.example` files to `.env` in each service's directory.

4. Import the provided private key into your MetaMask wallet.

5. Start the services using Docker Compose:

```bash
docker-compose up
```

6. Navigate to localhost:3000 in your web browser. 

7. From here, you can add your items to a pool.

8. Switch to a different MetaMask account and rent an item from the pool.

Enjoy testing the NFTRentMarketplace!

### Important Notice!

Please be aware that occasionally, the Space and Time API might experience intermittent issues, which could result in the pools not being displayed on the page as expected. If you encounter this situation, a simple page refresh usually resolves the issue. We appreciate your understanding and patience!

## Contract Addresses deployed on Polygon Mumbai

### Chainlink Automations 
```bash
0x56E4f3793A21Bf61D08417A029b3FF2136714Dba
```
Link to Chainlink Automations page https://automation.chain.link/mumbai/72450187399273084920613248152939248918365445738579105491850788328274421171338


### BoomBoogersNFTs 
```bash
0xfeE7b77D45ef6A6d5083E4C3Ae80b9145DD6F975
```

### NFTRentMarketplace 
```bash
0x95b761a342176dE1a54c2C71CA32A518a4e0f871
```