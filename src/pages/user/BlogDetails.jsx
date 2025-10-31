import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BlogCard from "../../components/ui/BlogCard";
import { getAllBlogs } from "../../services/blogService";
import { BlogDetailShimmer } from "../../components/shimmers";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        const blogs = res.data.data || [];
        setAllBlogs(blogs);

        const found = blogs.find((b) => b._id === id || b.blogId === id);
        setBlog(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [id]);

  if (loading) return <BlogDetailShimmer/>;
  if (!blog) return <p className="text-center py-12">Blog not found.</p>;

  const nextBlogs = allBlogs.filter((b) => b._id !== blog._id && b.blogId !== blog.blogId);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <Link to="/blogs" className="text-green-600 hover:underline mb-6 inline-block">
        ← Back to Blogs
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
          {blog.title}
        </h1>
        
        {/* ✅ Additional Images (if multiple) */}
        {blog.imageUrls && blog.imageUrls.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {blog.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`blog-${index}`}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
        )}

        <p className="text-gray-700 whitespace-pre-line text-lg md:text-xl">
          {blog.description || blog.content}
        </p>
      </div>

      {/*{nextBlogs.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {nextBlogs.map((b) => (
              <BlogCard key={b._id || b.blogId} post={b} />
            ))}
          </div>*/}
        {nextBlogs.length > 0 && (
  <div className="mb-12 relative">
    <div className="flex justify-between items-center mb-6">
      <Link to="/blogs" className="text-green-600 font-semibold hover:underline">
        View All Blogs
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
  {nextBlogs.map((b) => (
    <div
      key={b._id || b.blogId}
      className="flex flex-col h-full"
    >
      <div className="flex-1 flex">
        <BlogCard post={b} wordLimit={25} />
      </div>
    </div>
    ))}
    </div>
    </div>
   )}
</div>
  );
};

export default BlogDetail;
