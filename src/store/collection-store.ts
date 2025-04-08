import { create } from 'zustand';
import { Collection } from '@/types';

interface CollectionState {
  collections: Collection[];
  selectedCollection: Collection | null;
  isLoading: boolean;
  
  // Actions
  setCollections: (collections: Collection[]) => void;
  setSelectedCollection: (collection: Collection | null) => void;
  addCollection: (collection: Collection) => void;
  updateCollection: (updatedCollection: Collection) => void;
  removeCollection: (collectionId: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  selectedCollection: null,
  isLoading: false,
  
  setCollections: (collections) => {
    set({ collections });
  },
  
  setSelectedCollection: (selectedCollection) => {
    set({ selectedCollection });
  },
  
  addCollection: (collection) => {
    set({ collections: [...get().collections, collection] });
  },
  
  updateCollection: (updatedCollection) => {
    set({
      collections: get().collections.map(collection => 
        collection.id === updatedCollection.id ? updatedCollection : collection
      ),
      selectedCollection: get().selectedCollection?.id === updatedCollection.id 
        ? updatedCollection 
        : get().selectedCollection
    });
  },
  
  removeCollection: (collectionId) => {
    set({
      collections: get().collections.filter(collection => collection.id !== collectionId),
      selectedCollection: get().selectedCollection?.id === collectionId 
        ? null 
        : get().selectedCollection
    });
  },
  
  setLoading: (isLoading) => {
    set({ isLoading });
  },
}));
