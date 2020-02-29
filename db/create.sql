CREATE TABLE tacos (
  _id serial PRIMARY KEY,
  ingredient VARCHAR(255),
  create_at TIMESTAMP DEFAULT NOW()
);