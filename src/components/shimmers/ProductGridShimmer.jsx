// src/components/ui/shimmers/ProductGridShimmer.jsx
import React from "react";
import PlantCardShimmer from "./PlantCardShimmer";

const ProductGridShimmer = ({ cols = 4, rows = 2 }) => {
  // default grid: 2 rows x 4 cols = 8 skeletons
  const count = cols * rows;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PlantCardShimmer key={i} />
      ))}
    </div>
  );
};

export default ProductGridShimmer;
