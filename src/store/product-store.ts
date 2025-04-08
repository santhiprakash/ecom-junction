import { create } from 'zustand';
import { Product } from '@/types';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedTags: string[];
  selectedCategories: string[];
  searchQuery: string;
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setSelectedTags: (tags: string[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setLoading: (isLoading: boolean) => void;
  
  // Filter functions
  filterProducts: () => void;
  clearFilters: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedTags: [],
  selectedCategories: [],
  searchQuery: '',
  viewMode: 'grid',
  isLoading: false,
  
  setProducts: (products) => {
    set({ products, filteredProducts: products });
  },
  
  setFilteredProducts: (filteredProducts) => {
    set({ filteredProducts });
  },
  
  setSelectedTags: (selectedTags) => {
    set({ selectedTags });
    get().filterProducts();
  },
  
  setSelectedCategories: (selectedCategories) => {
    set({ selectedCategories });
    get().filterProducts();
  },
  
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    get().filterProducts();
  },
  
  setViewMode: (viewMode) => {
    set({ viewMode });
  },
  
  setLoading: (isLoading) => {
    set({ isLoading });
  },
  
  filterProducts: () => {
    const { products, selectedTags, selectedCategories, searchQuery } = get();
    
    let filtered = [...products];
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product => 
        product.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        product.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    set({ filteredProducts: filtered });
  },
  
  clearFilters: () => {
    set({ 
      selectedTags: [], 
      selectedCategories: [], 
      searchQuery: '',
      filteredProducts: get().products
    });
  },
}));
