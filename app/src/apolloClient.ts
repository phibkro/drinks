import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
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
