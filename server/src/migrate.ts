import { Database } from "bun:sqlite";

// Idempotent schema migration. Personal-project scope: schema is
// frozen, so we ship the CREATE TABLE statements verbatim and rely
// on `IF NOT EXISTS` for re-run safety. If the schema ever does
// need to change, edit the SQL here + add an ALTER block guarded
// by a feature check.
//
// Mirrors the original Prisma `20240920151910_init` migration; the
// live DB on workstation already has these tables, so this is a
// no-op on existing deploys and a clean bootstrap on fresh ones.

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const path = url.replace(/^file:/, "");

const sqlite = new Database(path);
sqlite.run("PRAGMA journal_mode = WAL;");
sqlite.run("PRAGMA foreign_keys = ON;");

sqlite.run(`
  CREATE TABLE IF NOT EXISTS "Drink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "alcoholic" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "glass" TEXT NOT NULL
  );
`);

sqlite.run(`
  CREATE TABLE IF NOT EXISTS "Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
  );
`);

sqlite.run(`
  CREATE TABLE IF NOT EXISTS "Measure" (
    "drinkId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    PRIMARY KEY ("drinkId", "ingredientId"),
    FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );
`);

sqlite.run(`
  CREATE TABLE IF NOT EXISTS "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "drinkId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "textContent" TEXT NOT NULL,
    FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );
`);

sqlite.close();
console.log(`migrated ${path}`);
