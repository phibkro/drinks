import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import type { Context, Env } from "../worker-configuration";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateCloudflareWorkersHandler } from "@as-integrations/cloudflare-workers";
import { PrismaD1 } from "@prisma/adapter-d1";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Drink {
    id: Int!
    name: String!
    instructions: String!
    alcoholic: Boolean!
    imageUrl: String!
    glass: String!
    measures: [Measure!]
    reviews: [Review]
  }

  type Ingredient {
    id: Int!
    name: String!
    measure: [Measure!]
  }

  type Measure {
    id: Int!
    ingredient: Ingredient!
    drink: Drink!
    measure: String!
  }

  type Review {
    id: Int!
    drink: Drink!
    rating: Int!
    textContent: String!
  }

  # enum SortingOptions {
  enum SortOptions {
    asc
    desc
  }
  input SearchOptions {
    sort: SortOptions
    alcohol: Boolean
  }

  type Query {
    allDrinks: [Drink]
    drinkById(id: Int!): Drink
    searchDrinksByName(name: String!, options: SearchOptions, offset: Int, limit: Int ): [Drink]

    allIngredients: [Ingredient]
    ingredientById(id: Int!): Ingredient

    allReviews: [Review]
    reviewsByDrinkId(id: Int!): [Review]
    reviewById(id: Int!): Review

    allMeasures: [Measure]
    measuresInDrink(id: Int!): [Measure]
  }
  type Mutation {
    addReview(drinkId: Int!, rating: Int!, textContent: String!): Review
    removeReview(id: Int!): Review
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	// TODO: Query ingredients by drink by
	// getting all ingredients for measures in a drink
	Query: {
		allDrinks: (_parent, _args, c) => c.prisma.drink.findMany(),
		drinkById: (_parent, args, c) => {
			c.prisma.drink.findUnique({
				where: {
					id: args.id,
				},
			});
		},
		searchDrinksByName: (_parent, args, c) => {
			return c.prisma.drink.findMany({
				skip: args.offset,
				take: args.limit,
				orderBy: {
					name: args.options?.sort,
				},
				where: {
					alcoholic: args.options?.alcohol,
					name: {
						contains: args.name,
					},
				},
			});
		},
		allIngredients: (_parent, _args, c) => c.prisma.ingredient.findMany(),
		ingredientById: (_parent, args, c) =>
			c.prisma.ingredient.findUnique({ where: { id: args.id } }),

		allReviews: (_parent, _args, c) => c.prisma.review.findMany(),
		reviewsByDrinkId: (_parent, args, c) =>
			c.prisma.review.findMany({
				where: {
					drink: {
						id: args.id,
					},
				},
			}),
		reviewById: (_parent, args, c) =>
			c.prisma.review.findUnique({
				where: {
					id: args.id,
				},
			}),
		allMeasures: (_parent, _args, c) => c.prisma.measure.findMany(),
		measuresInDrink: (_parent, args, c) => {
			return c.prisma.measure.findMany({
				where: {
					drink: {
						id: args.id,
					},
				},
			});
		},
	},
	Mutation: {
		addReview: (_parent, args, c) =>
			c.prisma.review.create({
				data: {
					drink: {
						connect: {
							id: args.drinkId,
						},
					},
					rating: args.rating,
					textContent: args.textContent,
				},
			}),
		removeReview: (_parent, args, c) =>
			c.prisma.review.delete({
				where: {
					id: args.id,
				},
			}),
	},

	// Trivial resolvers for relations
	Drink: {
		// Resolve the 'measures' field for the Drink type
		measures: (parent, _args, c: Context) =>
			c.prisma.measure.findMany({ where: { drinkId: parent.id } }),
		reviews: (parent, _args, c: Context) =>
			c.prisma.review.findMany({ where: { drinkId: parent.id } }),
	},
	Ingredient: {
		// Resolve the 'measure' field for the Ingredient type
		measure: (parent, _args, c: Context) =>
			c.prisma.measure.findMany({ where: { ingredientId: parent.id } }),
	},
	Measure: {
		// Resolve the 'ingredient' field for the Measure type
		ingredient: (parent, _args, c: Context) =>
			c.prisma.ingredient.findUnique({ where: { id: parent.ingredientId } }),

		// Resolve the 'drink' field for the Measure type
		drink: (parent, _args, c: Context) =>
			c.prisma.drink.findUnique({ where: { id: parent.drinkId } }),
	},
	Review: {
		drink: (parent, _args, c: Context) =>
			c.prisma.drink.findUnique({ where: { id: parent.drinkId } }),
	},
};

const server = new ApolloServer<Context>({
	typeDefs,
	resolvers,
	introspection: true,
	plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

export default {
	fetch: startServerAndCreateCloudflareWorkersHandler<Env, Context>(server, {
		context: async ({ env, request, ctx }) => {
			const adapter = new PrismaD1(env.db);
			const prisma = new PrismaClient({ adapter });
			return { prisma };
		},
	}),
};
