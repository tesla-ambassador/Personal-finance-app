CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL UNIQUE,
    maximum_cents INTEGER NOT NULL CHECK (maximum_cents > 0),
    theme TEXT NOT NULL UNIQUE
);