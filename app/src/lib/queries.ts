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
  query SearchDrinksByName($name: String!, $options: SearchOptions) {
    searchDrinksByName(name: $name, options: $options) {
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

export const ADD_REVIEW = gql`
  mutation AddReview($drinkId: Int!, $textContent: String!, $rating: Int!) {
    addReview(drinkId: $drinkId, textContent: $textContent, rating: $rating) {
      textContent
      rating
      drink {
        id
      }
    }
  }
`;

export const GET_REVIEW_BY_DRINKID = gql`
  query ReviewsByDrinkId($drinkId: Int!) {
    reviewsByDrinkId(id: $drinkId) {
      textContent
      rating
      id
    }
  }
`;
