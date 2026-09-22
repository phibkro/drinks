# Deploy Drinks at the Cloudflare edge

Frozen: yes
Revision: 2026-09-22. The repository uses one Bun workspace lock for the
application, API, and deployment program. The existing D1 database is retained
if its deployment declaration is removed. Local development uses only local
Worker and D1 instances. Production Workers expose only their custom domains.


## Goal

Serve the Drinks application and API from Cloudflare without a home-server dependency.
Preserve the public domains and the existing user journeys.

## Contract

- `drinks.phibkro.org` serves the Vite application as Worker static assets.
- `drinks-api.phibkro.org` serves the Apollo API from a Worker.
- The API uses the existing `drinks-db` D1 database.
- The browser sends API requests only to `drinks-api.phibkro.org`.
- The API accepts requests only from the production application origin.
- Alchemy owns the Worker, asset, domain, and D1 deployment resources.
- Local commands use the `development` stage. Plan and deploy commands use the `production` stage.
- Removing or renaming the deployment declaration must not delete `drinks-db`.
- The application and API Workers disable their `workers.dev` routes.
- `bun run dev` connects the local application to the local API Worker.
- The repository owns its source, build, release, and rollback procedures.
- The homelab removes its Drinks runtime only after production acceptance.

## Constraints

- Do not copy D1 data into the homelab.
- Do not create a local MicroVM.
- Do not deploy from CI in this change.
- Do not change the application behavior or public URLs.
- Do not replace the existing frameworks.

## Acceptance

1. Install dependencies from the committed lock file.
2. Run the application build and server type check.
3. Run the existing application and server checks.
4. With operator approval, bootstrap or upgrade the Alchemy state store if required, then inspect the plan without deploying service resources.
5. Make sure that the plan adopts and retains `drinks-db`.
6. Make sure that local development uses the local API and D1 database.
7. Make sure that preflight requests allow the production origin only on the production API.
8. Make sure that the Worker resources disable their `workers.dev` routes.
9. Transfer the application hostname from Pages to the Worker in a controlled cutover.
10. Make sure that the production site loads and uses the production API.
11. Make sure that a read query reaches the existing D1 data.
12. Make sure that rollback can restore the previous Cloudflare deployment.

Steps 4 and 9 through 12 require operator-approved provider changes.
