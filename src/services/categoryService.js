// src/services/categoryService.js
import axiosInstance from "../utils/axios/axiosInstance";

// ✅ Get all categories
export const getAllCategories = async () => {
  const res = await axiosInstance.get("category/getAll");
  return res.data?.data?.items || [];
};

// ✅ Get all subcategories
export const getAllSubCategories = async () => {
  const res = await axiosInstance.get("subCategory/getAll");
  return res.data?.data?.items || [];
};

// ✅ Add category
export const addCategory = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.post("category/addCategory", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Add subcategory
export const addSubCategory = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.post("subCategory/addSubCategory", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Update category
export const updateCategory = async (categoryId, payload) => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.patch(
    `category/updateCategory/${categoryId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// ✅ Update subcategory
export const updateSubCategory = async (subCategoryId, payload) => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.patch(
    `subCategory/updateSubCategory/${subCategoryId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// ✅ Delete category
export const deleteCategory = async (categoryId) => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.delete(
    `category/deleteCategory/${categoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// ✅ Delete subcategory
export const deleteSubCategory = async (subCategoryId) => {
  const token = localStorage.getItem("token");
  const res = await axiosInstance.delete(
    `subCategory/deleteSubCategory/${subCategoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
