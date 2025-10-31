import React from "react";

const BlogDetailShimmer = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-pulse">
      {/* Back Link */}
      <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>

      {/* Blog Title */}
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-6"></div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full h-64 bg-gray-200 rounded-lg"></div>
        ))}
      </div>

      {/* Blog Content */}
      <div className="space-y-3 mb-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Related Blogs */}
      <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col bg-white p-4 shadow rounded-lg">
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetailShimmer;
