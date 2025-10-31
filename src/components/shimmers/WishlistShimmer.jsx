// src/components/ui/shimmers/WishlistShimmer.jsx
import React from "react";
import ShimmerStyles from "./ShimmerStyles";
import PlantCardShimmer from "./PlantCardShimmer";

const WishlistShimmer = () => {
  return (
    <div className="p-6">
      <ShimmerStyles />
      <div className="flex items-center mb-6 space-x-3">
        <div className="shimmer w-8 h-8 rounded" />
        <div className="shimmer w-56 h-6 rounded" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <PlantCardShimmer key={i} />
        ))}
      </div>
    </div>
  );
};

export default WishlistShimmer;
