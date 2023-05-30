# Chainlink Spring Hackathon 2023

## NFT Rent Marketplace

### Overview

The NFT Rent Marketplace is a unique project that leverages the power of Ethereum's ERC721 standard to create a marketplace where users can rent Non-Fungible Tokens (NFTs). This project showcases how NFTs can be utilized beyond buying and selling, opening up a new realm of possibilities for NFT use-cases.

### How It Works

The NFT Rent Marketplace contract inherits from the ERC721 standard and introduces additional structures and functionalities to support the renting of NFTs.
The project integrates Chainlink's Verifiable Random Function (VRF), Chainlink Functions, and Space & Time (SxT) to bring added value, flexibility, efficiency, and scalability to the system.

## Chainlink Integration

The NFT Rent Marketplace uses Chainlink's Verifiable Random Function (VRF) to ensure fair and transparent selection of items for rent from the pool. This ensures that all items in the pool have an equal chance of being rented.

The project also integrates Chainlink Functions, a decentralized oracle network (DON) that allows smart contracts to securely execute arbitrary functions in off-chain environments. This feature is used to calculate the rent price, providing a flexible and efficient solution for price calculation that can easily scale with the growth of the marketplace.

## Space and Time

Furthermore, the project utilizes Space & Time (SxT) to create a more personalized and dynamic marketplace experience. By combining on-chain and off-chain data, SxT can provide tailored recommendations to users based on their recent rental history. This means that the marketplace can suggest items to users that align with their interests and preferences, enhancing the user experience and potentially increasing rental activity.

In addition, SxT is used to implement dynamic pricing strategies. For instance, the rental price of items can be adjusted during certain hours of the day when rental activity is typically lower. This can incentivize users to rent items during these off-peak hours, effectively balancing the demand and supply in the marketplace.
