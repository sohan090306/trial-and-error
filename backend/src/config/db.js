import mysql from 'mysql2/promise';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const pool = mysql.createPool(env.mysql);

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function withTransaction(handler) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await handler(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function testDatabase() {
  try {
    await query('SELECT 1 AS ok');
    logger.info('MySQL pool is ready');
  } catch (error) {
    logger.warn(`MySQL unavailable, API will still serve demo fallbacks: ${error.message}`);
  }
}
