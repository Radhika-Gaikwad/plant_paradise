import React from "react";

const AdminCategoriesShimmer = () => {
  // Helper: Generate shimmer blocks
  const shimmerRows = Array.from({ length: 6 });

  return (
    <div className="p-2">
      {/* Header shimmer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <div className="h-8 w-60 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-9 w-32 bg-green-200 animate-pulse rounded-lg"></div>
      </div>

      {/* Desktop shimmer table */}
      <div className="overflow-x-auto hidden sm:block rounded-xl shadow-lg bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-green-200">
            <tr>
              <th className="p-3 w-12"></th>
              <th className="p-3 w-20"></th>
              <th className="p-3 w-24"></th>
              <th className="p-3"></th>
              <th className="p-3"></th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {shimmerRows.map((_, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-3 text-center">
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full mx-auto"></div>
                </td>
                <td className="p-3">
                  <div className="w-6 h-4 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td className="p-3">
                  <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
                </td>
                <td className="p-3">
                  <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td className="p-3">
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <div className="w-12 h-6 bg-blue-200 animate-pulse rounded-lg"></div>
                    <div className="w-12 h-6 bg-red-200 animate-pulse rounded-lg"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile shimmer cards */}
      <div className="grid gap-4 sm:hidden mt-4">
        {shimmerRows.map((_, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow border flex flex-col gap-3 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-14 h-5 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-6 bg-blue-200 rounded"></div>
              <div className="flex-1 h-6 bg-red-200 rounded"></div>
            </div>
            <div className="mt-2 space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesShimmer;
