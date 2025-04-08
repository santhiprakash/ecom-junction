"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { mockCollections, mockProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CollectionCard } from "@/components/collections/collection-card";
import { Input } from "@/components/ui/input";
import { Collection } from "@/types";

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter collections based on search query
  const filteredCollections = mockCollections.filter((collection) => {
    return !searchQuery || 
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get products for each collection
  const getCollectionProducts = (collection: Collection) => {
    return mockProducts.filter(product => 
      collection.products.includes(product.id)
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Collections</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your product collections
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Collection
            </Button>
          </div>

          <div className="w-full max-w-md">
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {filteredCollections.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No collections found</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery 
                  ? "Try a different search term"
                  : "Create your first collection to get started"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  products={getCollectionProducts(collection)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
