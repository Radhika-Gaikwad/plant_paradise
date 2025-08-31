// src/components/admin/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaList,
  FaBlog,
  FaUserCircle,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Products", icon: <FaBoxOpen />, path: "/admin/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Categories", icon: <FaList />, path: "/admin/categories" },
    { name: "Blogs", icon: <FaBlog />, path: "/admin/blogs" },
  ];

  return (
    <aside
      className={`bg-green-900 text-white fixed top-0 left-0 h-screen transition-all duration-300 flex flex-col justify-between shadow-lg z-50
      ${isCollapsed ? "w-20" : "w-64"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Top Logo + Collapse Btn */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-lg font-bold">Admin Panel</h2>}
        <button
          className="text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaBars />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            data-tooltip-id={item.name}
            data-tooltip-content={item.name}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
            <Tooltip id={item.name} place="right" />
          </Link>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="p-4">
        <Link
          to="/admin/profile"
          data-tooltip-id="Profile"
          data-tooltip-content="Profile"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaUserCircle />
          {!isCollapsed && <span>Profile</span>}
          <Tooltip id="Profile" place="right" />
        </Link>

        <button
          onClick={() => navigate("/admin/logout-confirm")}
          data-tooltip-id="Logout"
          data-tooltip-content="Logout"
          className="mt-4 w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          {!isCollapsed && "Logout"}
          <Tooltip id="Logout" place="right" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
