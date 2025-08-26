import React from "react";
import { FaHeart, FaShareAlt, FaStar } from "react-icons/fa";
import snakePlant from "../../assets/snakeplant.jpg";
 // example

const PlantCard = () => {
  // Array of plant objects
  const plants = [
    {
      name: "Snake Plant",
      image: snakePlant,
      rating: 5,
      discount: "15%",
      price: 300,
      originalPrice: 350,
    },
    {
      name: "Fiddle Leaf Fig",
      image: "https://media.gardenista.com/wp-content/uploads/2019/01/fiddle-leaf-fig-tree-ikea-733x741.png",
      rating: 4,
      discount: "10%",
      price: 450,
      originalPrice: 500,
    },
    {
      name: "Aloe Vera",
      image:"https://plantorbit.com/cdn/shop/files/white-Photoroom-2025-08-10T103921.024.jpg?v=1754809193&width=600",
      rating: 5,
      discount: "20%",
      price: 200,
      originalPrice: 250,
    },
     {
      name: "Monstera",
      image: "https://www.homesake.in/cdn/shop/files/IH0F022-GR-1_Theme_951fcfb0-eb53-4f2d-960b-3d8a5a1b920d.jpg?v=1754994053&width=600",
      rating: 4,
      discount: "12%",
      price: 600,
      originalPrice: 680,
    },
    {
      name: "Peace Lily",
      image: "https://americanplantexchange.com/cdn/shop/products/peacelily-1.jpg?v=1672881763&width=823",
      rating: 5,
      discount: "18%",
      price: 350,
      originalPrice: 430,
    },
    {
      name: "ZZ Plant",
      image: "https://www.ugaoo.com/cdn/shop/products/Growpot.jpg?v=1755584321&width=750",
      rating: 4,
      discount: "10%",
      price: 400,
      originalPrice: 450,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center mt-8">
      {plants.map((plant, index) => (
        <div
          key={index}
          className="relative bg-white rounded-xl shadow-md overflow-hidden m-4
                     w-full sm:w-80 md:w-72 lg:w-64"
        >
          {/* Discount Tag */}
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
            {plant.discount} OFF
          </div>

          {/* Wishlist + Share Icons */}
          <div className="absolute top-2 right-2 flex flex-col items-center space-y-2 text-gray-500">
            <FaHeart size={18} className="cursor-pointer hover:text-red-500" />
            <FaShareAlt size={16} className="cursor-pointer hover:text-green-500" />
          </div>

          {/* Plant Image */}
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-48 sm:h-56 md:h-48 lg:h-40 object-cover"
          />

          {/* Card Content */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              {plant.name}
            </h2>

            {/* Rating centered */}
            <div className="flex items-center justify-center mt-2 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < plant.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>

            {/* Prices with INR symbol and spacing */}
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
      ))}
    </div>
  );
};

export default PlantCard;
