import { ResultList } from "@/components/ResultList";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { SEARCH_DRINKS_BY_NAME } from "@/lib/queries";
import { makeVar, useQuery, useReactiveVar } from "@apollo/client";

const inputVar = makeVar("");
const optionsVar = makeVar({
  sort: "asc",
  alcohol: true,
});

export default function SearchPage() {
  const inputValue = useReactiveVar(inputVar);
  const optionsValue = useReactiveVar(optionsVar);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    SEARCH_DRINKS_BY_NAME,
    {
      variables: {
        name: inputVar(),
        options: optionsVar(),
        offset: 0,
        limit: 10,
      },
    },
  );

  const handleSearch = async () => {
    refetch();
  };

  //usikker på om dette ble omvendt men fiks senere
  const handleCheckbox = () => {
    // setChecked(!checked);
    optionsVar({
      sort: optionsVar().sort,
      alcohol: !optionsVar().alcohol,
    });
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
              inputVar(event.target.value);
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
                optionsVar({ sort: value, alcohol: optionsVar().alcohol });
              }}
              defaultValue={optionsValue.sort}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1 ">
                <RadioGroupItem
                  aria-labelledby="asc_label"
                  value="asc"
                  id="asc"
                />
                <Label className="text-lg" htmlFor="asc" id="asc_label">
                  A-Z
                </Label>
              </div>

              <div className="flex items-center gap-1 ">
                <RadioGroupItem
                  aria-labelledby="desc_label"
                  value="desc"
                  id="desc"
                />
                <Label className="text-lg" htmlFor="desc" id="desc_label">
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
                checked={!optionsValue.alcohol}
                onCheckedChange={handleCheckbox}
                id="non-alcoholic"
                aria-labelledby="non-alcoholic_label"
              />
              <Label
                className="text-lg font-medium"
                htmlFor="non-alcoholic"
                id="non-alcoholic_label"
              >
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
