CREATE TABLE IF NOT EXISTS edges (
  id SERIAL PRIMARY KEY,
  source_note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  target_note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  relation_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_edges_source_note_id ON edges (source_note_id);
CREATE INDEX IF NOT EXISTS idx_edges_target_note_id ON edges (target_note_id);

