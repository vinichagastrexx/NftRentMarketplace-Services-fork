const { Pool } = require('pg');

const pool = new Pool({
  host: 'nft-rent-marketplace.c7cif0nlpkny.us-east-2.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: 'vinichagastrexx',
  database: 'logs',
});

async function logRent(rentId, price, date) {
  const query = `
    INSERT INTO rents (rentId, price, date)
    VALUES ($1, $2, $3);
  `;

  try {
    await pool.query(query, [rentId, price, date]);
    console.log(`Rent with ID ${rentId} logged successfully.`);
  } catch (error) {
    console.error(`Error logging rent with ID ${rentId}: `, error.stack);
  }
}

module.exports = {
  logRent,
};
