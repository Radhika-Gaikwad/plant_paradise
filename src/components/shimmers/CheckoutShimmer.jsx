import React from "react";
import ShimmerStyles from"./ShimmerStyles"; // ✅ Reuse your shimmer utility

const CheckoutShimmer = () => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT SIDE (Addresses + Items) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Page title */}
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />

        {/* Address section */}
        <div className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-md" />
          </div>

          {/* Address cards shimmer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl bg-gray-50 space-y-2 animate-pulse"
              >
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Order items shimmer */}
        <div className="p-5 border rounded-2xl bg-white shadow-sm space-y-4">
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 p-3 border rounded-xl animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Order Summary) */}
      <aside className="lg:col-span-1 space-y-3 flex flex-col">
        <div className="p-3 border rounded-2xl bg-white shadow-sm flex-1 space-y-3 animate-pulse">
          <div className="h-6 w-36 bg-gray-200 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-gray-600"
            >
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between items-center">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>

          <div className="mt-4 h-10 bg-gray-200 rounded-2xl" />
          <div className="space-y-2 mt-4">
            <div className="h-8 bg-gray-100 rounded-xl" />
            <div className="h-8 bg-gray-100 rounded-xl" />
          </div>
        </div>

        {/* Bottom info shimmer */}
        <div className="p-2 border rounded-2xl bg-white shadow-sm space-y-2 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="space-y-2 w-full">
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CheckoutShimmer;
