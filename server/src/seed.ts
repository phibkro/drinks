import type { PrismaClient } from "@prisma/client";
import seedIngredients from "../data/seedIngredients.json" assert {
	type: "json",
};
import seedDrinks from "../data/seedDrinks.json" assert { type: "json" };
import seedMeasures from "../data/seedMeasures.json" assert { type: "json" };

export async function seed(prisma: PrismaClient) {
	// Populate db
	await prisma.ingredient.createMany(seedIngredients);
	await prisma.drink.createMany(seedDrinks);
	await prisma.measure.createMany({
		data: seedMeasures.data,
	});
}
