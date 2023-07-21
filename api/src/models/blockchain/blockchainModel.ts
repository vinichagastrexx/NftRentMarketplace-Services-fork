import { Pool } from "pg";
import { Blockchain } from "../../entities/blockchain";
import { CreateBlockchainRequest } from "./blockchain.interface";
import pool from '../../../helpers/pgConnection';
import camelize from 'camelize';

class BlockchainModel {
  private pool: Pool;
  constructor() {
    this.pool = pool;
  }

  async createBlockchain(blockchainData: CreateBlockchainRequest): Promise<Blockchain> {
    const { name, currency } = blockchainData;
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

  async getAll(): Promise<Blockchain[]> {
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

  async getById(id: number): Promise<Blockchain> {
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

export default BlockchainModel;