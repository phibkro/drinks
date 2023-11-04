import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { startStandaloneServer } from "@apollo/server/standalone";

const prisma = new PrismaClient();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Drink {
    id: ID!
    name: String!
    instructions: String!
    alcoholic: Boolean!
    ingredientMeasures: [Measure!]
    reviews: [Review]
  }

  type Ingredient {
    id: ID!
    name: String!
    measure: [Measure!]
  }

  type Measure {
    id: ID!
    ingredient: Ingredient!
    drink: Drink!
    unit: String!
    quantity: Float!
  }

  type Review {
    id: ID!
    drink: Drink!
    rating: Int!
    textContent: String!
  }

  type Query {
    allDrinks: [Drink]
    drinkById(id: ID!): Drink

    ingredients: [Ingredient]
    ingredient(id: ID!): Ingredient

    allReviews: [Review]
    reviewsByDrinkId(id: ID!): [Review]
    reviewById(id: ID!): Review
  }
  type Mutation {
    addReview(drinkId: ID!, rating: Int!, textContent: String!): Review
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  // TODO: Query ingredients by drink by
  // getting all ingredients for measures in a drink
  Query: {
    allDrinks: () => prisma.drink.findMany(),
    drinkById: (drinkId: number) =>
      prisma.drink.findUnique({
        where: {
          id: drinkId,
        },
      }),
    ingredients: () => prisma.ingredient.findMany(),
    ingredient: (_parent, args) =>
      prisma.ingredient.findUnique({ where: { id: args.id } }),

    allReviews: () => prisma.review.findMany(),
    reviewsByDrinkId: (drinkId: number) =>
      prisma.review.findMany({
        where: {
          drink: {
            id: drinkId,
          },
        },
      }),
    reviewById: (reviewId: number) =>
      prisma.review.findUnique({
        where: {
          id: reviewId,
        },
      }),
  },
  Mutation: {
    addReview: (_parent, args) =>
      prisma.review.create({
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
  },
};

const environment = process.env.NODE_ENV || "development";

const server =
  environment === "production"
    ? new ApolloServer({
        typeDefs,
        resolvers,
      })
    : new ApolloServer({
        schema: addMocksToSchema({
          schema: makeExecutableSchema({ typeDefs, resolvers }),
          preserveResolvers: true,
        }),
      });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
