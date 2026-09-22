// drinks — agent-readable deployment manifest.
//
// AGENT CONTRACT
// ──────────────
// This file is the single source of truth for everything an agent
// (or human) needs to know about deploying, running, or modifying
// the drinks stack:
//
//   • What runs where           → `default` (Alchemy.Stack) below
//   • How to invoke commands    → `meta.<resource>.commands`
//   • What inputs need validation → `meta.<resource>.trust`
//   • Declared resources        → Effect program below
//   • What would change         → `bun run plan`
//
// Adding a service:
//   1. yield* it inside the Effect.gen below.
//   2. Add its agent-affordance entry under `meta`.
//   3. Run `bun run plan`; use `bun run deploy` only with approval.
//
// Trust-boundary discipline:
//   `meta.<resource>.trust.input = "untrusted-public"` means *any*
//   handler reachable from the outside MUST validate via the named
//   library before reading args. Agents generating new endpoints on
//   a public-trust resource should add validation by default.

import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";
const isDevelopment = process.env.ALCHEMY_STAGE === "development";
const state = isDevelopment ? Alchemy.localState() : Cloudflare.state();


export default Alchemy.Stack(
  "drinks",
  {
    providers: Cloudflare.providers(),
    state,
  },
  Effect.gen(function* () {
    // D1 — retain and adopt the existing production database by name.
    const db = yield* Cloudflare.D1.Database("Db", {
      name: "drinks-db",
      migrations: "./server/migrations",
      importFiles: isDevelopment ? ["./server/dev-seed.sql"] : undefined,
    }).pipe(
      Alchemy.RemovalPolicy.retain(),
      Alchemy.AdoptPolicy.adopt(true),
    );

    // GraphQL backend — Apollo on Workers + Drizzle.
    const server = yield* Cloudflare.Worker("Server", {
      name: "drinks-server",
      main: "./server/src/index.ts",
      workersDev: false,
      dev: {
        port: 4000,
        strictPort: true,
      },
      env: { DB: db },
      domain: "drinks-api.phibkro.org",
      compatibility: {
        date: "2026-05-01",
        flags: ["nodejs_compat"],
      },
      observability: {
        enabled: true,
      },
    }).pipe(Alchemy.AdoptPolicy.adopt(true));

    // SPA frontend, built once and served as Worker static assets.
    // StaticSite avoids coupling this existing Vite application to
    // Alchemy's framework plugin release.
    const app = yield* Cloudflare.Website.StaticSite("App", {
      name: "drinks-app",
      cwd: "app",
      command: "bun run build",
      outdir: "dist",
      workersDev: false,
      env: {
        VITE_API_URL: "https://drinks-api.phibkro.org",
      },
      domain: "drinks.phibkro.org",
      assets: {
        notFoundHandling: "single-page-application",
      },
      dev: {
        command: "bun run dev",
        env: {
          NODE_ENV: "development",
          VITE_API_URL: "http://localhost:4000",
        },
        url: "http://localhost:5173",
      },
    });

    return { server, app };
  }),
);

// ── Agent-affordance metadata ──────────────────────────────────────
// Not consumed by Alchemy. Read by agents and humans to learn about
// each resource without scavenging across package.json / wrangler.toml
// / .env.example / CI configs. Keys mirror the logical IDs above.
export const meta = {
  Server: {
    commands: {
      dev: "bun run dev",
      typecheck: "bun run server:typecheck",
      tail: "cd server && bun run tail",
    },
    trust: {
      // GraphQL endpoint at drinks-api.phibkro.org. Any mutation
      // resolver MUST zod-validate args — see addReview / removeReview
      // in server/src/index.ts for the existing pattern.
      input: "untrusted-public",
      validate: "zod",
    },
    runtime: "Cloudflare Workers (apollo-server + as-integrations)",
    backups: {
      // D1 PITR is on by default (30-day retention). Drinks data is
      // uni-project sample content; restore-from-PITR is acceptable.
      d1PointInTime: "30d",
    },
  },
  App: {
    commands: {
      dev: "bun run dev",
      build: "bun run app:build",
      test: "bun run app:test",
      "test:components": "cd app && bun run test-components",
    },
    trust: {
      // SPA — runs in untrusted browsers; treat all client-derived
      // values as inputs to Server (which validates them).
      input: "client",
    },
    runtime: "Cloudflare Workers (static assets, SPA fallback)",
  },
} as const;
