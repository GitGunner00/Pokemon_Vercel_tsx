import { pokemonCards, type PokemonCard, type InsertPokemonCard } from "@shared/schema";

export interface IStorage {
  getPokemonCards(): Promise<PokemonCard[]>;
  getPokemonCard(id: number): Promise<PokemonCard | undefined>;
  createPokemonCard(card: InsertPokemonCard): Promise<PokemonCard>;
  updatePokemonCard(id: number, card: Partial<InsertPokemonCard>): Promise<PokemonCard | undefined>;
  deletePokemonCard(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private cards: Map<number, PokemonCard>;
  private currentId: number;

  constructor() {
    this.cards = new Map();
    this.currentId = 1;
  }

  async getPokemonCards(): Promise<PokemonCard[]> {
    return Array.from(this.cards.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getPokemonCard(id: number): Promise<PokemonCard | undefined> {
    return this.cards.get(id);
  }

  async createPokemonCard(insertCard: InsertPokemonCard): Promise<PokemonCard> {
    const id = this.currentId++;
    const card: PokemonCard = {
      id,
      name: insertCard.name,
      set: insertCard.set,
      rarity: insertCard.rarity,
      condition: insertCard.condition,
      number: insertCard.number || null,
      value: insertCard.value || null,
      notes: insertCard.notes || null,
      imageUrl: insertCard.imageUrl || null,
      createdAt: new Date(),
    };
    this.cards.set(id, card);
    return card;
  }

  async updatePokemonCard(id: number, updateData: Partial<InsertPokemonCard>): Promise<PokemonCard | undefined> {
    const existingCard = this.cards.get(id);
    if (!existingCard) {
      return undefined;
    }

    const updatedCard: PokemonCard = {
      ...existingCard,
      ...updateData,
    };
    this.cards.set(id, updatedCard);
    return updatedCard;
  }

  async deletePokemonCard(id: number): Promise<boolean> {
    return this.cards.delete(id);
  }
}

export const storage = new MemStorage();
