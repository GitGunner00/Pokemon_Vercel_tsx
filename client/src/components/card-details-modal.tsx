import { X, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { PokemonCard } from "@shared/schema";

interface CardDetailsModalProps {
  card: PokemonCard | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function CardDetailsModal({ card, isOpen, onClose, onEdit }: CardDetailsModalProps) {
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
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteCard = () => {
    if (card && confirm("Are you sure you want to delete this card?")) {
      deleteCardMutation.mutate(card.id);
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

  if (!card) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-3xl font-bold">{card.name}</DialogTitle>
              <p className="text-lg text-gray-600 mt-1">{card.set.replace("-", " ")}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Image */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl p-6">
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                {card.imageUrl ? (
                  <img 
                    src={card.imageUrl} 
                    alt={`${card.name} card`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎴</div>
                    <div className="text-xl font-semibold text-gray-600">{card.name}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Card Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Card Number</h4>
                <p className="text-lg font-bold text-gray-900">{card.number || "N/A"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Rarity</h4>
                <Badge className={getRarityBadgeColor(card.rarity)}>
                  {card.rarity.replace("-", " ")}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Condition</h4>
                <Badge className={getConditionColor(card.condition)}>
                  {card.condition.replace("-", " ")}
                </Badge>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Estimated Value</h4>
                <p className="text-lg font-bold text-blue-600">${card.value}</p>
              </div>
            </div>
            
            {card.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Collection Notes</h4>
                <p className="text-gray-900">{card.notes}</p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Added to Collection</h4>
              <p className="text-gray-900">
                {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : "Unknown"}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={onEdit}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Card
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteCard}
                disabled={deleteCardMutation.isPending}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleteCardMutation.isPending ? "Deleting..." : "Delete Card"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
