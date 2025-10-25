import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSeedling, FaLeaf, FaTree } from "react-icons/fa";
import hero1 from "../assets/hero1.jpg";
import hero3 from "../assets/hero3.jpg";
import hero5 from "../assets/hero5.jpg";
import { useNavigate } from "react-router-dom";


// Images and slogans
const plantImages = [
  { src: hero1, slogan: "Bring Green to Your Home 🌱" },
  { src: hero3, slogan: "Freshness That Lasts 🌿" },
  { src: hero5, slogan: "Nature at Your Doorstep 🌼" },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % plantImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row overflow-hidden">
      {/* Left Section (rotating images) */}
      <div className="w-full lg:w-3/4 relative flex items-center justify-center h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen">
        <AnimatePresence>
          <motion.img
            key={plantImages[index].src}
            src={plantImages[index].src}
            alt="Plant"
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Text Overlay */}
        <div className="absolute text-center px-4 sm:px-6 md:px-12 bg-black/40 rounded-xl py-6 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {plantImages[index].slogan}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-green-100">
            Explore Plant Paradise – Your one-stop shop for indoor & outdoor greenery.
          </p>
          <button
           onClick={() => navigate("/categories")}
           className="mt-4 sm:mt-6 bg-green-600 hover:bg-green-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md text-sm sm:text-base md:text-lg"
          >
           Shop Now
          </button>
        </div>
      </div>

      {/* Right Section (feature cards) */}
      <div className="w-full lg:w-1/4 flex flex-col p-4 sm:p-6 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center flex flex-col justify-center flex-1">
          <FaSeedling className="text-green-600 text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3" />
          <p className="text-md sm:text-lg font-semibold">Wide variety of plants</p>
          <p className="text-xs sm:text-sm text-gray-600">Choose from 100+ fresh options</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center flex flex-col justify-center flex-1">
          <FaLeaf className="text-green-600 text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3" />
          <p className="text-md sm:text-lg font-semibold">Eco-friendly care</p>
          <p className="text-xs sm:text-sm text-gray-600">Sustainable & healthy growth</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-center flex flex-col justify-center flex-1">
          <FaTree className="text-green-600 text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3" />
          <p className="text-md sm:text-lg font-semibold">Free delivery</p>
          <p className="text-xs sm:text-sm text-gray-600">On all orders above ₹499</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
