import { sql } from "drizzle-orm";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

// Schema preserves the existing production D1 table and column names from the
// original Prisma migration. The Alchemy baseline migration creates the same
// shape for fresh local D1 instances without replacing production data.

export const drinks = sqliteTable("Drink", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	instructions: text("instructions").notNull(),
	alcoholic: integer("alcoholic", { mode: "boolean" }).notNull(),
	imageUrl: text("imageUrl").notNull(),
	glass: text("glass").notNull(),
});

export const ingredients = sqliteTable("Ingredient", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
});

// Composite primary key (drinkId, ingredientId). Foreign keys to
// Drink + Ingredient with ON DELETE RESTRICT (Prisma's default).
export const measures = sqliteTable(
	"Measure",
	{
		drinkId: integer("drinkId")
			.notNull()
			.references(() => drinks.id, { onDelete: "restrict", onUpdate: "cascade" }),
		ingredientId: integer("ingredientId")
			.notNull()
			.references(() => ingredients.id, { onDelete: "restrict", onUpdate: "cascade" }),
		measure: text("measure").notNull(),
	},
	(t) => [primaryKey({ columns: [t.drinkId, t.ingredientId] })],
);

export const reviews = sqliteTable("Review", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	drinkId: integer("drinkId")
		.notNull()
		.references(() => drinks.id, { onDelete: "restrict", onUpdate: "cascade" }),
	rating: integer("rating").notNull(),
	textContent: text("textContent").notNull(),
});

// Avoid an unused `sql` symbol from the import — re-export so the
// drizzle-kit config can use it for `default()` expressions if it
// ever needs to.
export { sql };
