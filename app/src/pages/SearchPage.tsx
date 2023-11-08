import { ResultList } from "@/components/ResultList";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { SEARCH_DRINKS_BY_NAME } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function SearchPage() {
  const [limit, setLimit] = useState(10);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    SEARCH_DRINKS_BY_NAME,
    {
      variables: {
        name: "",
        options: {
          sort: "asc",
          alcohol: true,
        },
        offset: 0,
        limit: 10,
      },
    },
  );
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [sort, setSort] = useState("asc");
  function limitAdd(n: number) {
    setLimit(limit + n);
  }
  const handleSearch = () => {
    refetch({
      name: inputValue,
      options: {
        sort: sort,
        alcohol: !checked,
      },
    });
  };

  //usikker på om dette ble omvendt men fiks senere
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  //console.log(data);

  return (
    <main className="flex">
      <div className="basis-1/4">
        {/*<Sidebar />*/}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">Sorting</h2>
          <RadioGroup
            onValueChange={(value) => {
              setSort(value);
              console.log(value);
            }}
            defaultValue="asc"
            className="flex flex-col"
          >
            <Label
              className="flex items-center gap-1 text-lg"
              htmlFor="option-one"
            >
              <RadioGroupItem value="asc" id="option-one" />
              A-Z
            </Label>
            <Label
              className="flex items-center gap-1 text-lg"
              htmlFor="option-two"
            >
              <RadioGroupItem value="desc" id="option-two" />
              Z-A
            </Label>
          </RadioGroup>

          <h2 className="text-xl">Alcohol</h2>
          <div className="flex">
            <Checkbox checked={checked} onCheckedChange={handleCheckbox} />
            <label
              htmlFor="terms1"
              className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Non-alcoholic
            </label>
          </div>
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
          <Button onClick={handleSearch}>Apply</Button>
        </div>
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
        {error && <p>Error : {error.message}</p>}
        {data ? (
          <>
            <ResultList results={data.searchDrinksByName} />
            <Button
              onClick={() => {
                //console.log(data);

                //limitAdd(10);
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
      </div>
    </main>
  );
}
