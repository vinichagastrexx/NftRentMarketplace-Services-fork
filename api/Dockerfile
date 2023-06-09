FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./
COPY .env ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the 'config' and 'api' directories from your local host to your image filesystem
COPY ./config ./config
COPY ./api ./api

# Make port 3001 available to the world outside this container
EXPOSE 3001

ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV PATH=$PATH:/app/.npm-global/bin
RUN npm config set cache /app/.npm-cache --global

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
