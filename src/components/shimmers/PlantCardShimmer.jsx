// src/components/ui/shimmers/PlantCardShimmer.jsx
import React from "react";
import ShimmerStyles from "./ShimmerStyles";

const PlantCardShimmer = () => {
  return (
    <div className="rounded-2xl shadow-md p-4 w-full h-full flex flex-col">
      <ShimmerStyles />
      <div className="shimmer bg-gray-200 h-52 w-full mb-4 rounded-md" />
      <div className="shimmer h-5 rounded w-3/4 mb-2" />
      <div className="shimmer h-5 rounded w-1/2 mb-4" />
      <div className="flex gap-2">
        <div className="shimmer h-10 flex-1 rounded" />
        <div className="shimmer h-10 flex-1 rounded" />
      </div>
    </div>
  );
};

export default PlantCardShimmer;
