// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice"; 
import signupReducer from "../features/authentication/signupSlice"; // 👈 import signup slice
import productReducer from "../redux/slices/productSlice";
import cartReducer from "../redux/slices/cartSlice";
import wishlistReducer from "../redux/slices/wishlistSlice";
import categoryReducer from "../redux/slices/categorySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer, // 👈 register signup slice here
    products: productReducer,
    categories: categoryReducer, 
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
