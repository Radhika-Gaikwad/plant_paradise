// src/components/ui/shimmers/CartShimmer.jsx
import React from "react";
import ShimmerStyles from "./ShimmerStyles";

const CartShimmer = () => {
  return (
    <div className="container mx-auto p-6">
      <ShimmerStyles />
      <div className="text-3xl font-extrabold mb-6">
        <div className="w-64 h-8 shimmer rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-2xl shadow-sm bg-white"
            >
              <div className="shimmer w-full sm:w-36 h-28 rounded-lg" />
              <div className="flex-1 w-full">
                <div className="shimmer h-6 w-3/4 mb-2 rounded" />
                <div className="shimmer h-4 w-1/2 mb-4 rounded" />
                <div className="flex items-center gap-3">
                  <div className="shimmer w-28 h-10 rounded" />
                  <div className="shimmer w-20 h-10 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-1">
          <div className="space-y-4 sticky top-6">
            <div className="p-5 border rounded-2xl bg-white shadow-sm">
              <div className="shimmer h-6 w-40 mb-3 rounded" />
              <div className="shimmer h-4 w-full mb-2 rounded" />
              <div className="shimmer h-4 w-full mb-2 rounded" />
              <div className="shimmer h-10 w-full mt-4 rounded" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartShimmer;
