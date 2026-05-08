import * as Sentry from "@sentry/bun";

// Sentry init — gracefully no-ops when SENTRY_DSN is unset so this
// module can be imported unconditionally from the entry point.
// When operator provisions a Sentry project + sets SENTRY_DSN at
// runtime, the SDK initializes and starts reporting.

const dsn = process.env.SENTRY_DSN;

if (dsn) {
	Sentry.init({
		dsn,
		environment: process.env.NODE_ENV ?? "production",
		// 10% sample rate keeps free-tier event budget comfortable.
		tracesSampleRate: 0.1,
	});
}
