import * as Sentry from "@sentry/react";

// Sentry init — gracefully no-ops when VITE_SENTRY_DSN is unset so
// this can be imported unconditionally from main.tsx. When operator
// provisions a Sentry project + sets the env var at build time,
// Vite bakes the DSN into the bundle and reporting starts. SDK
// adds ~47KB gzipped to the production bundle.

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

if (dsn) {
  Sentry.init({
    dsn,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.1,
  });
}

export {};
