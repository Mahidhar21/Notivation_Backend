import { query } from '../config/db.js';

export const createEdge = async ({ sourceNoteId, targetNoteId, relationType }) => {
  const result = await query(
    `
      INSERT INTO edges (source_note_id, target_note_id, relation_type)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [sourceNoteId, targetNoteId, relationType]
  );
  return result.rows[0];
};

export const getEdgeById = async (id) => {
  const result = await query('SELECT * FROM edges WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const deleteEdge = async (id) => {
  await query('DELETE FROM edges WHERE id = $1', [id]);
};

export const deleteEdgesForNote = async (noteId) => {
  await query('DELETE FROM edges WHERE source_note_id = $1 OR target_note_id = $1', [noteId]);
};

export const getAllEdgesForUser = async (userId) => {
  const result = await query(
    `
      SELECT e.*
      FROM edges e
      INNER JOIN notes s ON s.id = e.source_note_id
      INNER JOIN notes t ON t.id = e.target_note_id
      WHERE s.author_id = $1 OR t.author_id = $1
    `,
    [userId || 0]
  );
  return result.rows;
};

export const getGraphForUser = async (userId) => {
  const nodesRes = await query(
    `
      SELECT id
      FROM notes
      WHERE visibility = 'public'
         OR author_id = $1
    `,
    [userId || 0]
  );
  const edgesRes = await query(
    `
      SELECT *
      FROM edges
    `,
    []
  );
  return {
    nodes: nodesRes.rows,
    edges: edgesRes.rows
  };
};

