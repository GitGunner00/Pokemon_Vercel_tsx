import { pgTable, text, serial, decimal, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import type { z } from "zod"

export const pokemonCards = pgTable("pokemon_cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  set: text("set").notNull(),
  number: text("number"),
  rarity: text("rarity").notNull(),
  condition: text("condition").notNull(),
  value: decimal("value", { precision: 10, scale: 2 }).default("0.00"),
  notes: text("notes"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const insertPokemonCardSchema = createInsertSchema(pokemonCards).omit({
  id: true,
  createdAt: true,
})

export type InsertPokemonCard = z.infer<typeof insertPokemonCardSchema>
export type PokemonCard = typeof pokemonCards.$inferSelect

export const pokemonSets = [
  { value: "base-set", label: "Base Set" },
  { value: "jungle", label: "Jungle" },
  { value: "fossil", label: "Fossil" },
  { value: "team-rocket", label: "Team Rocket" },
  { value: "gym-heroes", label: "Gym Heroes" },
  { value: "gym-challenge", label: "Gym Challenge" },
] as const

export const cardRarities = [
  { value: "common", label: "Common" },
  { value: "uncommon", label: "Uncommon" },
  { value: "rare", label: "Rare" },
  { value: "rare-holo", label: "Rare Holo" },
  { value: "ultra-rare", label: "Ultra Rare" },
  { value: "secret-rare", label: "Secret Rare" },
] as const

export const cardConditions = [
  { value: "mint", label: "Mint" },
  { value: "near-mint", label: "Near Mint" },
  { value: "lightly-played", label: "Lightly Played" },
  { value: "moderately-played", label: "Moderately Played" },
  { value: "heavily-played", label: "Heavily Played" },
  { value: "damaged", label: "Damaged" },
] as const
