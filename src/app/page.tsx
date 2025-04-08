"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProductList } from "@/components/products/product-list";
import { mockProducts, mockTags, mockCategories } from "@/lib/mock-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X, Plus, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<string>("featured");

  // Filter and sort products based on selected filters
  const filteredProducts = mockProducts.filter((product) => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => product.tags.includes(tag));
    
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => product.categories.includes(category));
    
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTags && matchesCategories && matchesSearch;
  }).sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "featured":
      default:
        // Use rating for featured sorting, defaulting to 0 if rating is undefined
        return (b.rating ?? 0) - (a.rating ?? 0);
    }
  });

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setSortOption("featured");
  };

  const handleTagChange = (tagName: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tagName]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    }
  };

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== categoryName));
    }
  };

  const getSortLabel = (option: string): string => {
    switch (option) {
      case "featured": return "Featured";
      case "latest": return "Latest";
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
      default: return "Sort";
    }
  };

  const isFiltersApplied = selectedTags.length > 0 || selectedCategories.length > 0 || searchQuery || sortOption !== "featured";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Search and filter bar */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 w-full"
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  {getSortLabel(sortOption)}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setSortOption("featured")}
                  className={sortOption === "featured" ? "bg-accent" : ""}
                >
                  Featured
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOption("latest")}
                  className={sortOption === "latest" ? "bg-accent" : ""}
                >
                  Latest
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOption("price-low")}
                  className={sortOption === "price-low" ? "bg-accent" : ""}
                >
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOption("price-high")}
                  className={sortOption === "price-high" ? "bg-accent" : ""}
                >
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Narrow down products by applying filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      {mockCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Tags</h3>
                    <div className="space-y-2">
                      {mockTags.map((tag) => (
                        <div key={tag.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag.id}`}
                            checked={selectedTags.includes(tag.name)}
                            onCheckedChange={(checked) => handleTagChange(tag.name, checked as boolean)}
                          />
                          <label
                            htmlFor={`tag-${tag.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tag.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={clearFilters} disabled={!isFiltersApplied}>
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            
            {isAuthenticated && (
              <Button asChild variant="default" size="sm" className="gap-2">
                <Link href="/products/new">
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Tag filters below search bar */}
        <div className="mb-6 overflow-x-auto flex gap-2 pb-2">
          {mockTags.map((tag) => (
            <Badge 
              key={tag.id} 
              variant={selectedTags.includes(tag.name) ? "default" : "outline"} 
              className="whitespace-nowrap cursor-pointer hover:bg-accent"
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
              {selectedTags.includes(tag.name) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
        
        {/* Applied filters */}
        {isFiltersApplied && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Applied Filters:</span>
            {selectedCategories.map((category) => (
              <Badge 
                key={`cat-${category}`} 
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleCategoryChange(category, false)}
              >
                {category}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            {sortOption !== "featured" && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setSortOption("featured")}
              >
                Sort: {getSortLabel(sortOption)}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {searchQuery && (
              <Badge 
                variant="default"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setSearchQuery("")}
              >
                Search: {searchQuery}
                <X className="h-3 w-3" />
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Trending Products</h1>
          <p className="text-muted-foreground">Discover the best affiliate products curated just for you</p>
        </div>
        
        <ProductList 
          products={filteredProducts}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>
    </MainLayout>
  );
}
