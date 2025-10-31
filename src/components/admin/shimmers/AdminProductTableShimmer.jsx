// src/components/shimmers/AdminProductTableShimmer.jsx
import React from "react";

const AdminProductTableShimmer = () => {
  return (
    <div className="bg-gray-50 rounded-xl shadow-xl p-6 animate-pulse">
      {/* 🔍 Search & Page Size Shimmer */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-10 w-28 bg-gray-200 rounded"></div>
      </div>

      {/* 🧩 Table Skeleton */}
      <div className="overflow-auto border rounded-lg max-h-[70vh] hidden md:block">
        <table className="min-w-full w-[180%] border-collapse">
          <thead className="bg-gradient-to-r from-green-200 to-green-400 text-gray-800 sticky top-0 z-30">
            <tr>
              {Array(15)
                .fill()
                .map((_, i) => (
                  <th key={i} className="px-4 py-3 border text-sm font-semibold">
                    <div className="h-4 w-24 bg-green-100 rounded mx-auto"></div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {Array(6)
              .fill()
              .map((_, i) => (
                <tr key={i} className="border-t">
                  {Array(15)
                    .fill()
                    .map((_, j) => (
                      <td key={j} className="p-3">
                        {j === 10 || j === 11 ? (
                          <div className="h-20 w-32 bg-gray-100 rounded mx-auto"></div>
                        ) : (
                          <div className="h-4 w-3/4 bg-gray-100 rounded mx-auto"></div>
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards View Shimmer */}
      <div className="grid gap-4 md:hidden">
        {Array(4)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 shadow bg-white flex flex-col gap-4"
            >
              <div className="flex justify-between">
                <div className="h-5 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-100 rounded"></div>
              <div className="h-44 bg-gray-100 rounded"></div>
              <div className="grid grid-cols-2 gap-2">
                {Array(6)
                  .fill()
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-4 w-3/4 bg-gray-100 rounded mx-auto"
                    ></div>
                  ))}
              </div>
              <div className="flex justify-end gap-3 mt-2">
                {Array(3)
                  .fill()
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-8 w-8 bg-gray-200 rounded-full"
                    ></div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* 📄 Pagination Shimmer */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-3">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="flex space-x-2">
          {Array(4)
            .fill()
            .map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-lg"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductTableShimmer;
