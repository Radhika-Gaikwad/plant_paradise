import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productApi";
import { addToCart, updateCart, removeFromCart, getCart } from "../../services/cartService";
import { Star, ArrowLeft } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { showToast } from "../../utils/showToast";

const UserProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [count, setCount] = useState(0); // ✅ cart quantity
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(productId);
      setProduct(data);
console.log(data);
      const defaultMedia =
        data?.imageUrl?.length > 0
          ? { type: "image", url: data.imageUrl[0] }
          : data?.video?.length > 0
          ? { type: "video", url: data.video[0] }
          : null;

      setSelectedMedia(defaultMedia);
    } catch (error) {
      showToast("❌ Failed to fetch product", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load cart items
  const fetchCart = async () => {
    try {
      const cartItems = await getCart();
      const item = cartItems.find((p) => p.productId === productId);
      if (item) {
        setCount(item.quantity);
      }
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  // ✅ Add to Cart
  const handleAddToCart = async () => {
    await addToCart(productId, 1);
    setCount(1);
  };

  // ✅ Increase
  const handleIncrease = async () => {
    const newCount = count + 1;
    await updateCart(productId, newCount);
    setCount(newCount);
  };

  // ✅ Decrease / Remove
  const handleDecrease = async () => {
    if (count === 1) {
      await removeFromCart(productId);
      setCount(0);
    } else {
      const newCount = count - 1;
      await updateCart(productId, newCount);
      setCount(newCount);
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

  const gallery = [
    ...(product.imageUrl?.map((img) => ({ type: "image", url: img })) || []),
    ...(product.video?.map((vid) => ({ type: "video", url: vid })) || []),
  ];

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
        {/* Media Section */}
        <div className="flex flex-col items-center p-6 bg-gray-50">
          <div className="w-full h-96 flex justify-center items-center bg-white rounded-xl shadow-md overflow-hidden">
            {selectedMedia?.type === "video" ? (
              <video src={selectedMedia.url} className="w-full h-full object-cover" controls />
            ) : (
              <img src={selectedMedia?.url} alt={product.productName} className="w-full h-full object-cover" />
            )}
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {gallery.map((media, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMedia(media)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer ${
                    selectedMedia?.url === media.url ? "border-green-600" : "border-gray-200"
                  }`}
                >
                  {media.type === "video" ? (
                    <video src={media.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={media.url} alt={`thumb-${idx}`} className="w-full h-full object-contain" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-green-700">{product.productName}</h1>
          <p className="text-gray-500">
            {product.categoryName} / {product.subCategoryName}
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
          <p className={`text-sm font-medium ${product.stock ? "text-green-600" : "text-red-500"}`}>
            {product.stock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < product.overAllRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {count === 0 ? (
              // ✅ Add to Cart
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow hover:opacity-90 transition"
              >
                Add to Cart
              </button>
            ) : (
              // ✅ Counter box
              <div className="flex-1 h-12 flex items-center justify-between border border-green-500 rounded-xl px-4 bg-white transition">
                <button
                  onClick={handleDecrease}
                  className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  {count === 1 ? <FaTrash size={14} /> : "-"}
                </button>
                <span className="font-semibold text-green-700">{count}</span>
                <button
                  onClick={handleIncrease}
                  className="w-9 h-9 flex items-center justify-center bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  +
                </button>
              </div>
            )}

            {/* Buy Now */}
            <button className="flex-1 h-12 border-2 border-green-500 text-green-600 rounded-xl font-medium hover:bg-green-50 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProductDetails;
