import axiosInstance from "../utils/axios/axiosInstance";
import { showToast } from "../utils/showToast";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// ✅ Add product to Wishlist
export const addToWishlist = async (productId) => {
  try {
    const { data } = await axiosInstance.post(
      "wishlist/add",
      { productId },
      getAuthHeaders()
    );
    showToast("Product added to wishlist!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to add to wishlist", "error");
    throw error;
  }
};

// ✅ Remove product from Wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const { data } = await axiosInstance.post(
      "wishlist/remove",
      { productId },
      getAuthHeaders()
    );
    showToast("Product removed from wishlist!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to remove from wishlist", "error");
    throw error;
  }
};

// ✅ Get Wishlist items
export const getWishlist = async () => {
  try {
    const { data } = await axiosInstance.get("wishlist", getAuthHeaders());
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to fetch wishlist", "error");
    throw error;
  }
};
