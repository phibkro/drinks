import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema.ts";

// Workers D1 binding. Per-request construction (no module-level
// state) since Workers re-instantiates the module per fetch and
// `env` only exists inside the handler.
export function getDb(d1: D1Database) {
	return drizzle(d1, { schema });
}

export { schema };
