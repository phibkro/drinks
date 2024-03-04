import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  // Connect to local server
  uri: "http://localhost:3000/api",
  // Connect to PROD on vm
  // uri: "http://it2810-40.idi.ntnu.no:4000/",
});

export const client = new ApolloClient({
  link: httpLink,
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
