const pool = require('../../helpers/pgConnection');
const camelize = require('camelize');

class BlockchainModel {
  constructor() {
    this.pool = pool;
  }

  async createBlockchain({ name, currency }) {
    const query = `
      INSERT INTO blockchains(name, currency)
      VALUES ($1, $2)
      RETURNING *;
    `;

    try {
      const { rows } = await this.pool.query(query, [name, currency]);
      return camelize(rows[0]);
    } catch (error) {
      console.error('Error creating blockchain: ', error.stack);
    }
  }

  async getAll() {
    const query = `
      SELECT *
      FROM blockchains;
    `;

    try {
      const { rows } = await this.pool.query(query);
      return camelize(rows);
    } catch (error) {
      console.error('Error getting all blockchains: ', error.stack);
    }
  }

  async getById(id) {
    const query = `
      SELECT *
      FROM blockchains
      WHERE blockchains.id = $1;
    `;

    try {
      const { rows } = await this.pool.query(query, [id]);
      return camelize(rows[0]);
    } catch (error) {
      console.error('Error getting blockchain by ID: ', error.stack);
    }
  }
}

module.exports = BlockchainModel;