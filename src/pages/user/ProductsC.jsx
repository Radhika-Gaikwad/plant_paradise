// src/pages/ProductsC.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllSubCategories, getAllCategories } from "../../services/categoryService";
import { getAllProducts } from "../../services/productApi";
import PlantCard from "../../components/ui/PlantCard";

const ProductsC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  // Load categories + products by categoryId
  useEffect(() => {
    const fetchData = async () => {
      const cats = await getAllCategories();
      setCategories(cats);

      const allProds = await getAllProducts();

      if (categoryId === "all") {
        setSelectedCategory({ categoryId: "all", categoryName: "All Plants" });
        setProducts(allProds);
        setSubCategories([]);
      } else {
        const cat = cats.find((c) => c.categoryId === categoryId);
        setSelectedCategory(cat);

        const subs = await getAllSubCategories();
        const filteredSubs = subs.filter((s) => s.categoryId === categoryId);
        setSubCategories(filteredSubs);

        // ✅ Correct field: product.category
        const filteredProds = allProds.filter((p) => p.category === categoryId);
        setProducts(filteredProds);
      }

      // Reset subcategory selection when category changes
      setSelectedSubCategory(null);
    };
    fetchData();
  }, [categoryId]);

  // Filter products by subcategory
  useEffect(() => {
    const fetchProds = async () => {
      if (!selectedSubCategory) return;
      const allProds = await getAllProducts();

      // ✅ Correct field: product.subCategory
      const filtered = allProds.filter(
        (p) => p.subCategory === selectedSubCategory.subCategoryId
      );
      setProducts(filtered);
    };
    fetchProds();
  }, [selectedSubCategory]);

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/categories")}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{selectedCategory?.categoryName}</h1>
        <button
          onClick={() => setShowCategorySelector(!showCategorySelector)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Change Category
        </button>
      </div>

      {/* Change Category Popup */}
      {showCategorySelector && (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                navigate(`/products/${cat.categoryId}`);
                setShowCategorySelector(false);
              }}
            >
              <img
                src={cat.imageUrl}
                alt={cat.categoryName}
                className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-green-500"
              />
              <span>{cat.categoryName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Subcategories */}
      {subCategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedSubCategory(sub)}
            >
              <img
                src={sub.imageUrl}
                alt={sub.subCategoryName}
                className={`w-24 h-24 rounded-full object-cover mb-2 border-2 ${
                  selectedSubCategory?._id === sub._id
                    ? "border-green-600"
                    : "border-transparent hover:border-green-400"
                }`}
              />
              <button
                className={`px-4 py-2 rounded-full border transition ${
                  selectedSubCategory?._id === sub._id
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-green-600 border-green-600 hover:bg-green-100"
                }`}
              >
                {sub.subCategoryName}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Products */}
      <h3 className="text-lg font-semibold text-center mb-4">
        {selectedSubCategory
          ? `Products in ${selectedSubCategory.subCategoryName}`
          : selectedCategory?.categoryId === "all"
          ? "All Products 🌱"
          : `Products in ${selectedCategory?.categoryName}`}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default ProductsC;
