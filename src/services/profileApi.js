import axios from "axios";
const API_BASE = "https://plant-paradise-backend.onrender.com/api/v1/auth";

export const getProfile = async (userId) => {
  const res = await axios.get(`${API_BASE}/profile/${userId}`);
  return res.data;
};

export const getAllAddresses = async (userId) => {
  const res = await axios.get(`${API_BASE}/profile/${userId}/address`);
  return Array.isArray(res.data) ? res.data : res.data?.address || [];
};

export const addAddress = async (userId, addressData) => {
  const res = await axios.post(`${API_BASE}/profile/${userId}/address`, addressData);
  return res.data;
};

export const updateAddress = async (userId, addressId, addressData) => {
  const res = await axios.put(`${API_BASE}/profile/${userId}/address/${addressId}`, addressData);
  return res.data;
};

export const deleteAddress = async (userId, addressId) => {
  const res = await axios.delete(`${API_BASE}/profile/${userId}/address/${addressId}`);
  return res.data;
};
