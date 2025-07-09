import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertPokemonCardSchema, pokemonSets, cardRarities, cardConditions } from "@shared/schema";
import type { InsertPokemonCard } from "@shared/schema";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<InsertPokemonCard>({
    resolver: zodResolver(insertPokemonCardSchema),
    defaultValues: {
      name: "",
      set: "",
      number: "",
      rarity: "",
      condition: "",
      value: "0.00",
      notes: "",
      imageUrl: "",
    },
  });

  const addCardMutation = useMutation({
    mutationFn: async (cardData: InsertPokemonCard) => {
      await apiRequest("POST", "/api/pokemon-cards", cardData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pokemon-cards"] });
      toast({
        title: "Card added",
        description: "Pokemon card has been added to your collection.",
      });
      form.reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPokemonCard) => {
    addCardMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Pokemon Card</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Image Upload */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Image URL</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            {...field}
                            placeholder="https://example.com/card-image.jpg"
                          />
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Enter image URL above</p>
                            <p className="text-xs text-gray-500 mt-1">or upload to an image hosting service</p>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Card Details */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pokemon Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Charizard" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="set"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Set *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Set" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pokemonSets.map((set) => (
                            <SelectItem key={set.value} value={set.value}>
                              {set.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 4/102" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="rarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rarity *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Rarity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cardRarities.map((rarity) => (
                          <SelectItem key={rarity.value} value={rarity.value}>
                            {rarity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cardConditions.map((condition) => (
                          <SelectItem key={condition.value} value={condition.value}>
                            {condition.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Value</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input {...field} type="number" step="0.01" className="pl-8" placeholder="0.00" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} placeholder="Any additional notes about this card..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600"
                disabled={addCardMutation.isPending}
              >
                {addCardMutation.isPending ? "Adding..." : "Add Card"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
