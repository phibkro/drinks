/* interface DrinkDetails {
  id: number;
  name: string;
  tags: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  thumbnail: string;
  ingredients: string[];
  measure: string[];
  imageSource: string;
  imageAttribution: string;
  creativeCommonsConfirmed: string;
} */
export interface DrinkDetails {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate?: string | null;
  strTags?: string | null;
  strVideo?: string | null;
  strCategory?: string | null;
  strIBA?: string | null;
  strAlcoholic?: string;
  strGlass?: string | null;
  strInstructions: string;
  strInstructionsES?: string | null;
  strInstructionsDE?: string | null;
  strInstructionsFR?: string | null;
  strInstructionsIT?: string | null;
  strDrinkThumb: string;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string | null;
}
interface Props extends DrinkDetails {}
export default function DrinkDetails({
  strDrink: name,
  strDrinkThumb: thumbnail,
  strInstructions: instructions,
  strAlcoholic: alcoholic,
  strGlass: glass,
  strIngredient1,
  strIngredient2,
  strIngredient3,
  strIngredient4,
  strIngredient5,
  strIngredient6,
  strIngredient7,
  strIngredient8,
  strIngredient9,
  strIngredient10,
  strIngredient11,
  strIngredient12,
  strIngredient13,
  strIngredient14,
  strIngredient15,
  strMeasure1,
  strMeasure2,
  strMeasure3,
  strMeasure4,
  strMeasure5,
  strMeasure6,
  strMeasure7,
  strMeasure8,
  strMeasure9,
  strMeasure10,
  strMeasure11,
  strMeasure12,
  strMeasure13,
  strMeasure14,
  strMeasure15,
}: Props) {
  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
  ].filter((value) => value !== null);
  const measures = [
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
  ].filter((value) => value !== null);
  // ^ transforming multiple individual variables to arrays without null values
  return (
    <div className="flex gap-8 flex-wrap">
      <header className="basis-full text-left">
        <h1 className="text-4xl">{name}</h1>
      </header>
      <div className="md:basis-2/6">
        <img src={thumbnail} alt={`Photo of a ${name}`} />
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul className="list-disc">
          {ingredients.map((ingredient, i) => (
            <li key={i} className="ml-5">{`${
              measures[i] ? measures[i] : ""
            } ${ingredient}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Other details</h2>
        <table>
          <tbody>
            {[alcoholic, glass].map((value) => (
              <tr>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:basis-full">
        <h2>Instructions</h2>
        <p>{instructions}</p>
      </div>
    </div>
  );
}
