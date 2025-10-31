// src/components/ui/shimmers/ProductDetailsShimmer.jsx
import React from "react";
import ShimmerStyles from "./ShimmerStyles";

const ProductDetailsShimmer = () => {
  return (
    <div className="p-3 mt-5 md:w-[90%] lg:mx-auto lg:gap-10 sm:gap-4 flex flex-col md:flex-row">
      <ShimmerStyles />

      {/* Left - big image + thumbs */}
      <div className="lg:w-3/5 w-full flex flex-col gap-3">
        <div className="lg:w-full mb-4 flex justify-center">
          <div className="relative lg:w-[500px] w-full h-[300px] shimmer rounded-lg" />
        </div>

        <div className="lg:w-[65%] md:w-[60%] sm:w-[60%] grid grid-cols-4 place-items-center gap-2 mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-16 h-16 shimmer rounded-md" />
          ))}
        </div>
      </div>

      {/* Right - details */}
      <div className="lg:w-2/5 w-full flex flex-col items-center md:items-start space-y-4 mt-4">
        <div className="w-[60%] h-6 shimmer rounded" />
        <div className="w-[80%] h-4 shimmer rounded" />
        <div className="w-[40%] h-4 shimmer rounded" />

        <div className="flex gap-4 w-full mt-4">
          <div className="w-[40%] h-10 shimmer rounded" />
          <div className="w-[40%] h-10 shimmer rounded" />
        </div>

        <div className="w-full h-16 shimmer rounded mt-6" />
        <div className="w-full h-6 shimmer rounded mt-2" />

        <div className="w-full grid grid-cols-5 gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-6 h-6 shimmer rounded-full mb-1" />
              <div className="w-8 h-2 shimmer rounded" />
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full mt-6">
          <div className="flex-1 h-12 shimmer rounded-lg" />
          <div className="flex-1 h-12 shimmer rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsShimmer;
