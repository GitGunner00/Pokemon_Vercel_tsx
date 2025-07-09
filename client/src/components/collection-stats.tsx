import { Users, Star, Gem, Flame } from "lucide-react";

interface CollectionStatsProps {
  totalCards: number;
  totalValue: number;
  rareCards: number;
  completeSets: number;
}

export function CollectionStats({ totalCards, totalValue, rareCards, completeSets }: CollectionStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600 w-6 h-6" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Cards</p>
            <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600 w-6 h-6" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Collection Value</p>
            <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Gem className="text-green-600 w-6 h-6" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Rare Cards</p>
            <p className="text-2xl font-bold text-gray-900">{rareCards}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Flame className="text-red-600 w-6 h-6" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Sets Complete</p>
            <p className="text-2xl font-bold text-gray-900">{completeSets}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
