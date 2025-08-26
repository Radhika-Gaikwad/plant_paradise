import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  // <-- This function must be inside Sidebar
  const handleLogout = () => {
    localStorage.removeItem("admin"); // adjust key as per your app
    navigate("/login");
  };

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <Link to="/admin/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/admin/products" className="block hover:bg-gray-700 p-2 rounded">Products</Link>
          <Link to="/admin/orders" className="block hover:bg-gray-700 p-2 rounded">Orders</Link>
          <Link to="/admin/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
          <Link to="/admin/categories" className="block hover:bg-gray-700 p-2 rounded">Categories</Link>
          <Link to="/admin/blogs" className="block hover:bg-gray-700 p-2 rounded">Blogs</Link>
          
          <Link to="/login" className="block hover:bg-gray-700 p-2 rounded">
            Login
          </Link>
        </nav>
      </div>
      <div>
        <Link 
          to="/admin/profile" 
          className="block hover:bg-gray-700 p-2 rounded text-center"
        >
          Profile
        </Link>

      {/* Logout Button */}
      <button
      onClick={() => navigate("/admin/logout-confirm")}
      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded flex items-center justify-center gap-2"
      >
      Logout
      </button>
      </div>
    </aside>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 flex-1 overflow-y-auto">
        <Outlet /> {/* Active admin page */}
      </main>
    </div>
  );
};

export default AdminLayout;

