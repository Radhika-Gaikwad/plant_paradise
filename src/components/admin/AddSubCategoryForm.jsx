import React, { useState } from "react";
import { addSubCategory } from "../../services/categoryService";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import { showToast } from "../../utils/showToast";

const AddSubCategoryForm = ({ categoryId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    subCategoryName: "",
    description: "",
    isActive: "yes",
    imageUrl: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file, "image");
      setFormData((p) => ({ ...p, imageUrl: url }));
      showToast("✅ Image uploaded", "success");
    } catch {
      showToast("❌ Image upload failed", "error");
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
        categoryId, // important link
      };
      await addSubCategory(payload);
      showToast("✅ Subcategory added", "success");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to add subcategory", "error");
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

        <h2 className="text-2xl font-bold text-green-700 mb-4">➕ Add Subcategory</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Subcategory Name</label>
            <input
              type="text"
              name="subCategoryName"
              value={formData.subCategoryName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition"
              onClick={() => document.getElementById("addSubFileInput").click()}
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
                <p className="text-gray-500 text-sm">Click to upload</p>
              )}
            </div>
            <input
              id="addSubFileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Subcategory"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategoryForm;
