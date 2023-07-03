FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the 'config' and 'api' directories from your local host to your image filesystem
COPY . .

ARG WALLET_PV_KEY
ARG BLOCKCHAIN_RPC_URL
ARG NFT_RENT_MARKETPLACE_CONTRACT
ARG NFT_RENT_MARKETPLACE_API
ARG PG_USER
ARG PG_PWD
ARG PG_URI
ARG PG_PORT
ARG PG_DATABASE


ENV PG_USER=$PG_USER
ENV PG_PWD=$PG_PWD
ENV PG_URI=$PG_URI
ENV PG_PORT=$PG_PORT
ENV PG_DATABASE=$PG_DATABASE
ENV WALLET_PV_KEY=$WALLET_PV_KEY
ENV BLOCKCHAIN_RPC_URL=$BLOCKCHAIN_RPC_URL
ENV NFT_RENT_MARKETPLACE_CONTRACT=$NFT_RENT_MARKETPLACE_CONTRACT
ENV NFT_RENT_MARKETPLACE_API=$NFT_RENT_MARKETPLACE_API

# Make port 3001 available to the world outside this container
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
