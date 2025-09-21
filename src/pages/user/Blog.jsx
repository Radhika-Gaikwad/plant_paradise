import React from "react";
import BlogCard from "../../components/ui/BlogCard";

// Sample blog data
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
    content: `A beginner’s guide to watering, sunlight, and soil tips for succulents.`,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
];

const Blog = () => {
  return (
    <div className="py-12">
      {/* Hero Section Full Width */}
      {posts.length > 0 && (
        <div className="w-full mb-10 flex flex-col md:flex-row bg-white shadow-lg rounded-none overflow-hidden hover:shadow-2xl transition">
          {/* Left Text */}
          <div className="flex-1 p-12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
              {posts[0].title}
            </h2>
            <p className="text-gray-700 whitespace-pre-line text-lg md:text-xl">
              {posts[0].content}
            </p>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

    <div >All Posts </div>

      {/* Full-width green line */}
      <div className="w-full h-1 bg-green-600 mb-6"></div>

      {/* Remaining blogs as BlogCard */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6 px-4">
        {posts.slice(1).map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
