/*import axiosInstance from "../utils/axios/axiosInstance";

// ----------------- Profile -----------------
export const getProfile = async (userId) => {
  const response = await axiosInstance.get(`/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profileData) => {
  const response = await axiosInstance.put(`/profile/${userId}`, profileData);
  return response.data;
};

// ----------------- Address -----------------
export const getAllAddresses = async (userId) => {
  const response = await axiosInstance.get(`/profile/${userId}/addresses`);
  return response.data;
};

export const addAddress = async (userId, addressData) => {
  const response = await axiosInstance.post(`/profile/${userId}/address`, addressData);
  return response.data;
};

export const updateAddress = async (userId, addressId, addressData) => {
  const response = await axiosInstance.put(
    `/profile/${userId}/address/${addressId}`,
    addressData
  );
  return response.data;
};

export const deleteAddress = async (userId, addressId) => {
  const response = await axiosInstance.delete(
    `/profile/${userId}/address/${addressId}`
  );
  return response.data;
};
*/
// src/services/profileApi.js
import axios from "axios";

const API_BASE = "https://plant-paradise-backend.onrender.com/api/v1/auth/profile";

// Get user profile
export const getProfile = async (userId) => {
  const response = await axios.get(`${API_BASE}/${userId}`);
  return response.data;
};

// Update user profile
export const updateProfile = async (userId, profileData) => {
  const response = await axios.put(`${API_BASE}/${userId}`, profileData);
  return response.data;
};
