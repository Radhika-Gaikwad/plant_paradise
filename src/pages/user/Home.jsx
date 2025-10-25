// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero";
import PlantCard from "../../components/ui/PlantCard";
import VideoPage from "../../components/ui/VideoPage";
import Testimonials from "../../components/ui/Testimonials";
import { getAllProducts } from "../../services/productApi"; // ✅ import API
import { toast } from "react-toastify"; // ✅ use react-toastify
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";

const Home = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch(); // ✅ FIXED: define dispatch

  // ✅ Get products and loading from Redux
  const { items: products, loading } = useSelector((state) => state.products);
  useEffect(() => {
  // Load cached products immediately
  dispatch(fetchProducts({}));

  // Refresh products silently after 1s
  const timer = setTimeout(() => {
    dispatch(fetchProducts({}));
  }, 1000);

  return () => clearTimeout(timer);
}, [dispatch]);

  // ✅ Fetch products from API
 /* useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getAllProducts();
        setProducts(items);
      } catch (error) {
        toast.error(error.message || "Failed to load products");
      }
    };
    fetchProducts();
  }, []);*/

  // ✅ Auto-scroll every 2s
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    const interval = setInterval(scroll, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />

        {/* 🌱 Featured Plants Section */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            🌱 Featured Plants
          </h1>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4"
          >
          {loading ? (
  <p className="text-gray-500 text-center w-full">Loading plants...</p>
) : products.length > 0 ? (
  products.map((plant, index) => (
    <div
      key={plant.productId || index}
      className="shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <PlantCard plant={plant} />
    </div>
  ))
) : (
  <p className="text-gray-500 text-center w-full">No products available 🌱</p>
)}

            
          </div>
        </section>

        <VideoPage />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;
