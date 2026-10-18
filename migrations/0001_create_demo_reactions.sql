CREATE TABLE IF NOT EXISTS demo_reactions (
  song_id TEXT NOT NULL,
  voter_id TEXT NOT NULL,
  reaction_id TEXT NOT NULL CHECK (reaction_id IN ('love', 'needs-work', 'dislike')),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (song_id, voter_id)
);

CREATE INDEX IF NOT EXISTS idx_demo_reactions_song
  ON demo_reactions (song_id);
