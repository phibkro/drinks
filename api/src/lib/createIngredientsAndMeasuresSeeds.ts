import { writeFile } from "fs/promises";
import drinks from "../data/cleaned_all_drinks.json" assert { type: "json" };

async function main() {
  console.log("Creating measures seed file...");

  const ingredientNames = drinks.flatMap((drink) => {
    const ingredients = [
      drink.strIngredient1,
      drink.strIngredient2,
      drink.strIngredient3,
      drink.strIngredient4,
      drink.strIngredient5,
      drink.strIngredient6,
      drink.strIngredient7,
      drink.strIngredient8,
      drink.strIngredient9,
      drink.strIngredient10,
      drink.strIngredient11,
      drink.strIngredient12,
      drink.strIngredient13,
      drink.strIngredient14,
      drink.strIngredient15,
    ].filter((ingredient) => Boolean(ingredient));

    return ingredients;
  });

  const uniqueIngredientNames = [...new Set(ingredientNames)];
  const ingredientsData = {
    data: uniqueIngredientNames.map((ingredientName, index) => {
      return {
        id: index,
        name: ingredientName,
      };
    }),
  };

  const measures = {
    data: drinks.flatMap((drink) => {
      const ingredients = [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
        drink.strIngredient6,
        drink.strIngredient7,
        drink.strIngredient8,
        drink.strIngredient9,
        drink.strIngredient10,
        drink.strIngredient11,
        drink.strIngredient12,
        drink.strIngredient13,
        drink.strIngredient14,
        drink.strIngredient15,
      ].filter((ingredient) => Boolean(ingredient));
      const measures = [
        drink.strMeasure1,
        drink.strMeasure2,
        drink.strMeasure3,
        drink.strMeasure4,
        drink.strMeasure5,
        drink.strMeasure6,
        drink.strMeasure7,
        drink.strMeasure8,
        drink.strMeasure9,
        drink.strMeasure10,
        drink.strMeasure11,
        drink.strMeasure12,
        drink.strMeasure13,
        drink.strMeasure14,
        drink.strMeasure15,
      ].filter((measure) => Boolean(measure));
      return measures.map((measure, index) => {
        const name = ingredients[index];
        const ingredientId = ingredientsData.data.find(
          (ingredient) => ingredient.name === name
        ).id;
        return {
          measure: measure,
          ingredientId: ingredientId,
          drinkId: Number(drink.id),
          // ingredientName: name,
        };
      });
    }),
  };

  const ingredientsJSON = JSON.stringify(ingredientsData);
  await writeFile("./src/data/seedIngredients.json", ingredientsJSON, "utf-8");
  const measuresJSON = JSON.stringify(measures);
  await writeFile("./src/data/seedMeasures.json", measuresJSON, "utf-8");

  console.log("Done!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
