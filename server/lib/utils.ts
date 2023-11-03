import { readFile, writeFile } from "fs/promises";

async function main() {
  if (process.argv.length < 3) {
    throw new Error("Please provide a file path");
  }
  if (process.argv[2].endsWith(".csv") === false) {
    throw new Error("Please provide a csv file");
  }
  const filePath = process.argv[2];
  // const filePath = "data/cleaned_all_drinks.csv";
  const data = await readFile(filePath, "utf8");
  CSVCheck(data, ";");
}

main();

function CSVCheck(data: string, delimiter) {
  const lines = data.split("\n");
  // id,strDrink,dateModified,idDrink,strAlcoholic,strCategory,strDrinkThumb,strGlass,strIBA,strIngredient1,strIngredient10,strIngredient11,strIngredient12,strIngredient13,strIngredient14,strIngredient15,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strInstructions,strMeasure1,strMeasure10,strMeasure11,strMeasure12,strMeasure13,strMeasure14,strMeasure15,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strMeasure8,strMeasure9,strVideo
  const columnTitles = lines[0].split(";");
  let wrongLines = [];
  let wrongCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineColumns = line.split(";");

    if (lineColumns.length !== columnTitles.length) {
      wrongCount++;
      wrongLines.push(i);
      console.log(lineColumns.length);
      console.log(line);
    }
  }
  console.log(wrongLines);
  console.log(wrongCount);
}
