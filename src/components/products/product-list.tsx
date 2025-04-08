import { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { ProductListItem } from "./product-list-item";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ProductListProps {
  products: Product[];
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

export const ProductList = ({
  products,
  viewMode = "grid",
  onViewModeChange,
}: ProductListProps) => {
  const [currentViewMode, setCurrentViewMode] = useState<"grid" | "list">(viewMode);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setCurrentViewMode(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-sm text-gray-500 mt-2">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex items-center space-x-2">
          <Button
            variant={currentViewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => handleViewModeChange("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={currentViewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => handleViewModeChange("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {currentViewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
