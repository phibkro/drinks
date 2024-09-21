import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
	uri: import.meta.env.PROD
		? "drinks-server.philib-krogh-d23.workers.dev"
		: "http://localhost:4000",
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
