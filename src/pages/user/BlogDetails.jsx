import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BlogCard from "../../components/ui/BlogCard";
import { getAllBlogs } from "../../services/blogService";

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

  if (loading) return <p className="text-center py-12">Loading blog...</p>;
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
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-[500px] object-cover rounded-lg mb-6"
        />
        <p className="text-gray-700 whitespace-pre-line text-lg md:text-xl">
          {blog.description || blog.content}
        </p>
      </div>

      {nextBlogs.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextBlogs.map((b) => (
              <BlogCard key={b._id || b.blogId} post={b} />
            ))}
          </div>

          <div className="mt-6 md:mt-0 md:w-1/4">
            <Link to="/blogs" className="text-green-600 font-semibold hover:underline">
              View All Blogs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
