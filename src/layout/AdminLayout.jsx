// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isCollapsed ? "md:ml-20" : "md:ml-64"} ml-0`}
      >
        {/* Top bar (only for mobile) */}
        <div className="p-4 border-b bg-white shadow-md md:hidden flex items-center justify-between">
          <button
            className="text-2xl text-green-800"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-bold text-gray-700">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <main className=" overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
