import React from "react";
import { FaHeart, FaShareAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  if (!plant) return null;

  // before return
const discount = Number(plant?.discount) || 0;
const price = Number(plant?.price) || 0;
const originalPrice =
  discount > 0 ? Math.round(price / (1 - discount / 100)) : price;


  const handleCardClick = (e) => {
    // prevent navigation if clicked on buttons
    if (
      e.target.closest("button") ||
      e.target.closest("svg") ||
      e.target.closest("path")
    )
      return;
    navigate(`/product/${plant.productId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full h-full flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
{/* Discount Tag */}
{discount > 0 && (
  <div className="absolute top-3 left-3 z-30 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full shadow-md">
    {discount}% OFF
  </div>
)}

      {/* Wishlist + Share Icons */}
      <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 text-gray-400 z-20">
        <button className="p-2 bg-white rounded-full shadow hover:text-red-500 hover:scale-110 transition">
          <FaHeart size={16} />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:text-green-500 hover:scale-110 transition">
          <FaShareAlt size={14} />
        </button>
      </div>
{/* Image + Video on Hover */}
<div className="relative w-full h-52 overflow-hidden">
  {/* Image always visible */}
  <img
    src={plant?.imageUrl?.[0] || "https://via.placeholder.com/150"}
    alt={plant?.productName || "Plant"}
    className={`w-full h-full object-cover bg-repeat transition-opacity duration-300 ${
      plant?.video?.length > 0 ? "group-hover:opacity-0" : ""
    }`}
  />

  {/* Show video only if available */}
  {plant?.video?.length > 0 && (
    <video
      src={plant.video[0]} // ✅ Use first video
      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
     autoPlay   // ✅ autoplay main video
    muted
    loop
    playsInline
    controls
    />
  )}
</div>


      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 text-center truncate">
          {plant?.productName || "Unknown Plant"}
        </h2>

        {/* Rating */}
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

        {/* Price */}
        <div className="flex items-center justify-center mt-3 gap-3">
          <span className="text-green-600 font-bold text-xl">₹{price}</span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-5 gap-2 z-20 relative">
          <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium shadow hover:opacity-90 transition">
            Add to Cart
          </button>
          <button className="flex-1 border border-green-500 text-green-600 bg-white py-2 rounded-lg font-medium hover:bg-green-50 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
