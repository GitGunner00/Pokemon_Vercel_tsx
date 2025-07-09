import { defineConfig } from "drizzle-kit"
import type { Config } from "drizzle-kit"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned")
}

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/schema.ts",
  dialect: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
}) satisfies Config
