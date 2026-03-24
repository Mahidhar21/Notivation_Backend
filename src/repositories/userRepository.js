import { query } from '../config/db.js';

export const createUser = async ({ username, email, passwordHash }) => {
  const result = await query(
    `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `,
    [username, email, passwordHash]
  );
  return result.rows[0];
};

export const findByEmail = async (email) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const findById = async (id) => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

