/*import axiosInstance from "../utils/axios/axiosInstance";

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

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`product/byCategory/${categoryId}`);
    return response.data.data.items; // backend returns { data: { items: [...] } }
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Get products by subcategory
export const getProductsBySubCategory = async (subCategoryId) => {
  try {
    const response = await axiosInstance.get(`product/bySubCategory/${subCategoryId}`);
    return response.data.data.items;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};*/
import axiosInstance from "../utils/axios/axiosInstance";

// Utility: get headers with token
/*const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};*/

// Get all products
/*export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("product/getAll", getAuthHeaders());
    return response.data.data.items;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};*/
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getAllProducts = async () => {
  try {
    const res = await axiosInstance.get("product/getAll", getAuthHeaders());
    return res.data.data.items;
  } catch (err) {
    console.error(err);
    return []; // never crash
  }
};

// Add new product
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(
      "product/addProduct",
      productData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.patch(
      `product/updateProduct/${id}`,
      productData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `product/deleteProduct/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `product/${productId}`,
      getAuthHeaders()
    );
    return response.data.data.product;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `product/byCategory/${categoryId}`,
      getAuthHeaders()
    );
    return response.data.data.items;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Get products by subcategory
export const getProductsBySubCategory = async (subCategoryId) => {
  try {
    const response = await axiosInstance.get(
      `product/bySubCategory/${subCategoryId}`,
      getAuthHeaders()
    );
    return response.data.data.items;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
