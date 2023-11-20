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

  return (
    <main className="flex flex-col gap-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        className="flex flex-col gap-4"
      >
        <Label>Search for your favorite drink!</Label>
        <Input
          placeholder={'"Margarita"'}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          value={inputValue}
        />
        <div className="flex gap-12 self-center">
          <RadioGroup
            onValueChange={(value) => {
              setSort(value);
            }}
            defaultValue="asc"
            className="flex flex-col"
          >
            <h2 className="text-center text-xl ">Sorting</h2>
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

          <div className="flex flex-col">
            <h2 className="text-xl">Alcohol</h2>
            <Label
              htmlFor="terms1"
              className="flex flex-row gap-1 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Checkbox
                className="self-center"
                checked={checked}
                onCheckedChange={handleCheckbox}
              />
              <p>Non-alcoholic</p>
            </Label>
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
