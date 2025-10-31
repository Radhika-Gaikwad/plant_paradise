// src/pages/admin/Blogs.jsx
import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BlogsShimmer } from "../../components/admin/shimmers";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      const arr =
        res.data?.data || res.data?.blogs || (Array.isArray(res.data) ? res.data : []);
      setBlogs(arr);
    } catch (err) {
      console.error("fetchBlogs error:", err.response?.data || err.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(blogId);
      setBlogs((prev) => prev.filter((b) => b.blogId !== blogId && b._id !== blogId));
      alert("Blog deleted successfully.");
    } catch (err) {
      console.error("delete error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete blog");
    }
  };

  if (loading) return <BlogsShimmer/>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ---------- Header ---------- */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Manage Blogs
          </h1>
          <p className="text-gray-500 mt-2">
            Add, edit, and manage your blogs from here.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/blogs/add")}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl shadow-lg font-medium transform hover:scale-105 transition"
        >
          + Add Blog
        </button>
      </div>

      {/* ---------- Blogs Table ---------- */}
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">SN</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}

            {blogs.map((blog, i) => (
              <tr key={blog.blogId || blog._id} className="text-center">
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.category}</td>
                {/*<td className="border px-4 py-2">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-24 h-24 object-cover mx-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>*/}
                <td className="border px-4 py-2">
  {blog.imageUrls && blog.imageUrls.length > 0 ? (
    <div className="flex flex-wrap justify-center gap-2">
      {blog.imageUrls.slice(0, 3).map((url, idx) => ( // show max 3 images
        <img
          key={idx}
          src={url}
          alt={`blog-${idx}`}
          className="w-16 h-16 object-cover rounded-md border"
        />
      ))}
      {blog.imageUrls.length > 3 && (
        <span className="text-sm text-gray-500">
          +{blog.imageUrls.length - 3} more
        </span>
      )}
    </div>
  ) : (
    <span className="text-gray-400 italic">No Images</span>
  )}
</td>

                <td className="border px-4 py-2">
                  <FaEdit
                    onClick={() =>
                      navigate(`/admin/blogs/edit/${blog.blogId || blog._id}`)
                    }
                    className="inline text-blue-600 hover:text-blue-800 cursor-pointer mr-2"
                    title="Edit"
                  />
                  <FaTrash
                    onClick={() => handleDelete(blog.blogId || blog._id)}
                    className="inline text-red-600 hover:text-red-800 cursor-pointer"
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
