// src/services/blogService.js
import axios from "axios";

const API = "https://plant-paradise-backend.onrender.com/api/v1/blogs";

// Admin
export const addBlog = (blogData) =>
  axios.post(`${API}/add`, blogData, { headers: { "Content-Type": "application/json" } });

export const updateBlog = (blogId, blogData) =>
  axios.patch(`${API}/edit/${blogId}`, blogData, { headers: { "Content-Type": "application/json" } });

export const deleteBlog = (blogId) =>
  axios.delete(`${API}/delete/${blogId}`);

// User
export const getAllBlogs = () => axios.get(`${API}/all`);
export const getBlogById = (blogId) => axios.get(`${API}/${blogId}`);
