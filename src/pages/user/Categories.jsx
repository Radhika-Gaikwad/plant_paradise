// src/pages/Categories.jsx
import React, { useEffect, useRef, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllProducts } from "../../services/productApi";
import PlantCard from "../../components/ui/PlantCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const scrollRef = useRef(null);
const navigate = useNavigate(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        const allOption = {
          _id: "all",
          categoryId: "all",
          categoryName: "All Plants",
          imageUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        };
        setCategories([allOption, ...cats]);

        // Load all products initially
        const allProds = await getAllProducts();
        setProducts(allProds);
      } catch (err) {
        console.error("Error loading categories/products:", err);
      }
    };
    fetchData();
  }, []);

 // Handle category click
  const handleCategoryClick = async (catId) => {
    setSelectedCategory(catId);

    if (catId === "all") {
      // stay on this page, show all products
      const allProds = await getAllProducts();
      setProducts(allProds);
    } else {
      // ✅ navigate to products page with categoryId
      navigate(`/products/${catId}`);
    }
  };

  // Scroll horizontally
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowScroll(scrollWidth > clientWidth); // only enable scroll if needed
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [categories]);

  return (
    <div className="p-3 lg:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🌿 Browse by Categories
      </h1>

      {/* Desktop View with Scroll */}
      <div className="relative hidden lg:block mb-10">
        {categories.length > 8 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-green-100"
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex justify-center gap-8 overflow-x-auto no-scrollbar px-12"
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col items-center cursor-pointer min-w-[100px]"
              onClick={() => handleCategoryClick(cat.categoryId)}
            >
              <img
                src={cat.imageUrl}
                alt={cat.categoryName}
                className={`w-24 h-24 rounded-full object-cover mb-3 border-2 transition ${
                  selectedCategory === cat.categoryId
                    ? "border-green-600 scale-105"
                    : "border-transparent hover:border-green-400"
                }`}
              />
              <button
                className={`px-5 py-2 rounded-full border text-sm transition ${
                  selectedCategory === cat.categoryId
                    ? "bg-green-600 text-white border-green-600"
                    : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                {cat.categoryName}
              </button>
            </div>
          ))}
        </div>

        {categories.length > 8 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-green-100"
          >
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>
        )}
      </div>

     

  {/* Mobile View: Dropdown + Circles with Tooltip */}
<div className="sm:hidden mb-8 flex justify-between items-center">
  {/* Dropdown on right */}
  <select
    value={selectedCategory}
    onChange={(e) => handleCategoryClick(e.target.value)}
    className="p-2 text-sm border border-green-600 rounded-md text-green-600 font-medium focus:ring-2 focus:ring-green-400"
  >
    {categories.map((cat) => (
      <option key={cat._id} value={cat.categoryId}>
        {cat.categoryName}
      </option>
    ))}
  </select>
</div>

{/* Mobile circles with popup + scroll buttons */}
<div className="lg:hidden relative flex items-center mb-10">

  {/* Left Scroll Button */}
  <button
    onClick={() => {
      document.getElementById("mobileCategoryScroll").scrollBy({
        left: -50,
        behavior: "smooth",
      });
    }}
    className="absolute left-0 z-10 bg-white shadow-md p-2 rounded-full"
  >
    ◀
  </button>

  {/* Scrollable Categories */}
  <div
    id="mobileCategoryScroll"
    className="flex gap-4 px-10 overflow-x-auto scroll-smooth relative hide-scrollbar"
  >
    {categories.map((cat) => (
      <div
        key={cat._id}
        onClick={() => handleCategoryClick(cat.categoryId)}
        className="relative group cursor-pointer flex-shrink-0 w-24 h-24 flex items-center justify-center"
      >
        <img
          src={cat.imageUrl}
          alt={cat.categoryName}
          className={`w-20 h-20 rounded-full object-cover border-2 transition 
            ${
              selectedCategory === cat.categoryId
                ? "border-green-600 scale-105"
                : "border-transparent hover:border-green-400"
            }`}
        />
        {/* Popup in center */}
        <span
          className="absolute inset-0 flex items-center justify-center text-center align-center
            opacity-0 group-hover:opacity-100 
            bg-black/60 text-white text-sm font-medium rounded-full 
            transition"
        >
          {cat.categoryName}
        </span>
      </div>
    ))}
  </div>

  {/* Right Scroll Button */}
  <button
    onClick={() => {
      document.getElementById("mobileCategoryScroll").scrollBy({
        left: 50,
        behavior: "smooth",
      });
    }}
    className="absolute right-0 z-10 bg-white shadow-md p-2 rounded-full"
  >
    ▶
  </button>
</div>


      {/* Products */}
      <h2 className="text-xl font-semibold text-center mb-4">
        {selectedCategory === "all" ? "All Products 🌱" : "Category Products 🌱"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2">
        {products.length > 0 ? (
          products.map((plant) => <PlantCard key={plant._id} plant={plant} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found 🌱
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
