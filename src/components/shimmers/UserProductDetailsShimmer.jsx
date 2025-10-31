// src/components/ui/shimmers/UserProductDetailsShimmer.jsx
import React from "react";
import ShimmerStyles from "./ShimmerStyles";

const UserProductDetailsShimmer = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <ShimmerStyles />
      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col items-center p-6 bg-gray-50">
          <div className="w-full h-96 flex justify-center items-center bg-white rounded-xl shadow-md overflow-hidden">
            <div className="shimmer w-full h-full" />
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="w-20 h-20 border-2 rounded-lg overflow-hidden shimmer"
              />
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="shimmer h-10 w-3/4 rounded" />
          <div className="shimmer h-4 w-1/4 rounded" />
          <div className="shimmer h-6 w-1/2 rounded" />

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="shimmer w-8 h-8 rounded" />
            ))}
          </div>

          <div className="shimmer h-24 w-full rounded" />

          <div className="flex gap-4 mt-6">
            <div className="shimmer h-12 flex-1 rounded-lg" />
            <div className="shimmer h-12 flex-1 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetailsShimmer;
