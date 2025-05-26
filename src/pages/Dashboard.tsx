import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
}

export default function Dashboard(): JSX.Element {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Blog List</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="block bg-white p-4 rounded shadow hover:bg-purple-50 transition border border-gray-200"
          >
            <h2 className="text-xl text-purple-700 font-medium">{blog.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
