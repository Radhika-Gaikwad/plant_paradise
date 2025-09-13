import React, { useContext } from "react";
import { FaHeart, FaShareAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext"; // adjust path

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  if (!plant) return null;

  // 🌱 Price calculation
  const discount = Number(plant?.discount) || 0;
  const price = Number(plant?.price) || 0;
  const originalPrice =
    discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

  // 🛒 Add to cart from context
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      productId: plant._id || plant.productId, // ✅ ensure a valid unique ID
      name: plant.productName || plant.name,
      price: plant.price,
      discount: plant.discount || 0,
      rating: plant.overAllRating || 0,
      category: plant.category || "Plant",
      imageUrl: Array.isArray(plant.imageUrl)
        ? plant.imageUrl[0]
        : plant.imageUrl,
    });
    toast.success(`${plant.productName || plant.name} added to cart ✅`);
  };

  // ✅ Buy Now → add to cart + navigate to Place Order page
  const handleBuyNow = (e) => {
    e.stopPropagation();
    handleAddToCart(e);
    navigate("/place-order");
  };

  // 🚪 Open Product Details
  const handleCardClick = (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest("svg") ||
      e.target.closest("path")
    )
      return;
    navigate(`/product/${plant._id || plant.productId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full h-full flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
      {/* 🔖 Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
          {discount}% OFF
        </div>
      )}

      {/* ❤️ Wishlist + 🔗 Share */}
      <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 text-gray-400 z-20">
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-2 bg-white rounded-full shadow hover:text-red-500 hover:scale-110 transition"
        >
          <FaHeart size={16} />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-2 bg-white rounded-full shadow hover:text-green-500 hover:scale-110 transition"
        >
          <FaShareAlt size={14} />
        </button>
      </div>

      {/* 🌿 Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={
            Array.isArray(plant.imageUrl)
              ? plant.imageUrl[0]
              : plant.imageUrl || "https://via.placeholder.com/150"
          }
          alt={plant?.productName || "Plant"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📋 Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 text-center truncate">
          {plant?.productName || "Unknown Plant"}
        </h2>

        {/* ⭐ Rating */}
        <div className="flex items-center justify-center mt-2 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={
                i < (plant?.overAllRating ?? 0)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* 💰 Price */}
        <div className="flex items-center justify-center mt-3 gap-3">
          <span className="text-green-600 font-bold text-xl">₹{price}</span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* 🔘 Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-5 gap-2">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 border border-green-600 text-green-600 bg-white py-2 rounded-lg font-medium hover:bg-green-50 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
