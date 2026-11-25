// lib/db.ts — one shared connection pool for the whole app
import { Pool } from "pg";

// In dev, Next reloads files on every save. Keeping the pool on globalThis
// stops each reload from opening a new set of connections.
const globalForDb = globalThis as unknown as { pool?: Pool };

export const db =
  globalForDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.pool = db;