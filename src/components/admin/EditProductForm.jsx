import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { updateProduct } from "../../services/productApi";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import { showToast } from "../../utils/showToast";

const EditProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ ...product });
  const [errors, setErrors] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter a valid price";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await updateProduct(product.productId, formData);
      showToast("✅ Product updated successfully!", "success");
      onSuccess(); // refresh list
      onClose();
    } catch (error) {
      showToast(error.message || "❌ Failed to update", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (type === "image") setUploadingImage(true);
    if (type === "video") setUploadingVideo(true);

    try {
      const urls = [];
      for (const file of files) {
        if (type === "video" && file.size > 30 * 1024 * 1024) {
          showToast("Video must be ≤30MB", "error");
          continue;
        }
        const url = await uploadToCloudinary(file, type);
        urls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        [type === "image" ? "imageUrl" : "video"]: [...prev[type === "image" ? "imageUrl" : "video"], ...urls],
      }));
    } catch {
      showToast("Upload failed", "error");
    } finally {
      setUploadingImage(false);
      setUploadingVideo(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-full md:h-auto max-h-screen overflow-y-auto p-8">
        <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center">✏️ Edit Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example: Product Name */}
          <div className="flex flex-col">
            <label className="mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
            {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
          </div>
 {/* Category */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            >
              <option value="">Select Category</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Tools">Tools</option>
              <option value="Pots">Pots</option>
            </select>
          </div>

          {/* Sub-Category */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Sub-Category</label>
            <input
              type="text"
              name="subCategory"
              placeholder="Enter sub-category"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Available in Stock?</label>
            <select
              name="stock"
              value={formData.stock ? "yes" : "no"}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value === "yes" })
              }
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm text-gray-700"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Subscription */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Available for Subscription?</label>
            <select
              name="subscription"
              value={formData.subscription ? "yes" : "no"}
              onChange={(e) =>
                setFormData({ ...formData, subscription: e.target.value === "yes" })
              }
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm text-gray-700"
            >
              <option value="">Select option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Unit */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            >
              <option value="piece">Piece</option>
              <option value="kg">Kg</option>
              <option value="g">Gram</option>
              <option value="litre">Litre</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Upload Images</label>
            <label className="border-2 border-dashed border-green-400 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-green-50 transition relative">
              {uploadingImage ? (
                <Loader2 className="w-6 h-6 text-green-600 animate-spin mb-2" />
              ) : (
                <Upload className="w-10 h-10 text-green-600 mb-2" />
              )}
              <span className="text-sm text-gray-600">Click to upload (multiple)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e, "image")}
              />
            </label>
            {formData.imageUrl?.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-2">
                {formData.imageUrl.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="uploaded"
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upload Videos */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Upload Videos</label>
            <label className="border-2 border-dashed border-green-400 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-green-50 transition">
              {uploadingVideo ? (
                <Loader2 className="w-6 h-6 text-green-600 animate-spin mb-2" />
              ) : (
                <Upload className="w-10 h-10 text-green-600 mb-2" />
              )}
              <span className="text-sm text-gray-600">Click to upload (multiple)</span>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e, "video")}
              />
            </label>
            {formData.video?.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-green-700">
                {formData.video.map((url, idx) => (
                  <li key={idx}>🎬 {url.split("/").pop()}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Product Description</label>
            <textarea
              name="description"
              placeholder="Write product description..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-green-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
            />
          </div>


          {/* Buttons */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4 pt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-xl">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
