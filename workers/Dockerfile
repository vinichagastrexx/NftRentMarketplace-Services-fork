FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Run app.js when the container launches
CMD ["node", "app.js"]