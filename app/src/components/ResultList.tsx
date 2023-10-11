import { ResultItem, ResultListItem } from "./ResultListItem";

interface Result {
  results: ResultItem[];
}

export function ResultList(props: Result) {
  const listTest: JSX.Element[] = [];
  props.results.forEach((item) => {
    listTest.push(ResultListItem(item));
  });
  return <div>{listTest}</div>;
}
