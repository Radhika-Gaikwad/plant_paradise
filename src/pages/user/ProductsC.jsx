import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllSubCategories, getAllCategories } from "../../services/categoryService";
import PlantCard from "../../components/ui/PlantCard";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubCategory,
} from "../../services/productApi";

const ProductsC = () => {
  const { categoryId } = useParams();
  console.log("ProductsC categoryId:", categoryId)
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  // Load categories + subcategories + products for the category
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        if (cancelled) return;
        setCategories(cats);

        const allSubs = await getAllSubCategories();
        if (cancelled) return;

        // If route param is missing or 'all', show all products
        if (!categoryId || categoryId === "all") {
          setSelectedCategory({ categoryId: "all", categoryName: "All Plants" });
          const allProds = await getAllProducts();
          if (cancelled) return;
          setProducts(allProds || []);
          setSubCategories([]);
        } else {
          // set selected category (fallback if not found)
          const cat = cats.find((c) => c.categoryId === categoryId) || {
            categoryId,
            categoryName: "Category",
          };
          setSelectedCategory(cat);

          // filter subs for this category
          const filteredSubs = allSubs.filter((s) => s.categoryId === categoryId);
          setSubCategories(filteredSubs);

          // fetch products by category via API (important)
          const prods = await getProductsByCategory(categoryId);
          if (cancelled) return;
          setProducts(prods || []);
        }

        // reset subcategory selection whenever the top-level category changes
        setSelectedSubCategory(null);
      } catch (err) {
        console.error("ProductsC fetch error:", err);
        setProducts([]);
        setSubCategories([]);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  // When a subcategory is selected (or cleared), fetch appropriate products
  useEffect(() => {
    let cancelled = false;

    const fetchForSub = async () => {
      try {
        // If no selected subcategory -> reload category products (or all)
        if (!selectedSubCategory) {
          if (!categoryId || categoryId === "all") {
            const allProds = await getAllProducts();
            if (cancelled) return;
            setProducts(allProds || []);
          } else {
            const prods = await getProductsByCategory(categoryId);
            if (cancelled) return;
            setProducts(prods || []);
          }
          return;
        }

        // toggle: use subCategoryId if available otherwise _id
        const subId = selectedSubCategory.subCategoryId || selectedSubCategory._id;
        const prods = await getProductsBySubCategory(subId);
        if (cancelled) return;
        setProducts(prods || []);
      } catch (err) {
        console.error("Fetch by subcategory error:", err);
        setProducts([]);
      }
    };

    fetchForSub();
    return () => {
      cancelled = true;
    };
  }, [selectedSubCategory, categoryId]);

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
              onClick={() =>
                setSelectedSubCategory((prev) => (prev?._id === sub._id ? null : sub))
              } // toggle selection
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
        {products && products.length > 0 ? (
          products.map((plant) => <PlantCard key={plant._id} plant={plant} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found 🌱</p>
        )}
      </div>
    </div>
  );
};

export default ProductsC;
