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
