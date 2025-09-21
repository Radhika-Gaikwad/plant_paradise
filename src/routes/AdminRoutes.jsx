import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import Categories from "../pages/admin/Categories";
import Blogs from "../pages/admin/Blogs";
import AddBlog from "../pages/admin/AddBlog";
import LogoutConfirm from "../pages/admin/LogoutConfirm";
import Profile from "../features/profile/Profile";
import ProductDetails from "../components/admin/ProductDetails";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/productDetails/:productId" element={<ProductDetails />} />


      </Route>
      <Route path="logout-confirm" element={<LogoutConfirm />} />
    </Routes>
  );
};

export default AdminRoutes;
