export function csvValidate(data: string, delimiter: string) {
  const lines = data.split("\n");
  // id,strDrink,dateModified,idDrink,strAlcoholic,strCategory,strDrinkThumb,strGlass,strIBA,strIngredient1,strIngredient10,strIngredient11,strIngredient12,strIngredient13,strIngredient14,strIngredient15,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strInstructions,strMeasure1,strMeasure10,strMeasure11,strMeasure12,strMeasure13,strMeasure14,strMeasure15,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strMeasure8,strMeasure9,strVideo
  const columnTitles = lines[0].split(delimiter);
  let wrongLines = [];
  let wrongCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineColumns = line.split(delimiter);

    if (lineColumns.length !== columnTitles.length) {
      wrongCount++;
      wrongLines.push(i);
      console.log(lineColumns.length);
      console.log(line);
    }
  }
  console.log(wrongLines);
  console.log(wrongCount);
  if (wrongCount > 0) {
    throw new Error("There are wrong lines in the csv file");
  }
}

export function csvToJson(csv: string) {
  const lines = csv.split("\n");
  const header = lines[0].split(";").map((column) => column.trim());
  const body = lines.slice(1);

  const items = body.map((line) => {
    const columns = line.split(";");
    const item: any = {};
    header.forEach((column, index) => {
      item[column] = columns[index];
    });
    return item;
  });
  return items;
}
