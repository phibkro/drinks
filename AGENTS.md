<!-- generated-by: foundry@v1 -->

# AGENTS.md — project contract

Generated boilerplate from `homelab/foundry/profile-v1` (single source:
homelab/docs/PROJECTS.md, "Project conventions contract"). Hand edits here are
flagged as drift by `conventions-check`; record real divergences in
`.conventions-exceptions` instead.

## Contract

- **Mission state:** `STATE.md` is the single mission-state file. It declares a
  lifecycle — `idea | spec | spec-frozen | build | park | archive` — plus
  Now / Next / Blocked. Agents read it first; keep it current.
- **Agent doc:** this file is THE agent doc. Where a harness wants CLAUDE.md,
  it is a symlink to AGENTS.md. Never a second prose copy.
- **Specs:** design work lives in `docs/specs/`. Lifecycle ≥ spec requires
  that directory to exist.
- **Lifecycle gates:** idea → spec → spec-frozen → build → park → archive, one
  executable gate per transition (defined in the conventions contract).
  spec-frozen additionally requires `Frozen: yes` in STATE.md.
- **Checks:** `just check` is the repository's declared verification gate.
  `just conventions-check` detects convention drift. The project-specific section
  names the exact tools. Both gates must pass before merge.

## PROJECT-SPECIFIC (replace this section)

- Runtime and package manager: Bun workspace with `app/`, `server/`, and an Alchemy v2 deployment program at the repository root.
- Verification: `just check` runs the repository gate. Frontend Cypress suites are separate `bun run app:test` journeys and are not implied by the root gate.
- Deployment: `bun run plan` and `bun run deploy` target Cloudflare production and require operator approval. CI checks; it does not deploy.
- Data: `drinks-db` is the retained production D1 database. Never replace it or apply generated local seed SQL to production.
- Public contract: `drinks.phibkro.org` calls `drinks-api.phibkro.org`. The homelab does not build, route, or serve this application.
