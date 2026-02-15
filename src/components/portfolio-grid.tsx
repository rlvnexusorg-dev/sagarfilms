
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categorizePortfolioItem } from "@/ai/flows/portfolio-categorization-assistant-flow";
import { Loader2, Sparkles } from "lucide-react";

type PortfolioItem = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  categories?: string[];
};

export function PortfolioGrid({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [filter, setFilter] = useState("All");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const categories = ["All", "Wedding", "Pre-wedding", "Haldi", "Ceremony", "Birthday", "Other"];

  const handleCategorize = async (item: PortfolioItem) => {
    setLoadingId(item.id);
    try {
      // In a real scenario, we'd pass the photoDataUri if we had it, 
      // but for this demo, we'll use the description for AI categorization.
      const result = await categorizePortfolioItem({
        description: item.description,
      });
      
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, categories: result.categories } : i));
    } catch (error) {
      console.error("AI categorization failed:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const filteredItems = filter === "All" 
    ? items 
    : items.filter(item => item.categories?.includes(filter));

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            onClick={() => setFilter(cat)}
            className={filter === cat ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/10">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.description}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={item.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-primary-foreground font-medium mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.categories?.map((cat) => (
                    <Badge key={cat} variant="secondary" className="bg-accent text-accent-foreground border-none">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center bg-card">
              <span className="text-sm font-medium text-primary/70">{item.description}</span>
              {!item.categories && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCategorize(item)}
                  disabled={loadingId === item.id}
                  className="text-accent hover:text-accent hover:bg-accent/10"
                >
                  {loadingId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <><Sparkles className="h-4 w-4 mr-2" /> AI Tag</>
                  )}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No entries found for this category.
        </div>
      )}
    </div>
  );
}
