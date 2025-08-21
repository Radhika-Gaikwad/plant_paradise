// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice"; 
import signupReducer from "../features/authentication/signupSlice"; // 👈 import signup slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer, // 👈 register signup slice here
  },
});

export default store;
