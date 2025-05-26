// src/contexts/AuthContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../utils/firebase";

// Auth context shape
interface AuthContextProps {
  user: User | null;
}

// Create context
const AuthContext = createContext<AuthContextProps>({ user: null });

// Access context from any component
export const useAuth = () => useContext(AuthContext);

// Provide auth state to app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  // Provide user state to children
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
