import { DBDrink } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Result {
  results: DBDrink[];
}

export function ResultList(props: Result) {
  return (
    <nav data-cy="result-list" className="flex flex-wrap justify-center gap-5">
      {props.results.map((item) => (
        <ResultListItem
          key={item.id}
          className="w-full max-w-full sm:w-1/4"
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
    <Link to={`details/${id}`} className={className}>
      <div
        data-cy="result-list-items"
        role="link"
        tabIndex={0}
        className="flex flex-col"
        id={`${id}`}
      >
        <img width={700} height={700} src={imageUrl} alt={`Image of ${name}`} />
        <div className="p-2">
          <h2 className="text-center">{name}</h2>
        </div>
      </div>
    </Link>
  );
}
