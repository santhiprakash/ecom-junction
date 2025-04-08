import { useState } from "react";
import { Tag, Category } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ProductFilterProps {
  tags: Tag[];
  categories: Category[];
  selectedTags: string[];
  selectedCategories: string[];
  searchQuery: string;
  onTagsChange: (tags: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export const ProductFilter = ({
  tags,
  categories,
  selectedTags,
  selectedCategories,
  searchQuery,
  onTagsChange,
  onCategoriesChange,
  onSearchChange,
  onClearFilters,
}: ProductFilterProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleTagChange = (tagName: string, checked: boolean) => {
    if (checked) {
      onTagsChange([...selectedTags, tagName]);
    } else {
      onTagsChange(selectedTags.filter((tag) => tag !== tagName));
    }
  };

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, categoryName]);
    } else {
      onCategoriesChange(selectedCategories.filter((category) => category !== categoryName));
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearchQuery);
  };

  const isFiltersApplied = selectedTags.length > 0 || selectedCategories.length > 0 || searchQuery;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filter by Tags:</h3>
        <div className="space-y-2">
          {tags.map((tag) => (
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

      <div>
        <h3 className="text-lg font-medium mb-4">Filter by Categories:</h3>
        <div className="space-y-2">
          {categories.map((category) => (
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
        <h3 className="text-lg font-medium mb-4">Search Products:</h3>
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {isFiltersApplied && (
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={onClearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};
