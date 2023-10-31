import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { startStandaloneServer } from "@apollo/server/standalone";

const prisma = new PrismaClient();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # TODO: Drink type should contain all properties defined in prisma.schema
  type Drink {
    id: ID!
  }

  type Ingredient {
    id: ID!
    name: String!
    measure: [Measure!]
  }

  # Measure type should not be defined
  # Think about why this makes sense

  # TODO: Review type should contain id, drink, rating and textContent
  type Review {
  }

  # You should be able to query
    # drink
      # TODO: all drinks
      # TODO: single drink by id
      # TODO: single drink by name
    # review
      # TODO: all reviews for a drink
      # TODO: all reviews
      # TODO single review by id
  type Query {
    books: [Book]
    ingredients: [Ingredient]
    ingredient(id: ID!): Ingredient
    # ingredientByName(name: String!): Ingredient
  }
  # You should be able to mutate
    # TODO: create a review
      # defined with a rating
      # defined with textContent
`;

// Temporary static data
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  // TODO: Query ingredients by drink by
  // getting all ingredients for measures in a drink
  Query: {
    books: () => books,
    ingredients: () => prisma.ingredient.findMany(),
    ingredient: (_parent, args) =>
      prisma.ingredient.findUnique({ where: { id: args.id } }),
    /* ingredientByName: (_parent, args) =>
      prisma.ingredient.findFirst({
        where: { name: args.name },
      }), */
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
