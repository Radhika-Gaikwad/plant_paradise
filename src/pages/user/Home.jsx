// src/pages/Home.jsx
import React, { useEffect, useRef } from "react";
import Hero from "../../components/Hero";
import PlantCard from "../../components/ui/PlantCard";
import VideoPage from "../../components/ui/VideoPage";
import Testimonials from "../../components/ui/Testimonials";
import { plants } from "../../data/plants";

const Home = () => {
  const scrollRef = useRef(null);

  // Auto-scroll every 2s
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

      {/* ✅ Main content */}
      <main className="flex-grow">
        <Hero />

        {/* 🌱 Featured Plants Section */}
        <section className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            🌱 Featured Plants
          </h1>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth px-4"
          >
            {[...plants, ...plants].map((plant, index) => (
              <PlantCard key={index} plant={plant} />
            ))}
          </div>
        </section>

        {/* 🎥 Video Section */}
        <VideoPage />

        {/* ⭐ Testimonials Section */}
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;
