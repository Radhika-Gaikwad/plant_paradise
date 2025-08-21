import React from "react";

const categories = [
  { name: "Indoor Plants", img: "/src/assets/logo.png" },
  { name: "Outdoor Plants", img: "/src/assets/logos.png" },
  { name: "Pots & Planters", img: "/src/assets/react.svg" },
  { name: "Gardening Tools", img: "/src/assets/logo.png" },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-20 h-20 mb-4"
              />
              <h3 className="text-lg font-semibold text-green-700">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
