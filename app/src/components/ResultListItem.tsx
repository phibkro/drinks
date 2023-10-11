import { Key } from "react";

export interface ResultItem {
  image: string;
  name: string;
  ingredients: string[];
  uniqueKey: Key;
}

export function ResultListItem({
  name,
  image,
  ingredients,
  uniqueKey,
}: ResultItem) {
  const renderList = () => {
    const listItems = [];
    for (let i = 0; i < ingredients.length; i++) {
      listItems.push(<li key={i}>{ingredients[i]}</li>);
    }
    return listItems;
  };
  return (
    <div key={uniqueKey} className="flex">
      <div className="basis-1/3">
        <img src={image} alt="" />
      </div>

      <div className="basis-2/3">
        <h1>{name}</h1>
        <ul>{renderList()}</ul>
      </div>
    </div>
  );
}
