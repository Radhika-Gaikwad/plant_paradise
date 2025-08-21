import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products, addToCart }) => {
  const navigate = useNavigate();

  // Handle cart validation before adding
  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      alert("Invalid product!");
      return;
    }
    addToCart(product); // call parent’s addToCart method
    alert(`${product.name} added to cart!`);
  };

  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-[350px]"
          >
            {/* Image Container */}
            <div className="flex items-center justify-center h-[200px] bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain p-2"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
