import axiosInstance from "../utils/axios/axiosInstance";
//import axios from "axios";

//const API = "https://plant-paradise-backend.onrender.com/api/v1/wishlist";
// ✅ Get all wishlist items
export const getWishlist = async () => {
  const { data } = await axiosInstance.get("/wishlist");
  return data.data; // backend wraps items inside "data"
};

// ✅ Add product to wishlist
export const addToWishlist = async (productId) => {
  const { data } = await axiosInstance.post("/wishlist/add", { productId });
  return data.data;
};

export const removeFromWishlist = async (productId) => {
  const { data } = await axiosInstance.post("/wishlist/remove", { productId });
  return data.data;
};