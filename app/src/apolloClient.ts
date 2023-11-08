import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // Use when running locally
  uri: "http://localhost:4000",
  // Use when on NTNU vm
  // uri: "http://it2810-40.idi.ntnu.no:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchDrinksByName:{
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }
          
        }
      }
    }
  }),
});
