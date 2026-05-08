/**
 * Generate seed.sql from the static seed JSON files.
 *
 * Workers + D1 model: this script runs locally via `bun run
 * src/seed.ts` and emits seed.sql with INSERT OR REPLACE
 * statements. Operator applies it with:
 *
 *   wrangler d1 execute drinks-db --remote --file=seed.sql
 *
 * The live drinks-db inherited the same data from the original
 * 2024 deploy, so this is normally a no-op. Use it after a
 * deliberate wipe (`DROP TABLE` + apply migrations) or for a
 * fresh-install run.
 */

import { writeFileSync } from "node:fs";

import seedDrinks from "../data/seedDrinks.json" with { type: "json" };
import seedIngredients from "../data/seedIngredients.json" with {
	type: "json",
};
import seedMeasures from "../data/seedMeasures.json" with { type: "json" };

function sql(s: string): string {
	return `'${s.replace(/'/g, "''")}'`;
}

const lines: string[] = [
	"-- drinks seed — generated from server/data/seed*.json by",
	"-- src/seed.ts. INSERT OR REPLACE keeps re-runs idempotent.",
	"",
	"-- Disable foreign key checks during bulk insert; FKs across",
	"-- the three tables are tangled, ordering can't satisfy them",
	"-- statement-by-statement.",
	"PRAGMA foreign_keys = OFF;",
	"",
];

interface Ingredient {
	id: number;
	name: string;
}
for (const row of seedIngredients.data as Ingredient[]) {
	lines.push(
		`INSERT OR REPLACE INTO "Ingredient" ("id", "name") VALUES (${row.id}, ${sql(row.name)});`,
	);
}
lines.push("");

interface Drink {
	id: number;
	name: string;
	instructions: string;
	alcoholic: boolean;
	imageUrl: string;
	glass: string;
}
for (const row of seedDrinks.data as Drink[]) {
	lines.push(
		`INSERT OR REPLACE INTO "Drink" ("id", "name", "instructions", "alcoholic", "imageUrl", "glass") VALUES (${row.id}, ${sql(row.name)}, ${sql(row.instructions)}, ${row.alcoholic ? 1 : 0}, ${sql(row.imageUrl)}, ${sql(row.glass)});`,
	);
}
lines.push("");

interface Measure {
	drinkId: number;
	ingredientId: number;
	measure: string;
}
for (const row of seedMeasures.data as Measure[]) {
	lines.push(
		`INSERT OR REPLACE INTO "Measure" ("drinkId", "ingredientId", "measure") VALUES (${row.drinkId}, ${row.ingredientId}, ${sql(row.measure)});`,
	);
}
lines.push("");
lines.push("PRAGMA foreign_keys = ON;");

writeFileSync("seed.sql", lines.join("\n") + "\n");
console.log(
	`[seed] wrote seed.sql — ${seedIngredients.data.length} ingredients, ${seedDrinks.data.length} drinks, ${seedMeasures.data.length} measures`,
);
console.log(
	"[seed] apply with: wrangler d1 execute drinks-db --remote --file=seed.sql",
);
