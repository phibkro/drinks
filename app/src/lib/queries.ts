import { gql } from "@apollo/client";

export const GET_DRINKS = gql`
  query GetDrinks {
    allDrinks {
      name
      instructions
      alcoholic
      imageUrl
      glass
      measures {
        measure
        ingredient {
          name
        }
      }
    }
  }
`;

export const GET_DRINK_BY_ID = gql`
  query GetDrinkById($id: Int!) {
    drinkById(id: $id) {
      id
      name
      instructions
      alcoholic
      imageUrl
      glass
      measures {
        measure
        ingredient {
          name
        }
      }
    }
  }
`;

export const SEARCH_DRINKS_BY_NAME = gql`
  query SearchDrinksByName($name: String!, $options: SearchOptions, $offset: Int, $limit: Int) {
    searchDrinksByName(name: $name, options: $options, offset: $offset, limit: $limit) {
      id
      name
      alcoholic
      glass
      instructions
      imageUrl
      measures {
        measure
        ingredient {
          name
        }
      }
    }
  }
`;
