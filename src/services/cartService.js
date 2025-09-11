import axiosInstance from "../utils/axios/axiosInstance";
import { showToast } from "../utils/showToast";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// ✅ Add product to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const { data } = await axiosInstance.post(
      "cart/add",
      { productId, quantity },
      getAuthHeaders()
    );
    showToast("Product added to cart!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to add to cart", "error");
    throw error;
  }
};

// ✅ Update product quantity (always POST, not PUT)
export const updateCart = async (productId, quantity) => {
  try {
    const { data } = await axiosInstance.post(
      "cart/update",
      { productId, quantity },
      getAuthHeaders()
    );

    return data;
  } catch (error) {
    // showToast(error.response?.data?.message || "Failed to update cart", "error");
    throw error;
  }
};

// ✅ Remove product from cart (always POST, not DELETE)
export const removeFromCart = async (productId) => {
  try {
    const { data } = await axiosInstance.post(
      "cart/remove",
      { productId },
      getAuthHeaders()
    );
   
    return data;
  } catch (error) {
    // showToast(error.response?.data?.message || "Failed to remove product", "error");
    throw error;
  }
};


// ✅ Get cart data
export const getCart = async () => {
  try {
    const { data } = await axiosInstance.get("cart/", getAuthHeaders());
    return data.data; // directly return the array of cart products
  } catch (error) {
    // showToast(error.response?.data?.message || "Failed to fetch cart", "error");
    throw error;
  }
};
