INSERT INTO users (username, email, password_hash)
VALUES
  ('alice', 'alice@example.com', '$2b$10$abcdefghijklmnopqrstuv'),
  ('bob', 'bob@example.com', '$2b$10$abcdefghijklmnopqrstuv')
ON CONFLICT (email) DO NOTHING;

INSERT INTO notes (title, content, author_id, visibility)
VALUES
  ('Graph Theory', 'Introduction to graph theory basics.', 1, 'public'),
  ('BFS', 'Breadth-first search explanation.', 1, 'public'),
  ('DFS', 'Depth-first search explanation.', 1, 'public'),
  ('Topological Sort', 'Topological sorting in DAGs.', 1, 'public')
ON CONFLICT DO NOTHING;

INSERT INTO edges (source_note_id, target_note_id, relation_type)
VALUES
  (1, 2, 'subtopic'),
  (1, 3, 'subtopic'),
  (1, 4, 'subtopic')
ON CONFLICT DO NOTHING;

INSERT INTO tags (name)
VALUES
  ('graph-theory'),
  ('algorithms'),
  ('bfs'),
  ('dfs')
ON CONFLICT (name) DO NOTHING;

