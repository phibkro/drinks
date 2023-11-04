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
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
