import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { pokemonCards, type InsertPokemonCard, type PokemonCard } from "../lib/schema"
import { eq } from "drizzle-orm"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool)

export const storage = {
  async getPokemonCards(): Promise<PokemonCard[]> {
    return await db.select().from(pokemonCards).orderBy(pokemonCards.createdAt)
  },

  async getPokemonCard(id: number): Promise<PokemonCard | undefined> {
    const result = await db.select().from(pokemonCards).where(eq(pokemonCards.id, id))
    return result[0]
  },

  async createPokemonCard(data: InsertPokemonCard): Promise<PokemonCard> {
    const result = await db.insert(pokemonCards).values(data).returning()
    return result[0]
  },

  async updatePokemonCard(id: number, data: Partial<InsertPokemonCard>): Promise<PokemonCard | undefined> {
    const result = await db.update(pokemonCards).set(data).where(eq(pokemonCards.id, id)).returning()
    return result[0]
  },

  async deletePokemonCard(id: number): Promise<boolean> {
    const result = await db.delete(pokemonCards).where(eq(pokemonCards.id, id)).returning()
    return result.length > 0
  },
}
