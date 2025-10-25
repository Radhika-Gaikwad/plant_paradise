import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
//import { getAllCategories, getAllSubCategories } from "../../services/categoryService";
//import { getAllProducts, getProductsByCategory, getProductsBySubCategory } from "../../services/productApi";
import PlantCard from "../../components/ui/PlantCard";
import CategoryHeader from "../../components/ui/CategoryHeader";
import {
  fetchAllCategories,
  fetchAllSubCategories,
} from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux"; // ✅ add this
import { fetchProducts } from "../../redux/slices/productSlice";



/*const Categories = () => {
  const { categoryId } = useParams();
  //const [categories, setCategories] = useState([]);
  //const [selectedCategory, setSelectedCategory] = useState(categoryId || "all");
  //const [subCategories, setSubCategories] = useState([]);
  //const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  //const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { categories, subCategories, loading: catLoading } = useSelector(
    (state) => state.categories
  );
  const { items: products, loading: prodLoading } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState(categoryId || "all");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // ✅ Fetch categories + subcategories once
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch categories + subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        const allOption = {
          _id: "all",
          categoryId: "all",
          categoryName: "All Plants",
          imageUrl:
            "https://t4.ftcdn.net/jpg/09/01/66/49/360_F_901664916_4aDMt51PpSI1LyvTdd8mAcbr73kWivsm.jpg",
        };
        setCategories([allOption, ...cats]);

        const subs = await getAllSubCategories();
        setSubCategories(subs || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Fetch products based on selected category or subcategory
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedSubCategory) {
          const prods = await getProductsBySubCategory(selectedSubCategory._id);
          setProducts(prods || []);
        } else if (!selectedCategory || selectedCategory === "all") {
          const allProds = await getAllProducts();
          setProducts(allProds || []);
        } else {
          const catProds = await getProductsByCategory(selectedCategory);
          setProducts(catProds || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedSubCategory]);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch all categories + subcategories on mount
  useEffect(() => {
  dispatch(fetchAllCategories());
  dispatch(fetchAllSubCategories());
}, [dispatch]);

  // ✅ Fetch products based on selected filters
  useEffect(() => {
    if (selectedSubCategory) {
      dispatch(fetchProductsBySubCategory(selectedSubCategory._id));
    } else if (!selectedCategory || selectedCategory === "all") {
      dispatch(fetchAllProducts());
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory, selectedSubCategory]);

  // ✅ Auto-scroll animation for category bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);*/

  const Categories = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { categories, subCategories } = useSelector(
    (state) => state.categories
  );
  const { items: products, loading: prodLoading } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] = useState(categoryId || "all");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // ✅ Fetch categories + subcategories on mount
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubCategories());
  }, [dispatch]);

  // ✅ Fetch products based on selected filters
 useEffect(() => {
  const timer = setTimeout(() => {
    if (selectedSubCategory) {
      dispatch(fetchProducts({ subCategoryId: selectedSubCategory._id }));
    } else if (!selectedCategory || selectedCategory === "all") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProducts({ categoryId: selectedCategory }));
    }
  }, 1000);
  return () => clearTimeout(timer);
}, [dispatch, selectedCategory, selectedSubCategory]);


  // ✅ Auto-scroll animation for category bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-0">
      {/* Category Header */}
      <CategoryHeader
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Scrollable row with all categories + all subcategories */}
      <div className="mb-6">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide py-2"
        >
          {/* Categories */}
          {categories.map((cat) => (
            <div
              key={cat.categoryId}
              className="flex-shrink-0 cursor-pointer flex flex-col items-center"
              onClick={() => {
                setSelectedCategory(cat.categoryId);
                setSelectedSubCategory(null); // reset subcategory
              }}
            >
              <img
                src={cat.imageUrl}
                alt={cat.categoryName}
                className={`w-28 h-28 object-cover rounded-lg border-2 transition ${
                  selectedCategory === cat.categoryId
                    ? "border-green-600"
                    : "border-transparent hover:border-green-400"
                }`}
              />
              <p className="text-center mt-2 font-medium">{cat.categoryName}</p>
            </div>
          ))}

          {/* All Subcategories (no filter) */}
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="flex-shrink-0 cursor-pointer flex flex-col items-center"
              onClick={() =>
                setSelectedSubCategory(
                  selectedSubCategory?._id === sub._id ? null : sub
                )
              }
            >
              <img
                src={sub.imageUrl}
                alt={sub.subCategoryName}
                className={`w-28 h-28 object-cover rounded-lg border-2 transition ${
                  selectedSubCategory?._id === sub._id
                    ? "border-green-600"
                    : "border-transparent hover:border-green-400"
                }`}
              />
              <p className="text-center mt-2 font-medium">{sub.subCategoryName}</p>
            </div>
          ))}
        </div>
      </div>
    {/* Product Section */}
      <h3 className="text-lg md:text-xl font-semibold text-center mb-4">
        All Products 🌱
      </h3>

      {/* Product Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-4 
          sm:gap-6
        "
      ></div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {prodLoading ? (
    <p className="col-span-full text-center text-gray-500">Loading products...</p>
  ) : products.length > 0 ? (
    products.map((plant) => <PlantCard key={plant._id} plant={plant} />)
  ) : (
    <p className="col-span-full text-center text-gray-500">No products found 🌱</p>
  )}
</div>

    </div>
  );
};

export default Categories;
