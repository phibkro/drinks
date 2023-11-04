import { writeFile } from "fs/promises";
import drinks from "../data/cleaned_all_drinks.json" assert { type: "json" };

async function main() {
  console.log("Creating drinks seed file...");

  const seed = {
    data: drinks.map((drink) => ({
      id: Number(drink.id),
      name: drink.strDrink,
      instructions: drink.strInstructions,
      alcoholic: drink.strAlcoholic === "Alcoholic",
    })),
  };

  const json = JSON.stringify(seed);

  await writeFile("./src/data/seedDrinks.json", json, "utf-8");

  console.log("Done!");
}

main();
