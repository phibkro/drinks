import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

interface Context {
	prisma: PrismaClient;
}

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

const resolvers = {
	Query: {
		allDrinks: (_p: unknown, _a: unknown, c: Context) =>
			c.prisma.drink.findMany(),
		drinkById: (_p: unknown, args: { id: number }, c: Context) =>
			c.prisma.drink.findUnique({ where: { id: args.id } }),
		searchDrinksByName: (
			_p: unknown,
			args: {
				name: string;
				options?: { sort?: "asc" | "desc"; alcohol?: boolean };
				offset?: number;
				limit?: number;
			},
			c: Context,
		) =>
			c.prisma.drink.findMany({
				skip: args.offset,
				take: args.limit,
				orderBy: { name: args.options?.sort },
				where: {
					alcoholic: args.options?.alcohol,
					name: { contains: args.name },
				},
			}),
		allIngredients: (_p: unknown, _a: unknown, c: Context) =>
			c.prisma.ingredient.findMany(),
		ingredientById: (_p: unknown, args: { id: number }, c: Context) =>
			c.prisma.ingredient.findUnique({ where: { id: args.id } }),

		allReviews: (_p: unknown, _a: unknown, c: Context) =>
			c.prisma.review.findMany(),
		reviewsByDrinkId: (_p: unknown, args: { id: number }, c: Context) =>
			c.prisma.review.findMany({ where: { drink: { id: args.id } } }),
		reviewById: (_p: unknown, args: { id: number }, c: Context) =>
			c.prisma.review.findUnique({ where: { id: args.id } }),

		allMeasures: (_p: unknown, _a: unknown, c: Context) =>
			c.prisma.measure.findMany(),
		measuresInDrink: (_p: unknown, args: { id: number }, c: Context) =>
			c.prisma.measure.findMany({ where: { drink: { id: args.id } } }),
	},
	Mutation: {
		addReview: (
			_p: unknown,
			args: { drinkId: number; rating: number; textContent: string },
			c: Context,
		) =>
			c.prisma.review.create({
				data: {
					drink: { connect: { id: args.drinkId } },
					rating: args.rating,
					textContent: args.textContent,
				},
			}),
		removeReview: (_p: unknown, args: { id: number }, c: Context) =>
			c.prisma.review.delete({ where: { id: args.id } }),
	},

	Drink: {
		measures: (parent: { id: number }, _a: unknown, c: Context) =>
			c.prisma.measure.findMany({ where: { drinkId: parent.id } }),
		reviews: (parent: { id: number }, _a: unknown, c: Context) =>
			c.prisma.review.findMany({ where: { drinkId: parent.id } }),
	},
	Ingredient: {
		measure: (parent: { id: number }, _a: unknown, c: Context) =>
			c.prisma.measure.findMany({ where: { ingredientId: parent.id } }),
	},
	Measure: {
		ingredient: (parent: { ingredientId: number }, _a: unknown, c: Context) =>
			c.prisma.ingredient.findUnique({ where: { id: parent.ingredientId } }),
		drink: (parent: { drinkId: number }, _a: unknown, c: Context) =>
			c.prisma.drink.findUnique({ where: { id: parent.drinkId } }),
	},
	Review: {
		drink: (parent: { drinkId: number }, _a: unknown, c: Context) =>
			c.prisma.drink.findUnique({ where: { id: parent.drinkId } }),
	},
};

const prisma = new PrismaClient();

const server = new ApolloServer<Context>({
	typeDefs,
	resolvers,
	introspection: true,
});

const port = Number(process.env.PORT ?? 4000);

const { url } = await startStandaloneServer(server, {
	listen: { port, host: process.env.HOST ?? "0.0.0.0" },
	context: async () => ({ prisma }),
});

console.log(`🍹 drinks-server ready at ${url}`);
