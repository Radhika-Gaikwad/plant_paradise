// src/components/shimmers/OrdersShimmer.jsx
import React from "react";
import ShimmerStyles from "./ShimmerStyles"; // ✅ ensure default export

const OrdersShimmer = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6 animate-pulse">
      {/* Left Filter Section */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white shadow-md rounded-lg p-3 sm:p-4">
          <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
          <div className="space-y-4">
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-9 w-full bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 w-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-9 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Orders Section */}
      <div className="w-full lg:w-3/4">
        <div className="h-6 sm:h-8 w-32 bg-gray-200 rounded mb-4"></div>

        {/* Repeat 4 shimmer order cards */}
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 sm:p-4 bg-white shadow-sm mb-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Product image placeholders */}
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-md"
                  ></div>
                ))}
              </div>

              {/* Order info placeholders */}
              <div className="flex-1 min-w-[150px]">
                <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>

              {/* Price placeholders */}
              <div className="text-left sm:text-right">
                <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
              </div>

              {/* Status chip placeholder */}
              <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersShimmer;
