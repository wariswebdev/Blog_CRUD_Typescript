// src/components/Navbar.tsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

// Top navigation bar with auth-aware links
export default function Navbar(): JSX.Element {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link to="/home" className="text-xl font-bold text-purple-700">
        FireScribe 🔥
      </Link>

      {/* Auth-aware navigation links */}
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/home" className="text-gray-700 hover:text-purple-600">Dashboard</Link>
            <Link to="/create" className="text-gray-700 hover:text-purple-600">Create</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
            <Link to="/signup" className="text-gray-700 hover:text-purple-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
