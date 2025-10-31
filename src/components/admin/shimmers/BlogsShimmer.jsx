import React from "react";

const BlogsShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ---------- Header Shimmer ---------- */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3 w-full sm:w-2/3">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-10 bg-green-200 rounded-lg w-32"></div>
        </div>
      </div>

      {/* ---------- Table Header Shimmer ---------- */}
      <div className="bg-white shadow-lg rounded-2xl overflow-x-auto animate-pulse">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-3 w-16"></th>
              <th className="border px-4 py-3 w-1/4"></th>
              <th className="border px-4 py-3 w-1/4"></th>
              <th className="border px-4 py-3 w-1/4"></th>
              <th className="border px-4 py-3 w-1/4"></th>
            </tr>
          </thead>

          {/* ---------- Rows ---------- */}
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="border px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                </td>
                <td className="border px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </td>
                <td className="border px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </td>
                <td className="border px-4 py-3">
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-12 h-12 bg-gray-200 rounded-md"
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="border px-4 py-3">
                  <div className="flex justify-center gap-4">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsShimmer;
