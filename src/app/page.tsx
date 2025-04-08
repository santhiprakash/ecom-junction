"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProductList } from "@/components/products/product-list";
import { ProductFilter } from "@/components/products/product-filter";
import { mockProducts, mockTags, mockCategories } from "@/lib/mock-data";
import { useState } from "react";

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products based on selected filters
  const filteredProducts = mockProducts.filter((product) => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => product.tags.includes(tag));
    
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => product.categories.includes(category));
    
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTags && matchesCategories && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
    setSearchQuery("");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 shrink-0">
            <ProductFilter 
              tags={mockTags} 
              categories={mockCategories} 
              selectedTags={selectedTags}
              selectedCategories={selectedCategories}
              searchQuery={searchQuery}
              onTagsChange={setSelectedTags}
              onCategoriesChange={setSelectedCategories}
              onSearchChange={setSearchQuery}
              onClearFilters={clearFilters}
            />
          </aside>
          
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Trending Products</h1>
              <p className="text-muted-foreground">Discover the best affiliate products curated just for you</p>
            </div>
            
            <ProductList 
              products={filteredProducts}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
