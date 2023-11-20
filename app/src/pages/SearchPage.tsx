import { ResultList } from "@/components/ResultList";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useSearchOptionsStore } from "@/hooks/useSearchOptions";
import { SEARCH_DRINKS_BY_NAME } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function SearchPage() {
  const query = useSearchOptionsStore((state) => state.query);
  const setQuery = useSearchOptionsStore((state) => state.setQuery);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    SEARCH_DRINKS_BY_NAME,
    {
      variables: query,
    },
  );
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [sort, setSort] = useState("asc");

  const handleSearch = async () => {
    await setQuery({
      name: inputValue,
      options: {
        sort: sort,
        alcohol: !checked,
      },
      offset: 0,
      limit: 10,
    });
    refetch(query);
  };

  //usikker på om dette ble omvendt men fiks senere
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <main className="flex flex-col gap-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        role="search"
        className="flex flex-col gap-4"
      >
        <Label>
          Search for your favorite drink!
          <Input
            placeholder={'"Margarita"'}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            value={inputValue}
            role="searchbox"
          />
        </Label>

        <div className="flex gap-12 self-center">
          <div>
            <h2 className="text-center text-xl ">Sort name by:</h2>
            <RadioGroup
              onValueChange={(value) => {
                setSort(value);
              }}
              defaultValue="asc"
              className="flex flex-col"
            >
              <div className="flex items-center gap-1 ">
                <RadioGroupItem value="asc" id="asc" />
                <Label className="text-lg" htmlFor="asc">
                  A-Z
                </Label>
              </div>

              <div className="flex items-center gap-1 ">
                <RadioGroupItem value="desc" id="desc" />
                <Label className="text-lg" htmlFor="desc">
                  Z-A
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl">Alcohol</h2>
            <div className="flex flex-row gap-1">
              <Checkbox
                className="self-center"
                checked={checked}
                onCheckedChange={handleCheckbox}
                id="non-alcoholic"
              />
              <Label className="text-lg font-medium" htmlFor="non-alcoholic">
                Non-alcoholic
              </Label>
            </div>
          </div>
          <Button onClick={handleSearch}>Apply</Button>
          {/* 
          <h2 className="text-xl">Rating</h2>
          {Array(5)
            .fill(5)
            .map((_, n) => (
              <div className="flex" key={n}>
                <Checkbox />
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                ></label>
                {Array(n + 1)
                  .fill(n + 1)
                  .map((_, m) => (
                    <Martini
                      color={ratedColor}
                      className="hover:cursor-pointer"
                      key={m}
                    />
                  ))}
              </div>
            ))}*/}
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data ? (
        <>
          <ResultList results={data.searchDrinksByName} />
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data.searchDrinksByName.length,
                },
              });
            }}
          >
            Load more drinks
          </Button>
        </>
      ) : (
        <p>No results</p>
      )}
    </main>
  );
}
