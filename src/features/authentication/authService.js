// src/features/authentication/authService.js
import axiosInstance, { updateAuthHeader } from "../../utils/axios/axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("auth/login", credentials);
console.log(response.data);
if (response.data?.data?.token) {
  updateAuthHeader(response.data.data.token);
  localStorage.setItem("token", response.data.data.token);
  localStorage.setItem("role", response.data.data.user.role); // ✅ fixed
  localStorage.setItem("name", response.data.data.user.name);
}


    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Something went wrong, please try again."
    );
  }
};
