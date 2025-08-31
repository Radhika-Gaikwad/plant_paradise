import axiosInstance from "../utils/axios/axiosInstance";

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("product/getAll");
    return response.data.data.items; // only return products array
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Add new product (already written by you)
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("product/addProduct", productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};


// Update product
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem("token"); // or whatever key you used
    console.log(token)
    const response = await axiosInstance.patch(
      `product/updateProduct/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};


// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`product/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};


export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`product/${productId}`);
    return response.data.data.product; // return the single product object
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};