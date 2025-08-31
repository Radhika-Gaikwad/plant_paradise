import React, { useState, useEffect } from "react";
import { updateCategory } from "../../services/categoryService"; // <-- make sure API exists
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import { showToast } from "../../utils/showToast";

const EditCategoryForm = ({ category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    isActive: "yes",
    imageUrl: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // preload category data
  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName || "",
        description: category.description || "",
        isActive: category.isActive ? "yes" : "no",
        imageUrl: category.imageUrl || "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file, "image");
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      showToast("❌ Image upload failed. Try again.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        isActive: formData.isActive === "yes",
      };

      await updateCategory(category.categoryId, payload);
      showToast("✅ Category updated successfully!", "success");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update category failed", err);
      showToast("❌ Failed to update category", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          ✏️ Edit Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Active Status */}
          <div>
            <label className="block text-sm font-medium">Active</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition"
              onClick={() => document.getElementById("editFileInput").click()}
            >
              {uploadingImage ? (
                <p className="text-gray-500 text-sm">Uploading...</p>
              ) : formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <p className="text-gray-500 text-sm">
                  Click or drag & drop to upload
                </p>
              )}
            </div>
            <input
              id="editFileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
