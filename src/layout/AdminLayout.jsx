import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { ImBlog } from "react-icons/im";
import { 
  FaBoxOpen,         // Products
  FaShoppingCart,    // Orders
  FaUsers,           // Users
  FaTags,            // Categories

  FaUserCircle,      // Profile
  FaSignOutAlt,      // Logout
  FaSignInAlt        // Login
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <Link to="/admin/dashboard" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <RxDashboard /> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaBoxOpen /> Products
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaShoppingCart /> Orders
          </Link>
          <Link to="/admin/users" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaUsers /> Users
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaTags /> Categories
          </Link>
          <Link to="/admin/blogs" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <ImBlog/> Blogs
          </Link>

          <Link to="/login" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <FaSignInAlt /> Login
          </Link>
        </nav>
      </div>
      <div>
        <Link 
          to="/admin/profile" 
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded text-center"
        >
          <FaUserCircle /> Profile
        </Link>

        {/* Logout Button */}
        <button
          onClick={() => navigate("/admin/logout-confirm")}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
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
