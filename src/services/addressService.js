// src/services/addressService.js
import axiosInstance from "../utils/axios/axiosInstance";
import { showToast } from "../utils/showToast";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.userId;
  } catch {
    return null;
  }
};

// Get all addresses
export const getUserAddresses = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      showToast("User not logged in", "error");
      return [];
    }
    const { data } = await axiosInstance.get(
      `/auth/profile/${userId}/address`,
      getAuthHeaders()
    );
    // backend returns `address` array
    return data.address || [];
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to fetch addresses", "error");
    return [];
  }
};

// Add new address
export const addUserAddress = async (addressPayload) => {
  try {
    const userId = getUserId();
    if (!userId) {
      showToast("User not logged in", "error");
      return null;
    }
    const { data } = await axiosInstance.post(
      `/auth/profile/${userId}/address`,
      addressPayload,
      getAuthHeaders()
    );
    showToast("Address added successfully!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to add address", "error");
    throw error;
  }
};

// Update existing address
export const updateUserAddress = async (addressId, addressPayload) => {
  try {
    const userId = getUserId();
    if (!userId) {
      showToast("User not logged in", "error");
      return null;
    }
    const { data } = await axiosInstance.put(
      `/auth/profile/${userId}/address/${addressId}`,
      addressPayload,
      getAuthHeaders()
    );
    showToast("Address updated successfully!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to update address", "error");
    throw error;
  }
};

// Delete address
export const deleteUserAddress = async (addressId) => {
  try {
    const userId = getUserId();
    if (!userId) {
      showToast("User not logged in", "error");
      return null;
    }
    const { data } = await axiosInstance.delete(
      `/auth/profile/${userId}/address/${addressId}`,
      getAuthHeaders()
    );
    showToast("Address deleted successfully!", "success");
    return data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to delete address", "error");
    throw error;
  }
};
