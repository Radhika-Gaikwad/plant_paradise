/*// axiosAuthInstance.js
import axios from "axios";
import { getCookie } from "../cookie/Cookies";

const axiosInstance = axios.create({
  baseURL: "https://plant-paradise-backend.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Function to update Authorization header dynamically
export const updateAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"]; // remove if no token
  }
};

// ✅ Check for token in cookies when instance is created
const token = localStorage.getItem("token");
if (token) {
  updateAuthHeader(token);
}

export default axiosInstance;*/
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
