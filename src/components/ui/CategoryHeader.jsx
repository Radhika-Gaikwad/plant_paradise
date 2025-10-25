import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCategories, getAllSubCategories } from "../../services/categoryService";

const CategoryHeader = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showHeaderPaths = ["/categories", "/subcategory", "/products", "/product"];
  const shouldShowHeader = showHeaderPaths.some((path) =>
    location.pathname.includes(path)
  );

  // Fetch categories + subcategories
  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await getAllCategories();
        const subs = await getAllSubCategories();
        const allOption = {
          _id: "all",
          categoryId: "all",
          categoryName: "All Plants",
        };
        setCategories([allOption, ...cats]);
        setSubCategories(subs || []);

        // Determine active parent category
        if (selectedCategory) {
          const sub = subs.find((s) => s.subCategoryId === selectedCategory);
          if (sub) {
            setActiveParentCategory(sub.categoryId);
          } else {
            setActiveParentCategory(selectedCategory);
          }
        } else {
          const pathParts = location.pathname.split("/");
          if (pathParts[1] === "products" && pathParts[2] && pathParts[2] !== "sub") {
            setActiveParentCategory(pathParts[2]);
          } else if (pathParts[2] === "sub" && pathParts[3]) {
            const subCat = subs.find((s) => s.subCategoryId === pathParts[3]);
            if (subCat) setActiveParentCategory(subCat.categoryId);
          } else if (location.pathname === "/categories") {
            setActiveParentCategory("all");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [location.pathname, selectedCategory]);

  // Handle main category click
  const handleCategoryClick = (catId) => {
    onCategorySelect(catId);
    setActiveParentCategory(catId);
    setOpenCategoryId(null);
    setMenuOpen(false);

    if (catId === "all") navigate("/categories");
    else navigate(`/products/${catId}`);
  };

  // Handle arrow toggle
  const handleArrowClick = (categoryId) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  // Handle subcategory click
  const handleSubCategoryClick = (subCategoryId, parentCategoryId) => {
    onCategorySelect(parentCategoryId);
    setActiveParentCategory(parentCategoryId);
    setOpenCategoryId(null);
    setMenuOpen(false);
    navigate(`/products/sub/${subCategoryId}`);
  };

  if (!shouldShowHeader) return null;

  return (
    <>
      {/* ✅ Desktop Header */}
      <div className="hidden md:block relative w-full py-6 text-white shadow-md z-[1000]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/header.png')",
          }}
        />
        <div className="flex justify-center gap-4 flex-wrap px-2 w-full relative z-10">
          {categories.map((cat) => (
            <div key={cat.categoryId} className="relative flex items-center gap-1">
              <button
                onClick={() => handleCategoryClick(cat.categoryId)}
                className={`px-2 py-1 font-semibold text-sm uppercase tracking-small transition relative focus:outline-none
                ${
                  activeParentCategory === cat.categoryId
                    ? "text-green-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white"
                    : "hover:text-green-200"
                }`}
              >
                {cat.categoryName}
              </button>

              {/* Dropdown Arrow */}
              {cat.categoryId !== "all" && (
                <button
                  onClick={() => handleArrowClick(cat.categoryId)}
                  className="flex items-center focus:outline-none"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openCategoryId === cat.categoryId ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {/* Dropdown List */}
              {openCategoryId === cat.categoryId && (
                <div className="absolute left-0 top-full mt-2 bg-white text-green-800 rounded-md shadow-lg py-2 w-48 z-[1100]">
                  {subCategories
                    .filter((s) => s.categoryId === cat.categoryId)
                    .map((sub) => (
                      <button
                        key={sub.subCategoryId}
                        onClick={() =>
                          handleSubCategoryClick(sub.subCategoryId, cat.categoryId)
                        }
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-green-100"
                      >
                        {sub.subCategoryName}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Mobile / Tablet Sidebar */}
      <div className="md:hidden bg-green-700 text-white flex items-center justify-between px-4 py-3 shadow-md z-[1050]">
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold">Categories</h2>
      </div>

      {/* Sidebar + Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-white text-green-800 shadow-lg z-[1000] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold">All Categories</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col">
                {categories.map((cat) => (
                  <div key={cat.categoryId} className="border-b border-gray-200">
                    <button
                      onClick={() =>
                        cat.categoryId === "all"
                          ? handleCategoryClick(cat.categoryId)
                          : handleArrowClick(cat.categoryId)
                      }
                      className="w-full text-left px-4 py-3 flex justify-between items-center font-medium hover:bg-green-50"
                    >
                      {cat.categoryName}
                      {cat.categoryId !== "all" && <ChevronDown size={16} />}
                    </button>

                    {openCategoryId === cat.categoryId && (
                      <div className="bg-green-50">
                        {subCategories
                          .filter((s) => s.categoryId === cat.categoryId)
                          .map((sub) => (
                            <button
                              key={sub.subCategoryId}
                              onClick={() =>
                                handleSubCategoryClick(sub.subCategoryId, cat.categoryId)
                              }
                              className="block w-full text-left px-8 py-2 text-sm hover:bg-green-100"
                            >
                              {sub.subCategoryName}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoryHeader;
