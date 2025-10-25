import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllSubCategories, getAllCategories } from "../../services/categoryService";
import PlantCard from "../../components/ui/PlantCard";
import CategoryHeader from "../../components/ui/CategoryHeader";
import {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubCategory,
} from "../../services/productApi";


const ProductsC = () => {
  const { categoryId ,subCategoryId} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  {/*// ✅ Fetch categories + subcategories + products
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        const subs = await getAllSubCategories();

        if (cancelled) return;
        setCategories(cats);
        setSubCategories(subs);

        if (!categoryId || categoryId === "all") {
          setSelectedCategory("all");
          const allProds = await getAllProducts();
          if (!cancelled) setProducts(allProds);
        } else {
          setSelectedCategory(categoryId);
          const prods = await getProductsByCategory(categoryId);
          if (!cancelled) setProducts(prods);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  // ✅ Fetch when subcategory changes
  useEffect(() => {
    let cancelled = false;
    const fetchBySub = async () => {
      try {
        if (!selectedSubCategory) {
          // reset to category products
          if (!categoryId || categoryId === "all") {
            const allProds = await getAllProducts();
            if (!cancelled) setProducts(allProds);
          } else {
            const prods = await getProductsByCategory(categoryId);
            if (!cancelled) setProducts(prods);
          }
          return;
        }

        const subId = selectedSubCategory.subCategoryId || selectedSubCategory._id;
        const prods = await getProductsBySubCategory(subId);
        if (!cancelled) setProducts(prods);
      } catch (err) {
        console.error("Subcategory fetch error:", err);
      }
    };
    fetchBySub();
    return () => {
      cancelled = true;
    };
  }, [selectedSubCategory, categoryId]);

  // ✅ Handle category selection from CategoryHeader
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubCategory(null);
    if (catId === "all") navigate("/products");
    else navigate(`/products/${catId}`);
  };*/}

  
  // ✅ Load categories & subcategories
  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await getAllCategories();
        const subs = await getAllSubCategories();
        setCategories(cats || []);
        setSubCategories(subs || []);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    loadData();
  }, []);

useEffect(() => {
  if (subCategoryId && subCategories.length > 0) {
    // Find the parent category of the subcategory
    const parentSub = subCategories.find(
      (s) => s.subCategoryId === subCategoryId || s._id === subCategoryId
    );
    if (parentSub) setSelectedCategory(parentSub.categoryId); // parent category for underline
    setSelectedSubCategory(parentSub || null); // optional: highlight subcategory
  } else if (categoryId) {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
  } else {
    setSelectedCategory("all");
    setSelectedSubCategory(null);
  }
}, [categoryId, subCategoryId, subCategories]);


  // ✅ Load products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (subCategoryId) {
          const prods = await getProductsBySubCategory(subCategoryId);
          setProducts(prods || []);
        } else if (categoryId && categoryId !== "all") {
          const prods = await getProductsByCategory(categoryId);
          setProducts(prods || []);
        } else {
          const prods = await getAllProducts();
          setProducts(prods || []);
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };
    fetchProducts();
  }, [categoryId, subCategoryId]);

  // ✅ Handle category change
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubCategory(null);
    if (catId === "all") navigate("/products");
    else navigate(`/products/${catId}`);
  };


  return (
    <div className="min-h-screen">
      {/* 🌿 Category Header */}
      <CategoryHeader
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="p-6 mt-4">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/categories")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">
            {selectedCategory === "all"
              ? "All Plants"
              : categories.find((c) => c.categoryId === selectedCategory)?.categoryName ||
                "Category"}
          </h1>
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
        {subCategories.filter((s) => s.categoryId === categoryId).length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {subCategories
              .filter((s) => s.categoryId === categoryId)
              .map((sub) => (
                <div
                  key={sub._id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() =>
                    setSelectedSubCategory((prev) =>
                      prev?._id === sub._id ? null : sub
                    )
                  }
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

    {/* 🌱 Product Grid */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4 sm:gap-6
          "
        >
         {/* {products && products.length > 0 ? (
            products.map((plant) => <PlantCard key={plant._id} plant={plant} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found 🌱
            </p>
          )}*/}
          {loading ? (
      <div className="text-center py-4">Loading products...</div>
    ) : products.length > 0 ? (
      products.map(plant => <PlantCard key={plant._id} plant={plant} />)
    ) : (
      <p className="col-span-full text-center text-gray-500">No products found 🌱</p>
    )}
        </div>
      </div>
    </div>
  );
};

export default ProductsC;
