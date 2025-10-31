import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/blogService";
import BlogCard from "../../components/ui/BlogCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BlogShimmer } from "../../components/shimmers";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

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

  if (loading) return <BlogShimmer/>;
  if (blogs.length === 0) return <p className="text-center py-12">No blogs found.</p>;

  // Hero blog is first blog
  const heroBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="pt-0 pb-12">
      {/* Hero Section */}
      {heroBlog && (
         <motion.div
          className="w-full mb-10 flex flex-col md:flex-row bg-white shadow-lg rounded-none overflow-hidden hover:shadow-2xl transition relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
        {/*<div className="w-full mb-10 flex flex-col md:flex-row bg-white shadow-lg rounded-none overflow-hidden hover:shadow-2xl transition">*/}
          {/* Left Text */}
          <div className="flex-1 p-12 flex flex-col justify-center z-10 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
              {heroBlog.title}
            </h2>
            <p className="text-gray-700 whitespace-pre-line text-lg md:text-xl mb-4">
              {heroBlog.description || heroBlog.content}
            </p>

            <Link
             to={`/blogs/${heroBlog._id || heroBlog.blogId}`}
             className="mt-2 text-green-600 hover:underline cursor-pointer text-lg font-medium"
            >
             Read more →
            </Link>
          </div>

          {/* Right Main Image */}
          <div className="flex-1 relative z-0">
            <img
              src={heroBlog.imageUrls?.[0] || heroBlog.imageUrl}
              alt={heroBlog.title}
              className="w-full h-full object-cover"
            />
              {/* Animated "Newly Added" Tag */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
              className="absolute top-3 right-3 z-30 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-md"
            >
              🌿 Newly Added
            </motion.div>
          </div>
        </motion.div>
      )}

     {/* All Posts Section */}
     <div className="w-full h-1 bg-green-600 mb-6"></div>
     <div className="max-w-6xl mx-auto flex flex-col gap-6 px-4">
      {remainingBlogs.map((post) => (
      <BlogCard key={post._id || post.blogId} post={post} wordLimit={400} />
     ))}
    </div>
    </div>
  );
};

export default Blog;
