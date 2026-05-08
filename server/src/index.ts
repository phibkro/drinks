import "./sentry.ts"; // must run before any other code so it can patch globals

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { and, asc, desc, eq, like } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { z } from "zod";

import { db, schema } from "./db/index.ts";

const { drinks, ingredients, measures, reviews } = schema;

interface Context {
	db: typeof db;
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

// ── Mutation input validation ────────────────────────────────────
// drinks-api is internet-public via cloudflared. Cloudflare's rate
// limit caps abuse volume; these schemas cap abuse quality.
const positiveInt = z.int().positive();

const addReviewInput = z.object({
	drinkId: positiveInt,
	rating: z.int().min(1).max(5),
	textContent: z
		.string()
		.trim()
		.min(3, "review needs at least 3 characters")
		.max(2000, "review can be at most 2000 characters")
		.refine((s) => !/^https?:\/\/\S+$/i.test(s), "review can't be just a URL"),
});

const removeReviewInput = z.object({
	id: positiveInt,
});

function badInput(err: z.ZodError): GraphQLError {
	return new GraphQLError(err.issues.map((i) => i.message).join("; "), {
		extensions: { code: "BAD_USER_INPUT" },
	});
}

// Drizzle returns arrays; for unique-by-id lookups we take .at(0)
// and Apollo treats undefined as null on a nullable field.
const first = <T>(rows: T[]): T | undefined => rows[0];

const resolvers = {
	Query: {
		allDrinks: (_p: unknown, _a: unknown, c: Context) =>
			c.db.select().from(drinks),

		drinkById: (_p: unknown, args: { id: number }, c: Context) =>
			c.db
				.select()
				.from(drinks)
				.where(eq(drinks.id, args.id))
				.limit(1)
				.then(first),

		searchDrinksByName: async (
			_p: unknown,
			args: {
				name: string;
				options?: { sort?: "asc" | "desc"; alcohol?: boolean };
				offset?: number;
				limit?: number;
			},
			c: Context,
		) => {
			const conds = [];
			if (args.name) conds.push(like(drinks.name, `%${args.name}%`));
			if (args.options?.alcohol !== undefined) {
				conds.push(eq(drinks.alcoholic, args.options.alcohol));
			}

			const orderCol =
				args.options?.sort === "desc" ? desc(drinks.name) : asc(drinks.name);

			return c.db
				.select()
				.from(drinks)
				.where(conds.length > 0 ? and(...conds) : undefined)
				.orderBy(orderCol)
				.limit(args.limit ?? 12)
				.offset(args.offset ?? 0);
		},

		allIngredients: (_p: unknown, _a: unknown, c: Context) =>
			c.db.select().from(ingredients),

		ingredientById: (_p: unknown, args: { id: number }, c: Context) =>
			c.db
				.select()
				.from(ingredients)
				.where(eq(ingredients.id, args.id))
				.limit(1)
				.then(first),

		allReviews: (_p: unknown, _a: unknown, c: Context) =>
			c.db.select().from(reviews),

		reviewsByDrinkId: (_p: unknown, args: { id: number }, c: Context) =>
			c.db.select().from(reviews).where(eq(reviews.drinkId, args.id)),

		reviewById: (_p: unknown, args: { id: number }, c: Context) =>
			c.db
				.select()
				.from(reviews)
				.where(eq(reviews.id, args.id))
				.limit(1)
				.then(first),

		allMeasures: (_p: unknown, _a: unknown, c: Context) =>
			c.db.select().from(measures),

		measuresInDrink: (_p: unknown, args: { id: number }, c: Context) =>
			c.db.select().from(measures).where(eq(measures.drinkId, args.id)),
	},

	Mutation: {
		addReview: async (
			_p: unknown,
			args: { drinkId: number; rating: number; textContent: string },
			c: Context,
		) => {
			const parsed = addReviewInput.safeParse(args);
			if (!parsed.success) throw badInput(parsed.error);
			const [created] = await c.db
				.insert(reviews)
				.values(parsed.data)
				.returning();
			return created;
		},
		removeReview: async (
			_p: unknown,
			args: { id: number },
			c: Context,
		) => {
			const parsed = removeReviewInput.safeParse(args);
			if (!parsed.success) throw badInput(parsed.error);
			const [deleted] = await c.db
				.delete(reviews)
				.where(eq(reviews.id, parsed.data.id))
				.returning();
			return deleted;
		},
	},

	Drink: {
		measures: (parent: { id: number }, _a: unknown, c: Context) =>
			c.db.select().from(measures).where(eq(measures.drinkId, parent.id)),
		reviews: (parent: { id: number }, _a: unknown, c: Context) =>
			c.db.select().from(reviews).where(eq(reviews.drinkId, parent.id)),
	},
	Ingredient: {
		measure: (parent: { id: number }, _a: unknown, c: Context) =>
			c.db.select().from(measures).where(eq(measures.ingredientId, parent.id)),
	},
	Measure: {
		ingredient: (parent: { ingredientId: number }, _a: unknown, c: Context) =>
			c.db
				.select()
				.from(ingredients)
				.where(eq(ingredients.id, parent.ingredientId))
				.limit(1)
				.then(first),
		drink: (parent: { drinkId: number }, _a: unknown, c: Context) =>
			c.db
				.select()
				.from(drinks)
				.where(eq(drinks.id, parent.drinkId))
				.limit(1)
				.then(first),
	},
	Review: {
		drink: (parent: { drinkId: number }, _a: unknown, c: Context) =>
			c.db
				.select()
				.from(drinks)
				.where(eq(drinks.id, parent.drinkId))
				.limit(1)
				.then(first),
	},
};

const server = new ApolloServer<Context>({
	typeDefs,
	resolvers,
	introspection: true,
});

const port = Number(process.env.PORT ?? 4000);

const { url } = await startStandaloneServer(server, {
	listen: { port, host: process.env.HOST ?? "0.0.0.0" },
	context: async () => ({ db }),
});

console.log(`🍹 drinks-server ready at ${url}`);
