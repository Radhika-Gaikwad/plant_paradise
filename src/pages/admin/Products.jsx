// src/pages/AdminProducts.jsx
import React, { useState } from "react";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";

const AdminProducts = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 h-full">
      {/* ---------- Header ---------- */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Manage Products
          </h1>
          <p className="text-gray-500 mt-2">
            Add, edit, and manage your product inventory from here.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl shadow-lg font-medium transform hover:scale-105 transition"
        >
          + Add Product
        </button>
      </div>

      {/* ---------- Table Section ---------- */}
      <div className="bg-white shadow-lg rounded-2xl">
        {/* ✅ Don’t wrap ProductTable in another max-h container */}
        <ProductTable />
      </div>

      {/* ---------- Modal/Form ---------- */}
      {showForm && (
        <div className="animate-fadeIn">
          <ProductForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default AdminProducts;


