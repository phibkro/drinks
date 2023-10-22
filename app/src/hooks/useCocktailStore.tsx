import { create } from "zustand";
import { DrinkDetails } from "../../../data/types";

type State = {
  searchResults: Array<DrinkDetails>;
};
type Action = {
  setSearchResults: (results: Array<DrinkDetails>) => void;
  clearSearchResults: () => void;
};
const useCocktailStore = create<State & Action>((set) => ({
  searchResults: [],
  setSearchResults: (results: Array<DrinkDetails>) =>
    set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [] }),
}));

export default useCocktailStore;
