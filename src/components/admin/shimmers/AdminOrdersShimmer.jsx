// src/components/admin/shimmers/AdminOrdersShimmer.jsx
import React from "react";
//import "../../ui/shimmers/ShimmerStyles.css"; // 👈 optional if you already use a shared shimmer CSS

const shimmerRow = (cols) => (
  <tr className="animate-pulse">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3 border">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const AdminOrdersShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-2 animate-pulse">
      
      {/* Table Shimmer */}
      <div className="bg-white shadow-lg rounded-2xl hidden md:block">
        <div className="overflow-auto border rounded-lg">
          <table className="min-w-full w-[140%] table-fixed border-collapse">
            <thead className="bg-gray-200 text-gray-800 sticky top-0 z-30">
              <tr>
                {[
                  "SN",
                  "Customer",
                  "Product Details",
                  "Payment Mode",
                  "Total",
                  "Status",
                  "Created On",
                  "Actions",
                ].map((th, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 border text-sm font-semibold text-left"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 6 }).map((_, i) => shimmerRow(8))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Shimmer */}
      <div className="grid gap-4 md:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 border animate-pulse"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="h-4 bg-gray-300 w-36 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 w-48 rounded"></div>
              </div>
              <div className="h-3 bg-gray-200 w-20 rounded"></div>
            </div>
            <div className="mt-3 space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-3 bg-gray-200 w-full rounded"></div>
              ))}
            </div>
            <div className="mt-3 h-3 bg-gray-200 w-2/3 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersShimmer;
