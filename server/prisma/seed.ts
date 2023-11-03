import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.ingredient.createMany({
    data: [
      { name: "Light rum" },
      { name: "Applejack" },
      { name: "Gin" },
      { name: "Dark rum" },
      { name: "Sweet Vermouth" },
      { name: "Strawberry schnapps" },
      { name: "Scotch" },
      { name: "Apricot brandy" },
      { name: "Triple sec" },
      { name: "Southern Comfort" },
      { name: "Orange bitters" },
      { name: "Brandy" },
      { name: "Lemon vodka" },
      { name: "Blended whiskey" },
      { name: "Dry Vermouth" },
      { name: "Amaretto" },
      { name: "Tea" },
      { name: "Champagne" },
      { name: "Coffee liqueur" },
      { name: "Bourbon" },
      { name: "Tequila" },
      { name: "Vodka" },
      { name: "Añejo rum" },
      { name: "Bitters" },
      { name: "Sugar" },
      { name: "Kahlua" },
      { name: "demerara Sugar" },
      { name: "Dubonnet Rouge" },
      { name: "Lime juice" },
      { name: "Irish whiskey" },
      { name: "Apple brandy" },
      { name: "Carbonated water" },
      { name: "Cherry brandy" },
      { name: "Creme de Cacao" },
      { name: "Grenadine" },
      { name: "Port" },
      { name: "Coffee brandy" },
      { name: "Red wine" },
      { name: "Rum" },
      { name: "Grapefruit juice" },
      { name: "Ricard" },
      { name: "Sherry" },
      { name: "Cognac" },
      { name: "Sloe gin" },
      { name: "Apple juice" },
      { name: "Pineapple juice" },
      { name: "Lemon juice" },
      { name: "Sugar syrup" },
      { name: "Milk" },
      { name: "Strawberries" },
      { name: "Chocolate syrup" },
      { name: "Yoghurt" },
      { name: "Mango" },
      { name: "Ginger" },
      { name: "Lime" },
      { name: "Cantaloupe" },
      { name: "Berries" },
      { name: "Grapes" },
      { name: "Kiwi" },
      { name: "Tomato juice" },
    ],
  });
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
