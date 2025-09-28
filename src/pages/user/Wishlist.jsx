// src/pages/Wishlist.jsx
import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  // Dummy data
  const wishlistItems = [
    {
      _id: "1",
      name: "Aloe Vera Plant",
      price: 250,
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Snake Plant",
      price: 400,
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Money Plant",
      price: 300,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-xl mb-4"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600 mb-2">₹{item.price}</p>
              <div className="flex gap-3 mt-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600">
                  <FaShoppingCart /> Move to Cart
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
