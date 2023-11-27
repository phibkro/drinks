import { Link } from "react-router-dom";

interface DBDrink {
  id: number;
  name: string;
  instructions: string;
  alcoholic: boolean;
  imageUrl: string;
  glass: string;
  measures: Array<{
    measure: string;
    ingredient: {
      name: string;
    };
  }>;
}
interface Result {
  results: DBDrink[];
}

export function ResultList(props: Result) {
  return (
    <nav data-cy="result-list" className="flex flex-col gap-5">
      {props.results.map((item) => (
        <ResultListItem key={item.id} {...item} />
      ))}
    </nav>
  );
}

export function ResultListItem({ id, name, imageUrl, measures }: DBDrink) {
  return (
    <Link to={`details/${id}`}>
      <div
        data-cy="result-list-items"
        role="link"
        tabIndex={0}
        className="flex gap-4 bg-primary-foreground"
        id={`${id}`}
      >
        <div className="basis-1/4">
          <img
            width={700}
            height={700}
            src={imageUrl}
            alt={`Image of ${name}`}
          />
        </div>
        <h2>{name}</h2>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {measures.map((currentMeasure, i) => (
              <li key={i}>
                {currentMeasure.measure + " " + currentMeasure.ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
