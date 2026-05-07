import { PrismaClient } from "@prisma/client";
import seedDrinks from "../data/seedDrinks.json" with { type: "json" };
import seedIngredients from "../data/seedIngredients.json" with {
	type: "json",
};
import seedMeasures from "../data/seedMeasures.json" with { type: "json" };

export async function seed(prisma: PrismaClient) {
	await prisma.ingredient.createMany({ data: seedIngredients.data });
	await prisma.drink.createMany({ data: seedDrinks.data });
	await prisma.measure.createMany({ data: seedMeasures.data });
}

const prisma = new PrismaClient();
try {
	await seed(prisma);
	console.log("seeded");
} finally {
	await prisma.$disconnect();
}
