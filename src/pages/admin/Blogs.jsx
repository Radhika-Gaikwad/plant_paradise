/*mport React from "react";

const Blogs = () => {
  const blogs = [
    { id: 1, title: "How to Care for Indoor Plants", author: "Admin" },
    { id: 2, title: "Best Plants for Air Purification", author: "Admin" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Blogs</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Blog
      </button>
      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td className="border p-2">{blog.id}</td>
              <td className="border p-2">{blog.title}</td>
              <td className="border p-2">{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Load blogs from localStorage
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  // Delete blog
  const handleDelete = (id) => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Top Card */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-green-700">Manage Blogs</h1>
        <Link
          to="/admin/blogs/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Blog
        </Link>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-100">
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Content</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                <td className="border border-gray-300 px-4 py-2 line-clamp-2">
                  {blog.content}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-20 h-20 object-cover mx-auto rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-gray-500 py-4">
                  No blogs added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
