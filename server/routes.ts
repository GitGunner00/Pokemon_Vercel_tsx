import type { Express } from "express"
import { createServer, type Server } from "http"
import { storage } from "./storage"
import { insertPokemonCardSchema } from "../lib/schema"
import { z } from "zod"

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all Pokemon cards
  app.get("/api/pokemon-cards", async (req, res) => {
    try {
      const cards = await storage.getPokemonCards()
      res.json(cards)
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Pokemon cards" })
    }
  })

  // Get a specific Pokemon card
  app.get("/api/pokemon-cards/:id", async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid card ID" })
      }

      const card = await storage.getPokemonCard(id)
      if (!card) {
        return res.status(404).json({ message: "Pokemon card not found" })
      }

      res.json(card)
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Pokemon card" })
    }
  })

  // Create a new Pokemon card
  app.post("/api/pokemon-cards", async (req, res) => {
    try {
      const cardData = insertPokemonCardSchema.parse(req.body)
      const newCard = await storage.createPokemonCard(cardData)
      res.status(201).json(newCard)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid card data", errors: error.errors })
      }
      res.status(500).json({ message: "Failed to create Pokemon card" })
    }
  })

  // Update a Pokemon card
  app.put("/api/pokemon-cards/:id", async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid card ID" })
      }

      const updateData = insertPokemonCardSchema.partial().parse(req.body)
      const updatedCard = await storage.updatePokemonCard(id, updateData)

      if (!updatedCard) {
        return res.status(404).json({ message: "Pokemon card not found" })
      }

      res.json(updatedCard)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid card data", errors: error.errors })
      }
      res.status(500).json({ message: "Failed to update Pokemon card" })
    }
  })

  // Delete a Pokemon card
  app.delete("/api/pokemon-cards/:id", async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid card ID" })
      }

      const deleted = await storage.deletePokemonCard(id)
      if (!deleted) {
        return res.status(404).json({ message: "Pokemon card not found" })
      }

      res.json({ message: "Pokemon card deleted successfully" })
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Pokemon card" })
    }
  })

  const httpServer = createServer(app)
  return httpServer
}
