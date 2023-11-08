interface DBDrink {
  id: number;
  name: string;
  instructions: string;
  alcoholic: string;
  imageUrl: string;
  glass: string;
  measures: Array<{
    measure: string;
    ingredient: {
      name: string;
    };
  }>;
}
interface Props extends DBDrink {}
export default function DrinkDetails({
  name,
  imageUrl,
  instructions,
  alcoholic,
  glass,
  measures,
}: Props) {
  return (
    <div className="flex flex-wrap gap-8">
      <header className="basis-full text-left">
        <h1 className="text-4xl">{name}</h1>
      </header>
      <div className="md:basis-2/6">
        <img src={imageUrl} alt={`Photo of a ${name}`} />
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul className="list-disc">
          {measures.map((measure, i) => (
            <li
              key={i}
              className="ml-5"
            >{`${measure.measure} ${measure.ingredient.name}`}</li>
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
