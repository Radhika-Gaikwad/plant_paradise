// src/features/authentication/authService.js
import axiosInstance, { updateAuthHeader } from "../../utils/axios/axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("auth/login", credentials);

    if (response.data?.data?.token) {
      updateAuthHeader(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role); // 1=Admin, 0=User
      localStorage.setItem("name", response.data.data.name);
    }

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Something went wrong, please try again."
    );
  }
};
