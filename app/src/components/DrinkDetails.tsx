import { DrinkDetails } from "@/data/types";

interface Props extends DrinkDetails {}
export default function DrinkDetails({
  strDrink: name,
  strDrinkThumb: thumbnail,
  strInstructions: instructions,
  strAlcoholic: alcoholic,
  strGlass: glass,
  ingredients,
  measures,
}: Props) {
  return (
    <div className="flex flex-wrap gap-8">
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
