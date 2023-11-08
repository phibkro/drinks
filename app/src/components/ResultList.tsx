import { Link } from "react-router-dom";

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
interface Result {
  results: DBDrink[];
}

export function ResultList(props: Result) {
  const listTest: JSX.Element[] = [];
  props.results.forEach((item) => {
    listTest.push(ResultListItem(item));
  });
  return <div className="flex flex-col gap-5">{listTest}</div>;
}

export function ResultListItem({ id, name, imageUrl, measures }: DBDrink) {
  const renderList = () => {
    const listItems = [];
    for (let i = 0; i < measures.length; i++) {
      const currentMeasure = measures[i];
      listItems.push(
        <li key={i}>
          {currentMeasure.measure + " " + currentMeasure.ingredient.name}
        </li>,
      );
    }
    return listItems;
  };
  return (
    <Link to={`details/${id}`}>
      <div className="flex gap-4 bg-primary-foreground hover:cursor-pointer">
        <div className="basis-1/4">
          <img src={imageUrl} alt={`Image of ${name}`} />
        </div>
        <h2>{name}</h2>
        <div>
          <h3>Ingredients</h3>
          <ul>{renderList()}</ul>
        </div>
      </div>
    </Link>
  );
}
