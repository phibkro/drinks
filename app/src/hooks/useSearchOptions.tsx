import { create } from "zustand";

type Query = {
  name: string;
  options: {
    sort: string;
    alcohol: boolean;
  };
  offset: number;
  limit: number;
};
// Define a state
type SearchOptionsState = {
  query: Query;
  setQuery: (query: Query) => void;
};

// Create a store
export const useSearchOptionsStore = create<SearchOptionsState>((set) => ({
  query: {
    name: "",
    options: {
      sort: "asc",
      alcohol: true,
    },
    offset: 0,
    limit: 10,
  },
  setQuery: (query) => set({ query }),
}));
