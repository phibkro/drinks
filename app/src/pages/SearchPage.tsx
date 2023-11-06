import { ResultList } from "@/components/ResultList";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/Input";
import { GET_DRINKS } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function SearchPage() {
  const { loading, error, data } = useQuery(GET_DRINKS);
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    /* const validDrinks = data.drinks
      .filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchString.toLowerCase()),
      )
      .map((result) => transformCocktailDBResult(result));
    setSearchResults(validDrinks);
    console.log(validDrinks); */
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
              handleSearch();
            }
          }}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error :</p>}
        {data && <ResultList results={data.allDrinks} />}
      </div>
    </main>
  );
}
