import camelize from 'camelize';
import { Pool as PoolPg } from 'pg';
import pool from '../../../helpers/pgConnection';
import { Pool } from '../../entities/pool';
import { CreatePoolRequest, GetPoolResponse } from './pool.interface';

class PoolModel {
  private pool: PoolPg;
  constructor() {
    this.pool = pool;
  }

  async createPool(poolData: CreatePoolRequest): Promise<Pool> {
    const { categoryId, gameId, basePrice } = poolData;
    const imageUrl = `https://nft-rent-marketplace.s3.us-east-2.amazonaws.com/categories/${categoryId}.png`
    const query = `
    INSERT INTO pools(category_id, game_id, base_price, image_url, is_active)
      SELECT $1, $2, $3, '${imageUrl}', true
      FROM categories
      WHERE id = $1 AND game_id = $2
      RETURNING *;
      `;
    try {
      const result = await this.pool.query(query, [categoryId, gameId, basePrice]);
      return camelize(result.rows[0]);
    } catch (error) {
      console.error('Error creating pool: ', error.stack);
    }
  }

  async getById(id: number): Promise<GetPoolResponse> {
    const query = `
      SELECT pools.*, 
        categories.name AS category_name,
        categories.short_description,
        categories.item_type_id,
        rarities.name AS rarity_name,
        rarities.id AS rarity_id
      FROM pools 
      INNER JOIN categories 
        ON pools.category_id = categories.id
      INNER JOIN rarities
        ON categories.rarity_id = rarities.id
      WHERE pools.category_id = $1;
    `;
    try {
      const result = await this.pool.query(query, [id]);
      return camelize(result.rows[0]);
    } catch (error) {
      console.error('Error getting pool by ID: ', error.stack);
    }
  }

  async getAll(): Promise<GetPoolResponse[]> {
    const query = `
      SELECT pools.*, 
        categories.name AS category_name,
        categories.short_description,
        categories.item_type_id,
        rarities.name AS rarity_name,
        rarities.id AS rarity_id
      FROM pools 
      INNER JOIN categories 
        ON pools.category_id = categories.id
      INNER JOIN rarities
        ON categories.rarity_id = rarities.id;
    `;
    try {
      const result = await this.pool.query(query);
      return camelize(result.rows);
    } catch (error) {
      console.error('Error getting all pools: ', error.stack);
    }
  }
}

export default PoolModel;