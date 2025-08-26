import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutConfirm = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // clear admin auth
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
