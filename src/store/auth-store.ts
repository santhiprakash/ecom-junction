import { create } from 'zustand';
import { User, UserRole } from '@/types';
import { mockUser } from '@/lib/mock-data';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initialize with mock user for development
  user: mockUser,
  isLoading: false,
  isAuthenticated: true, // Set to true for development
  
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    isLoading: false 
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  login: async (email, password) => {
    // Mock login implementation
    set({ isLoading: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    set({ 
      user: mockUser, 
      isAuthenticated: true,
      isLoading: false 
    });
  },
  
  register: async (email, password, name) => {
    // Mock registration implementation
    set({ isLoading: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful registration
    const newUser: User = {
      ...mockUser,
      email,
      name,
    };
    
    set({ 
      user: newUser, 
      isAuthenticated: true,
      isLoading: false 
    });
  },
  
  logout: () => {
    // Mock logout implementation
    set({ 
      user: null, 
      isAuthenticated: false,
      isLoading: false 
    });
  },
}));
