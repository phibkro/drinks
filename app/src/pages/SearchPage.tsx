import { Input } from "@/components/ui/input";
import * as data from "@/data/M_cocktails.json";
import useCocktailStore from "@/hooks/useCocktailStore";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const { searchResults, setSearchResults } = useCocktailStore();
  const [inputValue, setInputValue] = useState("");
  const handleSearch = (searchString: string) => {
    const validDrinks = data.drinks.filter((drink) =>
      drink.strDrink.toLowerCase().includes(searchString.toLowerCase()),
    );
    setSearchResults(validDrinks);
    console.log(validDrinks);
  };
  return (
    <main className="flex">
      <div className="basis-1/4">Sidebar placeholder</div>
      <div className="basis-3/4 flex flex-col gap-4">
        <Input
          placeholder={'"Margharita"'}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              console.log(inputValue);
              handleSearch(inputValue);
            }
          }}
        />
        {searchResults.map((drinkDetails) => (
          <Link to={`details/${drinkDetails.strDrink}`}>
            <div className="flex gap-2 hover:cursor-pointer">
              <div className="basis-1/4">
                <img
                  src={drinkDetails.strDrinkThumb}
                  alt={`Image of ${drinkDetails.strDrink}`}
                />
              </div>
              <h2>{drinkDetails.strDrink}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
