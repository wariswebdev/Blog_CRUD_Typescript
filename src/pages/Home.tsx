// src/pages/Home.tsx

import { Link } from "react-router-dom";

// Landing Page
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-purple-100 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-xl shadow-lg">
        {/* App title */}
        <h1 className="text-4xl font-extrabold text-gray-800">Welcome to FireScribe 🔥</h1>
        <p className="text-gray-600 text-lg">
          A modern blogging platform built with Firebase + TypeScript + Tailwind
        </p>

        {/* Auth Options */}
        <div className="flex flex-col gap-4 pt-4">
          <Link to="/login">
            <button className="w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-full py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
