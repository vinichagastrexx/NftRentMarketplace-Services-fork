## Architecture

The NFTRentMarketplace is a robust and efficient platform for NFT rentals, built with a variety of technologies to ensure a seamless user experience. Here's a brief overview of what we have used to build the system:

### Lambda AWS + API Gateway
Our API is built with AWS Lambda, a serverless computing service that allows us to run our code without provisioning or managing servers. This provides us with benefits such as automatic scaling, high availability, and a pay-per-use pricing model. The API Gateway acts as a front door for our API, handling all the tasks involved in accepting and processing concurrent API calls.

### Elastic Container Service (ECS) AWS
Our event worker is a container that listens to blockchain events and updates the database accordingly. We use AWS Elastic Container Service (ECS) to manage these containers, providing us with benefits such as high scalability, high performance, and deep AWS integration.

### AWS S3
We use AWS S3 to store off-chain assets, currently the images of the pools. S3 provides us with benefits such as high durability, high availability, and scalability.

### Chainlink Functions + Automations
We use Chainlink Functions and Automations to update the market price index, which adjusts prices based on transaction volume. This ensures that prices decrease in times of low transaction volume and increase in times of high transaction volume, with an initial reference point of 100.

### Chainlink VRF
We use Chainlink VRF (Verifiable Random Function) to ensure randomness in the selection of items from the pool. This provides a fair and transparent method of item selection.

### Chainlink DataFeed
We use Chainlink DataFeed to provide accurate and up-to-date price quotations in MATIC and USD.

### Space and Time
Our database, Space and Time, is populated from blockchain events and combines on-chain and off-chain data. This provides a comprehensive view of the marketplace and allows for efficient data management.