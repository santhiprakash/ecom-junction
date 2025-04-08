"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { mockUser } from "@/lib/mock-data";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();

  // We don't need to do anything here since we're initializing with mock data in the store
  // This component is kept for future integration with real authentication

  return <>{children}</>;
}
