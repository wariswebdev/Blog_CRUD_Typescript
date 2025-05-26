// src/routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Blocks access to routes if not authenticated
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  // Redirect to login if not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Render 
  return children;
}
