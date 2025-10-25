// src/utils/axios/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://plant-paradise-backend.onrender.com/api/v1/", // production backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token from localStorage for all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or getCookie("token") if stored in cookies
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Optional: function to manually update/remove token
export const updateAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
