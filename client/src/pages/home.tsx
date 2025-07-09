import { useState } from "react";
import { Zap, Plus, Users, Star, Gem, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "@/components/search-filters";
import { CollectionStats } from "@/components/collection-stats";
import { CardGrid } from "@/components/card-grid";
import { AddCardModal } from "@/components/add-card-modal";
import { CardDetailsModal } from "@/components/card-details-modal";
import { useQuery } from "@tanstack/react-query";
import type { PokemonCard } from "@shared/schema";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSet, setFilterSet] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [filterRarity, setFilterRarity] = useState("");

  const { data: cards = [], isLoading } = useQuery<PokemonCard[]>({
    queryKey: ["/api/pokemon-cards"],
  });

  const filteredCards = cards.filter((card) => {
    const matchesSearch = 
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.set.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.number && card.number.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSet = !filterSet || filterSet === "all-sets" || card.set === filterSet;
    const matchesCondition = !filterCondition || filterCondition === "all-conditions" || card.condition === filterCondition;
    const matchesRarity = !filterRarity || filterRarity === "all-rarities" || card.rarity === filterRarity;

    return matchesSearch && matchesSet && matchesCondition && matchesRarity;
  });

  const totalValue = cards.reduce((sum, card) => sum + parseFloat(card.value || "0"), 0);
  const rareCards = cards.filter((card) => 
    card.rarity === "rare" || card.rarity === "rare-holo" || card.rarity === "ultra-rare" || card.rarity === "secret-rare"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 pokemon-gradient rounded-full flex items-center justify-center">
                <Zap className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PokeTracker</h1>
                <p className="text-sm text-gray-600">Pokemon Card Collection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{cards.length}</span>
                  <span>Cards</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>${totalValue.toFixed(2)}</span>
                  <span>Value</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterSet={filterSet}
          setFilterSet={setFilterSet}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          filterRarity={filterRarity}
          setFilterRarity={setFilterRarity}
        />

        {/* Collection Stats */}
        <CollectionStats
          totalCards={cards.length}
          totalValue={totalValue}
          rareCards={rareCards}
          completeSets={0}
        />

        {/* Card Collection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Collection</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{filteredCards.length}</span>
              <span>of</span>
              <span>{cards.length}</span>
              <span>cards</span>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <CardGrid 
              cards={filteredCards} 
              onCardClick={setSelectedCard}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddCardModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <CardDetailsModal 
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        onEdit={() => {
          // TODO: Implement edit functionality
          setSelectedCard(null);
        }}
      />
    </div>
  );
}
