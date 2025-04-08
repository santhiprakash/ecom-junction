"use client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // We don't need to do anything here since we're initializing with mock data in the store
  // This component is kept for future integration with real authentication

  return <>{children}</>;
}
