import { PrismaClient } from "@prisma/client";
import seedIngredients from "../data/seedIngredients.json" assert { type: "json" };
import seedDrinks from "../data/seedDrinks.json" assert { type: "json" };
import seedMeasures from "../data/seedMeasures.json" assert { type: "json" };

const prisma = new PrismaClient();
async function main() {
  // Populate db
  await prisma.ingredient.createMany(seedIngredients);
  await prisma.drink.createMany(seedDrinks);
  await prisma.measure.createMany({
    data: seedMeasures.data,
    skipDuplicates: true,
  });
}
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
