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
  //const [lastLength, setLastLength] = useState(0);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    SEARCH_DRINKS_BY_NAME,
    {
      variables: {
        name: inputVar(),
        options: optionsVar(),
        offset: 0,
        limit: 12,
      },
    },
  );

  const handleSearch = () => {
    refetch();
  };

  const handleCheckbox = () => {
    optionsVar({
      sort: optionsVar().sort,
      alcohol: !optionsVar().alcohol,
    });
  };

  return (
    <main className="flex flex-col items-center gap-10 ">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        role="search"
        className="flex w-8/12 flex-col items-center gap-4 "
      >
        <Label id="search_label">Search for your favorite drink!</Label>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            placeholder={'"Margarita"'}
            onChange={(event) => {
              inputVar(event.target.value);
            }}
            value={inputValue}
            role="searchbox"
            aria-labelledby="search_label"
            data-cy="search-input"
          />
          <Button
            variant="default"
            type="submit"
            className="m-auto min-w-min"
            data-cy="search_button"
          >
            Search
          </Button>
        </div>

        <div className="flex max-w-full flex-col gap-8 sm:flex-row">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-xl ">Sort name by:</h2>
            <RadioGroup
              onValueChange={async (value) => {
                await optionsVar({
                  sort: value,
                  alcohol: optionsVar().alcohol,
                });
                // wait for optionsVar to update before refetching
                handleSearch();
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

          <div className="flex flex-col items-center">
            <h2 className="text-xl">Alcohol</h2>
            <div className="flex flex-row gap-1">
              <Checkbox
                className="self-center"
                checked={!optionsValue.alcohol}
                onCheckedChange={async () => {
                  await handleCheckbox();
                  // wait for optionsVar to update before refetching
                  handleSearch();
                }}
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
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && data.searchDrinksByName.length !== 0 ? (
        <>
          <ResultList results={data.searchDrinksByName} />
          {
            /*data.searchDrinksByName.length == lastLength + 10 && // if pagination load less than 10 new elements there are no more elements to load
          data.searchDrinksByName.length >= 10 ? ( // if less than 10 elements show from search no more elements to load
           */ <Button
              className="min-w-min"
              data-cy="load-more"
              onClick={() => {
                //setLastLength(data.searchDrinksByName.length);
                //console.log(lastLength);

                fetchMore({
                  variables: {
                    offset: data.searchDrinksByName.length,
                  },
                });
              }}
            >
              Load more drinks
            </Button> /*
          ) : (
            <p>No more results to load</p>
          )*/
          }
        </>
      ) : (
        <p>No results</p>
      )}
    </main>
  );
}
