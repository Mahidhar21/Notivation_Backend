import { query } from '../config/db.js';
import { VISIBILITY } from '../constants/visibility.js';

export const searchNotes = async (searchQuery, userId) => {
  const result = await query(
    `
      SELECT n.id, n.title, n.content, n.author_id, n.visibility, n.created_at,
             ts_rank(
               to_tsvector('english', coalesce(n.title, '') || ' ' || coalesce(n.content, '')),
               plainto_tsquery('english', $1)
             ) AS rank
      FROM notes n
      WHERE
        (
          n.visibility = $2
          OR n.author_id = $3
        )
        AND to_tsvector('english', coalesce(n.title, '') || ' ' || coalesce(n.content, ''))
            @@ plainto_tsquery('english', $1)
      ORDER BY rank DESC, n.created_at DESC
      LIMIT 50
    `,
    [searchQuery, VISIBILITY.PUBLIC, userId || 0]
  );
  return result.rows;
};

