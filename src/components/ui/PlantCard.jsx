// src/components/PlantCard.jsx
import React from "react";
import { FaHeart, FaShareAlt, FaStar } from "react-icons/fa";

const PlantCard = ({ plant }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 w-64 sm:w-72 md:w-72 lg:w-78">
      {/* Discount Tag */}
      <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
        {plant.discount} OFF
      </div>

      {/* Wishlist + Share Icons */}
      <div className="absolute top-2 right-2 flex flex-col items-center space-y-2 text-gray-500">
        <FaHeart size={18} className="cursor-pointer hover:text-red-500" />
        <FaShareAlt size={16} className="cursor-pointer hover:text-green-500" />
      </div>

      {/* Image */}
      <img
        src={plant.image}
        alt={plant.name}
        className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {plant.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center justify-center mt-2 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={i < plant.rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-center mt-2 gap-3">
          <span className="text-green-600 font-bold text-lg">₹{plant.price}</span>
          <span className="text-gray-400 line-through text-sm">
            ₹{plant.originalPrice}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded">
            Add to Cart
          </button>
          <button className="flex-1 bg-white border border-green-500 text-green-500 hover:bg-green-50 py-2 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
