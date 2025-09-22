import React from "react";
import { useParams, Link } from "react-router-dom";
import BlogCard from "../../components/ui/BlogCard";

// Sample blog data (same as in Blog.jsx)
const posts = [
  {
    _id: "0",
    title: "Why Plant Paradise is the Best Choice for You",
    content: `At Plant Paradise, we carefully select only the healthiest, most beautiful plants.
Our plants are nurtured with love and delivered fresh to your doorstep.
We provide guidance on plant care and ensure every plant brings joy and greenery to your home or office.
Choose Plant Paradise for quality, service, and a greener life!`,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
  {
    _id: "1",
    title: "Top 10 Indoor Plants for Fresh Air",
    content: `Indoor plants can significantly improve air quality and add a natural aesthetic to your home. 
Here are 10 of the best indoor plants that are easy to care for and great for purifying air: 
1. Spider Plant  
2. Snake Plant  
3. Peace Lily  
...`,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
  {
    _id: "2",
    title: "How to Care for Succulents",
    desc: "A beginner’s guide to watering, sunlight, and soil tips for succulents.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = posts.find((b) => b._id === id);

  if (!blog) return <p className="text-center py-12">Blog not found.</p>;

  // Filter other blogs for "What to Read Next"
  const nextBlogs = posts.filter((b) => b._id !== id);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Back button */}
      <Link
        to="/blogs"
        className="text-green-600 hover:underline mb-6 inline-block"
      >
        ← Back to Blogs
      </Link>

      {/* Blog Content */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
          {blog.title}
        </h1>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[500px] object-cover rounded-lg mb-6"
        />
        <p className="text-gray-700 whitespace-pre-line text-lg md:text-xl">
          {blog.content || blog.desc}
        </p>
      </div>

      {/* What to Read Next */}
      {nextBlogs.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextBlogs.map((b) => (
              <BlogCard key={b._id} post={b} />
            ))}
          </div>

          {/* View All Blogs */}
          <div className="mt-6 md:mt-0 md:w-1/4">
            <Link
              to="/blogs"
              className="text-green-600 font-semibold hover:underline"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
