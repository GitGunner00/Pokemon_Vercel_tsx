import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { PokemonCard } from "@shared/schema";

interface CardGridProps {
  cards: PokemonCard[];
  onCardClick: (card: PokemonCard) => void;
}

export function CardGrid({ cards, onCardClick }: CardGridProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId: number) => {
      await apiRequest("DELETE", `/api/pokemon-cards/${cardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pokemon-cards"] });
      toast({
        title: "Card deleted",
        description: "Pokemon card has been removed from your collection.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteCard = (e: React.MouseEvent, cardId: number) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCardMutation.mutate(cardId);
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "uncommon":
        return "bg-green-100 text-green-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "rare-holo":
        return "bg-purple-100 text-purple-800";
      case "ultra-rare":
        return "bg-orange-100 text-orange-800";
      case "secret-rare":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "mint":
        return "bg-green-100 text-green-800";
      case "near-mint":
        return "bg-blue-100 text-blue-800";
      case "lightly-played":
        return "bg-yellow-100 text-yellow-800";
      case "moderately-played":
        return "bg-orange-100 text-orange-800";
      case "heavily-played":
        return "bg-red-100 text-red-800";
      case "damaged":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No cards found</div>
        <p className="text-gray-400">Add your first Pokemon card to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer card-hover"
          onClick={() => onCardClick(card)}
        >
          <div className="p-4">
            {/* Card Image */}
            <div className="relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-yellow-100">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                {card.imageUrl ? (
                  <img 
                    src={card.imageUrl} 
                    alt={`${card.name} card`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎴</div>
                    <div className="text-sm font-medium">{card.name}</div>
                  </div>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getRarityBadgeColor(card.rarity)}>
                  {card.rarity.replace("-", " ")}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 truncate">{card.name}</h3>
                <span className="text-sm text-gray-500">{card.number}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 truncate">{card.set}</span>
                <span className="font-semibold text-blue-600">${card.value}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <Badge className={getConditionColor(card.condition)}>
                  {card.condition.replace("-", " ")}
                </Badge>
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement edit functionality
                    }}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                    onClick={(e) => handleDeleteCard(e, card.id)}
                    disabled={deleteCardMutation.isPending}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
