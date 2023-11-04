import { PrismaClient } from "@prisma/client";
import ingredientData from "../data/ingredients.json" assert { type: "json" };
import seedDrinks from "../data/seedDrinks.json" assert { type: "json" };

const prisma = new PrismaClient();
async function main() {
  // Populate db
  await prisma.ingredient.createMany(ingredientData);
  await prisma.drink.createMany(seedDrinks);
}
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
