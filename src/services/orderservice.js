// src/services/orderService.js
import axiosInstance from "../utils/axios/axiosInstance";
import { showToast } from "../utils/showToast";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Step 1: Create payment order
export const createPaymentOrder = async (amount) => {
  try {
    const { data } = await axiosInstance.post(
      "payments/create-order",
      { amount },
      getAuthHeaders()
    );
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to create payment order", "error");
    throw error;
  }
};

export const verifyPaymentOrder = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "payments/verify-order",
      payload,
      getAuthHeaders()
    );
    return data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Payment verification failed",
      "error"
    );
    throw error;
  }
};


// Step 3: Place order (ONLINE or COD)
export const placeOrder = async (orderBody) => {
  try {
    const { data } = await axiosInstance.post(
      "orders/add-order",
      orderBody,
      getAuthHeaders()
    );
    showToast("Order placed successfully!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to place order", "error");
    throw error;
  }
};

// src/services/orderService.js
export const getMyOrders = async () => {
  try {
    const { data } = await axiosInstance.get(
      "orders/my-orders",
      getAuthHeaders()
    );
    return data.orders || [];
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to fetch orders", "error");
    throw error;
  }
};

// ✅ New: Get single order by ID
export const getOrderById = async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `orders/get-order/${id}`,
      getAuthHeaders()
    );
    return data.order; // assuming backend sends { order: {...} }
  } catch (error) {
    showToast(error.response?.data?.message || "Order not found", "error");
    throw error;
  }
};
