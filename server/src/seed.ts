import seedDrinks from "../data/seedDrinks.json" with { type: "json" };
import seedIngredients from "../data/seedIngredients.json" with {
	type: "json",
};
import seedMeasures from "../data/seedMeasures.json" with { type: "json" };

import { db, schema } from "./db/index.ts";

const { drinks, ingredients, measures } = schema;

export async function seed() {
	// Drizzle's bulk insert handles arrays of any size; SQLite's
	// 999-parameter limit applies per statement, so very large
	// bulk sets might need chunking. The current ~570 ingredients +
	// ~600 drinks + ~3000 measures is well under that.
	await db.insert(ingredients).values(seedIngredients.data);
	await db.insert(drinks).values(seedDrinks.data);
	await db.insert(measures).values(seedMeasures.data);
}

await seed();
console.log("seeded");
