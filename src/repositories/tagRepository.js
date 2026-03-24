import { query } from '../config/db.js';

export const getAllTags = async () => {
  const result = await query('SELECT * FROM tags ORDER BY name ASC', []);
  return result.rows;
};

export const createTag = async ({ name }) => {
  const result = await query(
    `
      INSERT INTO tags (name)
      VALUES ($1)
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
      RETURNING *
    `,
    [name]
  );
  return result.rows[0];
};

export const findByName = async (name) => {
  const result = await query('SELECT * FROM tags WHERE name = $1', [name]);
  return result.rows[0] || null;
};

