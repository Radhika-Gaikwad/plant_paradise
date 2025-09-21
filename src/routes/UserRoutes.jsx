import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";

import Home from "../pages/user/Home";
import Categories from "../pages/user/Categories";
import Orders from "../pages/user/Orders";
import Cart from "../pages/user/Cart";
import Products from "../pages/user/Products";
import PlaceOrder from "../pages/user/PlaceOrder";
import LoginForm from "../features/authentication/LoginForm";
import Profile from "../features/profile/Profile";
import ProductsC from "../pages/user/ProductsC";
import UserProductDetails from "../components/user/UserProductDetails";
import AddressPage from "../pages/user/AddressPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import OrderDetails from "../pages/user/OrderDetails";
import Blog from "../pages/user/Blog";
import BlogDetails  from "../pages/user/BlogDetails";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route 
          path="/profile" 
          element={<Profile userId={localStorage.getItem("userId")} />} 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:categoryId" element={<ProductsC />} />
        <Route path="/product/:productId" element={<UserProductDetails />} />
        <Route path="/addresses" element={<AddressPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />   
        <Route path="/orders/:id" element={<OrderDetails />} />   
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />   
      </Route>
    </Routes>
  );
};

export default UserRoutes;
