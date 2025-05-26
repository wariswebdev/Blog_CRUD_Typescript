// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import CreateBlog from "./pages/CreateBlog";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import BlogPost from "./pages/BlogPost";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Pages (Navbar shown only here) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Layout>
                <Dashboard />
              </Layout>
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <CreateBlog />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog/:id"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <BlogPost />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
