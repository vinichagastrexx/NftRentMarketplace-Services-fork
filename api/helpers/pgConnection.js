const { Pool } = require('pg');

const pool = new Pool({
  host: 'nft-rent-marketplace.c7cif0nlpkny.us-east-2.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: 'vinichagastrexx',
  database: 'logs',
});

module.exports = pool;
