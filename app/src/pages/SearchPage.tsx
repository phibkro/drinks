import { ResultList } from "@/components/ResultList";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/Input";
import * as data from "@/data/m_cocktails.json";
import useCocktailStore from "@/hooks/useCocktailStore";
import { transformCocktailDBResult } from "@/lib/utils";
import { useState } from "react";

export default function SearchPage() {
  const { searchResults, setSearchResults } = useCocktailStore();
  const [inputValue, setInputValue] = useState("");
  const handleSearch = (searchString: string) => {
    const validDrinks = data.drinks
      .filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchString.toLowerCase()),
      )
      .map((result) => transformCocktailDBResult(result));
    setSearchResults(validDrinks);
    console.log(validDrinks);
  };
  return (
    <main className="flex">
      <div className="basis-1/4">
        <Sidebar />
      </div>
      <div className="flex basis-3/4 flex-col gap-4">
        <Input
          placeholder={'"Margarita"'}
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
        {searchResults.length ? (
          <ResultList results={searchResults} />
        ) : (
          <p>No results</p>
        )}
      </div>
    </main>
  );
}
