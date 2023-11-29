import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const client = new ApolloClient({
  // Connect to local server
  uri: "http://localhost:4000",
  // Connect to PROD on vm
  // uri: "http://it2810-40.idi.ntnu.no:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchDrinksByName: offsetLimitPagination(),
        },
      },
    },
  }),
});
