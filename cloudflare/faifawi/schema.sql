CREATE TABLE IF NOT EXISTS votes (
  category TEXT NOT NULL CHECK (category IN ('hotels','parks','cafes')),
  voter_id TEXT NOT NULL,
  place_id TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (category, voter_id)
);
CREATE INDEX IF NOT EXISTS votes_by_place ON votes(category, place_id);
