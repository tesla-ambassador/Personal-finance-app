CREATE TABLE pots (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    target_cents INTEGER NOT NULL CHECK (target_cents > 0),
    total_cents INTEGER NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
    theme TEXT NOT NULL UNIQUE
);

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL UNIQUE,
    maximum_cents INTEGER NOT NULL CHECK (maximum_cents > 0),
    theme TEXT NOT NULL UNIQUE
);