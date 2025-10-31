import React from "react";

const BlogShimmer = () => {
  return (
    <div className="pt-0 pb-12 animate-pulse">
      {/* Hero Section */}
      <div className="w-full mb-10 flex flex-col md:flex-row bg-white shadow-lg rounded-none overflow-hidden">
        {/* Left Text */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative">
          <div className="w-full h-80 md:h-full bg-gray-200"></div>
          <div className="absolute top-3 right-3 h-6 w-24 bg-green-200 rounded-full"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-1 bg-green-100 mb-6"></div>

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6 px-4">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4"
          >
            <div className="w-full md:w-56 h-40 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogShimmer;
