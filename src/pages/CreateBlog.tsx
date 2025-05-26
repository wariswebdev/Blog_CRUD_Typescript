// src/pages/CreateBlog.tsx

import { useState } from "react";
import { db } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Page for creating a new blog post
export default function CreateBlog(): JSX.Element {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle blog form submit
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageDataUrl = "";

      // Convert image file to base64
      if (imageFile) {
        imageDataUrl = await convertToBase64(imageFile);
      }

      // Save blog to Firestore
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        coverImageDataUrl: imageDataUrl || null,
        authorId: user?.uid,
        createdAt: serverTimestamp(),
      });

      navigate("/home");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert image file to base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">✍️ Create New Blog</h2>

        {/* Blog form */}
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <textarea
            placeholder="Your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-purple-400 outline-none"
          />

          {/* Optional cover image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Creating..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
