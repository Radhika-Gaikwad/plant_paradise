import React from "react";
import ShimmerStyles from "./ShimmerStyles"; // ✅ default import for consistency

const OrderDetailsShimmer = () => {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto animate-pulse">
      {/* Back Button */}
      <div className="w-32 h-4 bg-gray-200 rounded mb-6"></div>

      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Order Tracker */}
      <div className="flex justify-between relative mb-8">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center text-center relative"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-2"></div>
            <div className="w-12 h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-16 h-2 bg-gray-100 rounded"></div>
            {idx < 3 && (
              <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>

      {/* Order Info */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
        <div className="space-y-3">
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
          <div className="h-4 w-56 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <div className="h-5 w-52 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-80 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-72 bg-gray-200 rounded"></div>
      </div>

      {/* Products Section */}
      <div className="bg-white shadow rounded-xl p-5">
        <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-t border-gray-100"
          >
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-100 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Review Section (placeholder for delivered orders) */}
      <div className="bg-white shadow rounded-xl p-5 mt-6">
        <div className="h-5 w-48 bg-gray-200 rounded mb-3"></div>
        <div className="h-20 w-full bg-gray-100 rounded mb-3"></div>
        <div className="h-8 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default OrderDetailsShimmer;
