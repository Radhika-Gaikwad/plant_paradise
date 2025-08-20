// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice"; // 👈 import your slice

export const store = configureStore({
  reducer: {
    auth: authReducer, // 👈 register auth slice here
  },
});

export default store;
