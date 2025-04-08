"use client";

// This is a placeholder file for future Supabase integration
// Currently we're using mock data for development

export const createClient = () => {
  // Mock client implementation
  return {
    auth: {
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
};
