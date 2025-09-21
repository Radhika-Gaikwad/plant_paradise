import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa"; // upload icon

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });

  // Handle text inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle multiple image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((images) => {
      setFormData({ ...formData, images: [...formData.images, ...images] });
    });
  };

  // Save Blog
  const handleSave = (e) => {
    e.preventDefault();
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = { ...formData, id: Date.now() };
    const updated = [...storedBlogs, newBlog];
    localStorage.setItem("blogs", JSON.stringify(updated));
    navigate("/admin/blogs");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Add New Blog</h1>

      <form onSubmit={handleSave} className="bg-white shadow-md rounded-lg p-6">
        {/* Blog Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border-2 border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        {/* Blog Content */}
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="5"
          className="w-full mb-4 p-2 border-2 border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        {/* Upload Images */}
        <label
          htmlFor="upload-images"
          className="border-2 border-dashed border-green-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50"
        >
          <FaUpload className="text-green-300 text-2xl mb-2" />
          <span className="text-green-300">Click to upload (multiple)</span>
          <input
            id="upload-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Preview Images */}
        <div className="flex flex-wrap gap-4 mt-4">
          {formData.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border-2 border-green-100"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
