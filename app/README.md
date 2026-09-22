# Drinks frontend

This package contains the React and Vite application for Drinks.
The browser uses Apollo Client to call `https://drinks-api.phibkro.org` in production.
The root Alchemy program supplies the local API during development.

## Commands

Run package checks from `app/`:

```sh
bun run build
bun run lint
bun run test-components
bun run test-e2e
```

Use `bun run test` to run lint and both Cypress suites.
Use the root `bun run dev` command for the complete local Worker and D1 stack.
To run Vite by itself, copy `.env.example` to `.env.local`, make sure the local
API listens on port 4000, and run `bun run dev` from `app/`. Without
`VITE_API_URL`, the client uses the production API.
Use the root `bun run check` command for the repository gate.

## Boundaries

The frontend does not own production data or deployment resources.
The server package owns the GraphQL API and its D1 access.
The root `alchemy.run.ts` file owns both Workers, both domains, and the D1 binding.

Do not put production credentials in Vite environment variables or browser code.
