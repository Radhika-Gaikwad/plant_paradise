// axiosAuthInstance.js
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

export default axiosInstance;

