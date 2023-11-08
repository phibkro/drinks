import { readFile, writeFile } from "fs/promises";
// Module imports need .js extension to run with node --loader ts-node/esm
import { csvValidate, csvToJson } from "./utils.js";

async function main() {
  if (process.argv.length < 3) {
    throw new Error("Please provide a file path");
  }
  if (process.argv[2].endsWith(".csv") === false) {
    throw new Error("Please provide a csv file");
  }
  const filePath = process.argv[2];
  // const filePath = "data/cleaned_all_drinks.csv";
  const csvDrinks = await readFile(filePath, "utf8");

  csvValidate(csvDrinks, ";");

  const drinks = csvToJson(csvDrinks);

  const jsonDrinks = JSON.stringify(drinks, null, 2);

  const jsonFilePath = filePath.replace(".csv", ".json");

  await writeFile(jsonFilePath, jsonDrinks);

  console.log("Done");
}

main();
