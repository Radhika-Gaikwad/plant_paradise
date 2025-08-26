import axiosInstance from "../../utils/axios/axiosInstance";

export const signupService = async (data) => {
  try {
    const response = await axiosInstance.post("auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
