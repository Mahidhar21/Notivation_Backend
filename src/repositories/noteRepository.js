import { query } from '../config/db.js';
import { VISIBILITY } from '../constants/visibility.js';

export const getNotesWithFilters = async ({ userId, offset, limit }) => {
  const result = await query(
    `
      SELECT n.*, COALESCE(json_agg(t.name) FILTER (WHERE t.id IS NOT NULL), '[]') AS tags
      FROM notes n
      LEFT JOIN note_tags nt ON nt.note_id = n.id
      LEFT JOIN tags t ON t.id = nt.tag_id
      WHERE
        (n.visibility = $1)
        OR (n.author_id = $2)
      GROUP BY n.id
      ORDER BY n.created_at DESC
      OFFSET $3 LIMIT $4
    `,
    [VISIBILITY.PUBLIC, userId || 0, offset, limit]
  );
  return result.rows;
};

export const createNote = async ({ title, content, visibility, authorId, forkedFrom = null }) => {
  const result = await query(
    `
      INSERT INTO notes (title, content, author_id, visibility, forked_from)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [title, content, authorId, visibility, forkedFrom]
  );
  return result.rows[0];
};

export const getNoteById = async (id) => {
  const result = await query('SELECT * FROM notes WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const getNoteByIdWithTags = async (id, userId) => {
  const result = await query(
    `
      SELECT n.*, COALESCE(json_agg(t.name) FILTER (WHERE t.id IS NOT NULL), '[]') AS tags
      FROM notes n
      LEFT JOIN note_tags nt ON nt.note_id = n.id
      LEFT JOIN tags t ON t.id = nt.tag_id
      WHERE n.id = $1
      GROUP BY n.id
    `,
    [id]
  );
  return result.rows[0] || null;
};

export const updateNote = async (id, { title, content, visibility }) => {
  const result = await query(
    `
      UPDATE notes
      SET
        title = COALESCE($2, title),
        content = COALESCE($3, content),
        visibility = COALESCE($4, visibility),
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id, title || null, content || null, visibility || null]
  );
  return result.rows[0];
};

export const deleteNote = async (id) => {
  await query('DELETE FROM notes WHERE id = $1', [id]);
};

export const getTagsForNote = async (noteId) => {
  const result = await query(
    `
      SELECT t.*
      FROM tags t
      INNER JOIN note_tags nt ON nt.tag_id = t.id
      WHERE nt.note_id = $1
    `,
    [noteId]
  );
  return result.rows;
};

export const setTagsForNote = async (noteId, tagNames) => {
  await query('DELETE FROM note_tags WHERE note_id = $1', [noteId]);

  if (!tagNames || !tagNames.length) return;

  const insertTagText = `
    INSERT INTO tags (name)
    VALUES ($1)
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `;
  for (const name of tagNames) {
    const tagResult = await query(insertTagText, [name]);
    const tagId = tagResult.rows[0].id;
    await query('INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [
      noteId,
      tagId
    ]);
  }
};

export const getAllVisibleNotes = async (userId) => {
  const result = await query(
    `
      SELECT *
      FROM notes
      WHERE visibility = $1
        OR author_id = $2
    `,
    [VISIBILITY.PUBLIC, userId || 0]
  );
  return result.rows;
};

