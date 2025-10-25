// src/services/order.service.js
import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Order service: functions to interact with admin order endpoints.
 * The backend router endpoints you gave:
 * GET    /orders/all
 * PUT    /orders/update-status/:id
 * PUT    /orders/admin-cancel/:id
 * DELETE /orders/delete/:id
 * (Optionally GET /orders/:id if backend supports it)
 */

const OrderService = {
  /**
   * Get all orders with optional query params:
   *  - page (1-based)
   *  - limit
   *  - search (string)
   *  - status (string)
   *  - sortBy (e.g. createdOn)
   */
  async getAllOrders({ page = 1, limit = 10, search = "", status = "", sortBy = "-createdOn" } = {}) {
    try {
      const params = { page, limit, search, status, sortBy };
      const { data } = await axiosInstance.get("orders/all", { params });
      // Expect backend to return { success: true, orders: [], total, page, limit }
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to fetch orders";
      throw new Error(message);
    }
  },

  async getOrderById(orderId) {
    try {
      // If backend has endpoint /orders/:id. If not, you may call /orders/all and find the id locally.
      const { data } = await axiosInstance.get(`orders/${orderId}`);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to fetch order";
      throw new Error(message);
    }
  },

  async updateOrderStatus(orderId, statusPayload) {
    try {
      // statusPayload can be string or object { status, deliveryDetails, notes }
      const { data } = await axiosInstance.put(`orders/update-status/${orderId}`, statusPayload);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to update order status";
      throw new Error(message);
    }
  },

  async adminCancelOrder(orderId, reason) {
    try {
      const payload = reason ? { reason } : {};
      const { data } = await axiosInstance.put(`orders/admin-cancel/${orderId}`, payload);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to cancel order";
      throw new Error(message);
    }
  },

  async deleteOrder(orderId) {
    try {
      const { data } = await axiosInstance.delete(`orders/delete/${orderId}`);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to delete order";
      throw new Error(message);
    }
  },
};

export default OrderService;