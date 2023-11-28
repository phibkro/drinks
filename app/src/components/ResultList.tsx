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
    <nav data-cy="result-list" className="flex flex-wrap gap-5">
      {props.results.map((item) => (
        <ResultListItem
          key={item.id}
          className="w-10/12 bg-primary-foreground sm:w-1/3 xl:w-1/5"
          {...item}
        />
      ))}
    </nav>
  );
}

export function ResultListItem({
  id,
  name,
  imageUrl,
  className,
}: { className: string } & DBDrink) {
  return (
    <Link to={`details/${id}`}>
      <div
        data-cy="result-list-items"
        role="link"
        tabIndex={0}
        className={className}
        id={`${id}`}
      >
        <img width={700} height={700} src={imageUrl} alt={`Image of ${name}`} />
        <div className="p-2">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  );
}
