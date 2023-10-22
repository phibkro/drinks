import { Link } from "react-router-dom";
import { DrinkDetails } from "../../../data/types";

interface Result {
  results: DrinkDetails[];
}

export function ResultList(props: Result) {
  const listTest: JSX.Element[] = [];
  props.results.forEach((item) => {
    listTest.push(ResultListItem(item));
  });
  return <div className="flex flex-col gap-5">{listTest}</div>;
}

export function ResultListItem({
  strDrink: name,
  strDrinkThumb: image,
  ingredients,
}: DrinkDetails) {
  const renderList = () => {
    const listItems = [];
    for (let i = 0; i < ingredients.length; i++) {
      listItems.push(<li key={i}>{ingredients[i]}</li>);
    }
    return listItems;
  };
  return (
    <Link to={`details/${name}`}>
      <div className="flex gap-4 bg-primary-foreground hover:cursor-pointer">
        <div className="basis-1/4">
          <img src={image} alt={`Image of ${name}`} />
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
