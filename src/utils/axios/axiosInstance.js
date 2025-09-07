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

<<<<<<< HEAD
/*// ✅ Check for token in cookies when instance is created
=======
// ✅ Check for token in cookies when instance is created
>>>>>>> 3f436c10637c13bb8035cddb011a16afdff26bc4
const token = localStorage.getItem("token");
if (token) {
  updateAuthHeader(token);
}*/
// Add token if exists
const token = localStorage.getItem("token");
if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
