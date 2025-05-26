import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

/**
 * BlogPost component:
 * - Fetches a blog by ID from Firestore
 * - Displays title, image (if available), and content
 */
export default function BlogPost(): JSX.Element {
  const { id } = useParams(); // Get blog ID from route params
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch a blog document by its ID from Firestore
    const fetchBlog = async () => {
      if (!id) return; // Guard clause if ID is missing

      try {
        const ref = doc(db, "blogs", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setBlog(snap.data()); // Store blog data in state
        } else {
          setBlog(null); // Handle case where blog does not exist
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setBlog(null);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchBlog();
  }, [id]);

  // Show loading placeholder
  if (loading) return <p className="p-6">Loading blog...</p>;

  // Show error if blog not found
  if (!blog) return <p className="p-6 text-red-500">Blog not found.</p>;

  // Render blog post
  return (
    <div className="min-h-screen px-6 py-10 bg-white max-w-3xl mx-auto pt-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

      {/* Show cover image if available */}
      {blog.coverImageDataUrl && (
        <img
          src={blog.coverImageDataUrl}
          alt="Cover"
          className="mb-6 w-full max-h-[400px] object-cover rounded"
        />
      )}

      {/* Render blog content */}
      <div className="text-lg text-gray-700 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
}
