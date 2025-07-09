import { Search, Grid3X3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { pokemonSets, cardRarities, cardConditions } from "@shared/schema";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterSet: string;
  setFilterSet: (set: string) => void;
  filterCondition: string;
  setFilterCondition: (condition: string) => void;
  filterRarity: string;
  setFilterRarity: (rarity: string) => void;
}

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  filterSet,
  setFilterSet,
  filterCondition,
  setFilterCondition,
  filterRarity,
  setFilterRarity,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search cards by name, set, or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3">
          <Select value={filterSet} onValueChange={setFilterSet}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Sets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sets">All Sets</SelectItem>
              {pokemonSets.map((set) => (
                <SelectItem key={set.value} value={set.value}>
                  {set.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterCondition} onValueChange={setFilterCondition}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-conditions">All Conditions</SelectItem>
              {cardConditions.map((condition) => (
                <SelectItem key={condition.value} value={condition.value}>
                  {condition.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterRarity} onValueChange={setFilterRarity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Rarities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-rarities">All Rarities</SelectItem>
              {cardRarities.map((rarity) => (
                <SelectItem key={rarity.value} value={rarity.value}>
                  {rarity.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
