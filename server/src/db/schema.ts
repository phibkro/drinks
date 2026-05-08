import { sql } from "drizzle-orm";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

// Schema mirrors the live SQLite at /var/lib/drinks/db.sqlite that
// was originally created via Prisma's `migrate deploy` in the
// 20240920151910_init migration. Column names + types preserved
// verbatim (PascalCase table names from Prisma's default mapping)
// so the existing data stays valid against this schema without any
// Drizzle migration on first activation — `drizzle-kit push` is a
// no-op against the matching live DB.

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
