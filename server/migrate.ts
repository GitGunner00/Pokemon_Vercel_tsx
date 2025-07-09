import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

const connection = postgres(process.env.DATABASE_URL, { max: 1 })
const db = drizzle(connection)

async function main() {
  console.log("Running migrations...")
  await migrate(db, { migrationsFolder: "./migrations" })
  console.log("Migrations completed!")
  await connection.end()
}

main().catch((error) => {
  console.error("Migration failed:", error)
  process.exit(1)
})
