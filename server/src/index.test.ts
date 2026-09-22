import { describe, expect, test } from "bun:test";

import worker from "./index.ts";

const context = {} as ExecutionContext;
const env = {} as never;

describe("Drinks Worker preflight", () => {
	test("allows the production application origin", async () => {
		const response = await worker.fetch(
			new Request("https://drinks-api.phibkro.org", {
				method: "OPTIONS",
				headers: { Origin: "https://drinks.phibkro.org" },
			}),
			env,
			context,
		);

		expect(response.status).toBe(204);
		expect(response.headers.get("access-control-allow-origin")).toBe(
			"https://drinks.phibkro.org",
		);
		expect(response.headers.get("vary")).toBe("Origin");
	});

	test("rejects a local origin on the production API", async () => {
		const response = await worker.fetch(
			new Request("https://drinks-api.phibkro.org", {
				method: "OPTIONS",
				headers: { Origin: "http://localhost:5173" },
			}),
			env,
			context,
		);

		expect(response.status).toBe(403);
		expect(response.headers.has("access-control-allow-origin")).toBe(false);
	});

	test("allows the local application on the local API", async () => {
		const response = await worker.fetch(
			new Request("http://localhost:8787", {
				method: "OPTIONS",
				headers: { Origin: "http://localhost:5173" },
			}),
			env,
			context,
		);

		expect(response.status).toBe(204);
		expect(response.headers.get("access-control-allow-origin")).toBe(
			"http://localhost:5173",
		);
	});

	test("rejects an untrusted browser origin", async () => {
		const response = await worker.fetch(
			new Request("https://drinks-api.phibkro.org", {
				method: "OPTIONS",
				headers: { Origin: "https://example.test" },
			}),
			env,
			context,
		);

		expect(response.status).toBe(403);
		expect(response.headers.has("access-control-allow-origin")).toBe(false);
	});
});
