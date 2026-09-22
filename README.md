# Drinks

Drinks is a React application for browsing drink recipes and reviews.
The frontend and GraphQL API run at the Cloudflare edge.

## Architecture

- `app/` contains the Vite single-page application.
- `server/` contains Apollo Server, Drizzle, and the Cloudflare Worker entry point.
- `alchemy.run.ts` owns the Workers, custom domains, and D1 binding.
- `drinks-db` is the existing production D1 database.

The browser calls `https://drinks-api.phibkro.org`.
The production API allows only the production application origin. The local API allows only the loopback application origin.
Resolvers validate mutation input with Zod.

## Local development

Install the Bun workspace from the repository root:

```sh
bun install --frozen-lockfile
bun run dev
```

Alchemy starts the application, API, and a local D1 runtime with sample data.
Run all repository checks before a commit:

```sh
bun run check
```

Generate a new idempotent seed file with:

```sh
bun run server:seed
```

The production database already contains data.
Do not apply generated seed SQL to production during the hosting cutover.

## Production deployment

Production changes require operator approval and a Cloudflare profile with Worker and D1 access.
CI checks the repository but does not deploy it.

The first plan can bootstrap or upgrade the shared `alchemy-state-store` Worker.
That is a provider mutation and is part of the required approval.

```sh
bun install --frozen-lockfile
bun run check
bun run plan
bun run deploy
```

Inspect the plan before deployment.
It must adopt and retain `drinks-db`. It must not replace or delete the database.

For the first cutover:

1. Record the current Pages deployment, API Worker revision, DNS records, and custom-domain attachments.
2. Detach `drinks.phibkro.org` from Pages, or remove its Pages CNAME, immediately before the approved deployment.
3. Run the deployment and verify both public domains before removing either prior deployment.

## Rollback

For the first cutover, detach `drinks.phibkro.org` from the new Worker.
Reattach the hostname to the previous Pages deployment.
Redeploy the previous API Worker revision if the API changed.
Do not delete or recreate `drinks-db`.

For later releases, use a clean worktree at the last known-good revision.
Install its lock file, run its checks, inspect `bun run plan`, and run `bun run deploy` after operator approval.
Do not use `alchemy destroy` as a rollback command.

## Production addresses

- Application: <https://drinks.phibkro.org>
- GraphQL API: <https://drinks-api.phibkro.org>
