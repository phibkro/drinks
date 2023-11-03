import { PrismaClient } from "@prisma/client";
import ingredientData from "../../data/processed/ingredients.json" assert { type: "json" };

const prisma = new PrismaClient();
async function main() {
  await prisma.ingredient.createMany(ingredientData);
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
