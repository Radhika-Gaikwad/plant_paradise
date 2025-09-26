import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/blogService";
import BlogCard from "../../components/ui/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs(); 
        // Backend returns { success, status, data: [ ...blogs ] }
        setBlogs(res.data.data || []);
      } catch (err) {
        console.error("Error fetching blogs", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center py-12">Loading blogs...</p>;
  if (blogs.length === 0) return <p className="text-center py-12">No blogs found.</p>;

  // Hero blog is first blog
  const heroBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="py-12">
      {/* Hero Section */}
      {heroBlog && (
        <div className="w-full mb-10 flex flex-col md:flex-row bg-white shadow-lg rounded-none overflow-hidden hover:shadow-2xl transition">
          {/* Left Text */}
          <div className="flex-1 p-12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
              {heroBlog.title}
            </h2>
            <p className="text-gray-700 whitespace-pre-line text-lg md:text-xl">
              {heroBlog.description || heroBlog.content}
            </p>
          </div>
          {/* Right Image */}
          <div className="flex-1">
            <img
              src={heroBlog.imageUrl}
              alt={heroBlog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* All Posts Section */}
      <div className="w-full h-1 bg-green-600 mb-6"></div>
      <div className="max-w-6xl mx-auto flex flex-col gap-6 px-4">
        {remainingBlogs.map((post) => (
          <BlogCard key={post._id || post.blogId} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
