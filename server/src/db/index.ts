import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "./schema.ts";

// Strip the `file:` prefix Prisma used to want — Bun's Database
// expects a plain filesystem path.
const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const path = url.replace(/^file:/, "");

const sqlite = new Database(path);
// Enable WAL — single-writer, multiple-reader; matches what Prisma
// implicitly enabled on first open. Cheap, no downside for our use.
sqlite.run("PRAGMA journal_mode = WAL;");
sqlite.run("PRAGMA foreign_keys = ON;");

export const db = drizzle({ client: sqlite, schema });
export { schema };
