import { ResultList } from "@/components/ResultList";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { SEARCH_DRINKS_BY_NAME } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const { loading, error, data, refetch } = useQuery(SEARCH_DRINKS_BY_NAME, {
    variables: { name: "" },
  });
  const handleSearch = () => {
    refetch({
      name: inputValue,
    });
    console.log(data);
  };
  return (
    <main className="flex">
      <div className="basis-1/4">
        <Sidebar />
      </div>
      <div className="flex basis-3/4 flex-col gap-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <Label>Search for your favorite drink!</Label>
          <Input
            placeholder={'"Margarita"'}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            value={inputValue}
          />
        </form>

        {loading && <p>Loading...</p>}
        {error && <p>Error :</p>}
        {data.searchDrinksByName.length !== 0 ? (
          <ResultList results={data.searchDrinksByName} />
        ) : (
          <p>No results</p>
        )}
      </div>
    </main>
  );
}
