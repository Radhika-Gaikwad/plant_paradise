import React, { useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react";
import { showToast } from "../../utils/showToast";
import { addProduct } from "../../services/productApi";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import { getAllCategories, getAllSubCategories } from "../../services/categoryService";

const ProductForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    quantity: "",
    stock: true,
    subscription: false,
    unit: "piece",
    price: "",
    discount: "",
    imageUrl: [],
    video: [],
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // ✅ Fetch categories and subcategories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        const subs = await getAllSubCategories();
        console.log(cats);
        console.log(subs);
        setCategories(cats);
        setSubCategories(subs);
      } catch (error) {
        showToast("❌ Failed to fetch categories", "error");
      }
    };
    fetchData();
  }, []);

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    // Product name: only alphabets, spaces, -
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.productName.trim())) {
      newErrors.productName = "Only letters and spaces are allowed";
    }

    // Price
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // Discount
    if (formData.discount < 0) {
      newErrors.discount = "Discount cannot be negative";
    } else if (formData.discount && Number(formData.discount) >= Number(formData.price)) {
      newErrors.discount = "Discount must be less than price";
    }

    // Quantity
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    // Unit
    const allowedUnits = ["piece", "pot", "bundle"];
    if (!allowedUnits.includes(formData.unit)) {
      newErrors.unit = "Unit must be plant-based (piece, pot, bundle)";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    // Images
    if (formData.imageUrl.length === 0) {
      newErrors.imageUrl = "At least one product image is required";
    }

    // Category / Sub-category
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subCategory) newErrors.subCategory = "Sub-category is required";

    return newErrors;
  };


  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    // map frontend fields -> backend schema
    const payload = {
      ...formData,
      categoryId: formData.category,
      subCategoryId: formData.subCategory,
    };

    console.log(payload)
    delete payload.category;
    delete payload.subCategory;

    try {
      setLoading(true);
      const response = await addProduct(payload);
      showToast("✅ Product added successfully!", "success");
      console.log("API Response:", response);
      onClose();
    } catch (error) {
      showToast(error.message || "❌ Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
          showToast("Video must be 30MB or less (~30s)", "error");
          continue;
        }
        const url = await uploadToCloudinary(file, type);
        urls.push(url);
      }

      setFormData((prev) => ({
        ...prev,
        [type === "image" ? "imageUrl" : "video"]: [
          ...(prev[type === "image" ? "imageUrl" : "video"] || []),
          ...urls,
        ],
      }));

      if (urls.length > 0) {
        showToast(
          `${urls.length} ${type === "image" ? "image(s)" : "video(s)"} uploaded successfully ✅`,
          "success"
        );
      }
    } catch (error) {
      showToast("Failed to upload file. Please try again.", "error");
    } finally {
      if (type === "image") setUploadingImage(false);
      if (type === "video") setUploadingVideo(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-full md:h-auto max-h-screen overflow-y-auto p-8">
        <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center tracking-wide">
          🌱 Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value, subCategory: "" });
              }}
              className="w-full border border-green-300 rounded-xl p-3"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Category */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Sub-Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-xl p-3"
              disabled={!formData.category}
            >
              <option value="">Select Sub-Category</option>
              {subCategories
                .filter((sub) => {
                  const category = categories.find((cat) => cat.categoryId === formData.category);
                  return sub.categoryId === category?.categoryId;
                })
                .map((sub) => (
                  <option key={sub.subCategoryId} value={sub.subCategoryId}>
                    {sub.subCategoryName}
                  </option>
                ))}
            </select>
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
              className="w-full border border-green-300 rounded-xl p-3"
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
              className="w-full border border-green-300 rounded-xl p-3"
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
              className="w-full border border-green-300 rounded-xl p-3"
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
              className="w-full border border-green-300 rounded-xl p-3"
            >
              <option value="piece">Piece</option>
              <option value="pot">Pot</option>
              <option value="bundle">Bundle</option>
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
              className="w-full border border-green-300 rounded-xl p-3"
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
              className="w-full border border-green-300 rounded-xl p-3"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
            )}
          </div>

          {/* Upload Images */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Upload Images</label>
            <label className="border-2 border-dashed border-green-400 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-green-50 transition">
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
              className="w-full border border-green-300 rounded-xl p-3"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-green-600 text-green-700 rounded-xl hover:bg-green-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

