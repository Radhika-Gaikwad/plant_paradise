// src/services/orderService.js
import axiosInstance from "../utils/axios/axiosInstance"; // your configured axios with baseURL & token

/**
 * Place a new order
 * @param {Object} orderData - { items: [], address: string, total: number }
 */
export const placeOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/orders", orderData); // POST to backend orders endpoint
    return response.data;
  } catch (error) {
    console.error("Failed to place order:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

/**
 * Get all orders for the current user
 */
export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders"); // GET orders
    return response.data.orders; // adjust based on your backend response
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};
