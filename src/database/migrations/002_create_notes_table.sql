CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  visibility VARCHAR(20) NOT NULL DEFAULT 'private',
  forked_from INTEGER REFERENCES notes(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_author_id ON notes (author_id);
CREATE INDEX IF NOT EXISTS idx_notes_visibility ON notes (visibility);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes (created_at);

