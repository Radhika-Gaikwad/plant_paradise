// src/pages/admin/AddBlog.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBlog, getBlogById, updateBlog } from "../../services/blogService";
import { Loader2, Upload } from "lucide-react";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

const AddBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "", // single image URL
  });
  const [previewUrl, setPreviewUrl] = useState(""); // preview
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Prefill data if editing
  useEffect(() => {
    if (blogId) {
      setLoading(true);
      getBlogById(blogId)
        .then((res) => {
          const data = res.data.data;
          setFormData({
            title: data.title || "",
            category: data.category || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
          });
          setPreviewUrl(data.imageUrl || "");
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          alert("Failed to load blog data");
        })
        .finally(() => setLoading(false));
    }
  }, [blogId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Upload single image to Cloudinary
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file, "image");
      setFormData((prev) => ({ ...prev, imageUrl: url }));
      setPreviewUrl(url);
    } catch (err) {
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl,
      };

      if (blogId) {
        await updateBlog(blogId, payload);
        alert("Blog updated successfully!");
      } else {
        await addBlog(payload);
        alert("Blog added successfully!");
      }
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  if (loading) return <p className="text-center py-12">Loading blog data...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        {blogId ? "Edit Blog" : "Add New Blog"}
      </h1>

      <form onSubmit={handleSave} className="bg-white shadow-md rounded-lg p-6">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Blog Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Blog Content"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Upload Image */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Upload Image</label>
          <label className="border-2 border-dashed border-green-400 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-green-50 transition">
            {uploadingImage ? (
              <Loader2 className="w-6 h-6 text-green-600 animate-spin mb-2" />
            ) : (
              <Upload className="w-10 h-10 text-green-600 mb-2" />
            )}
            <span className="text-sm text-gray-600">Click to upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="w-32 h-32 object-cover rounded-md border mt-2"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {blogId ? "Update Blog" : "Save"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
