// src/pages/admin/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { getProductById, deleteProduct } from "../../services/productApi";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Pencil, Trash } from "lucide-react";
import EditProductForm from "./EditProductForm";
import { showToast } from "../../utils/showToast";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      showToast("❌ Failed to fetch product", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.productId);
      showToast("🗑️ Product deleted!", "success");
      setDeleting(false);
      navigate(-1); // go back to products list
    } catch (err) {
      showToast("❌ Failed to delete", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Product not found!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 hover:underline mb-6"
      >
        <ArrowLeft size={18} /> Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="flex flex-col justify-center items-center p-6 bg-gray-50">
          <img
            src={product.imageUrl?.[0]}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-green-700">
            {product.productName}
          </h1>

          {/* Category */}
          <p className="text-gray-500">
            {product.category} / {product.subCategory}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-green-700">
              ₹{product.price - (product.price * product.discount) / 100}
            </span>
            {product.discount > 0 && (
              <>
                <span className="line-through text-gray-400">₹{product.price}</span>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-medium ${
              product.stock ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < product.overAllRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Extra Details */}
          <div className="grid grid-cols-2 gap-3 text-sm mt-4">
            <p><span className="font-semibold">Quantity:</span> {product.quantity} {product.unit}</p>
            <p><span className="font-semibold">Subscription:</span> {product.subscription ? "Available" : "Not Available"}</p>
            <p><span className="font-semibold">Created On:</span> {new Date(product.createdOn).toLocaleDateString()}</p>
            <p><span className="font-semibold">Product ID:</span> {product.productId}</p>
            <p><span className="font-semibold">Reviews:</span> {product.review?.length || 0}</p>
          </div>

          {/* Admin Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setEditingProduct(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700 transition"
            >
              <Pencil size={18} /> Edit Product
            </button>
            <button
              onClick={() => setDeleting(true)}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-50 transition"
            >
              <Trash size={18} /> Delete Product
            </button>
          </div>
        </div>
      </div>

      {/* ✏️ Edit Product Modal */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={fetchProduct}
        />
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      {deleting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600 my-3">
              Do you really want to delete <b>{product.productName}</b>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleting(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
