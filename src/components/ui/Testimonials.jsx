// src/components/TestimonialsLoop.jsx
import React, { useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    name: "Dhinesh",
    rating: 5,
    comment: "The plants arrived fresh and healthy! Absolutely love them.",
  },
  {
    name: "Mukilan",
    rating: 5,
    comment: "The unboxing experience was amazing! The plant looks perfect in my living room.",
  },
  {
    name: "Priya",
    rating: 5,
    comment: "My home feels greener and fresher thanks to these beautiful plants!",
  },
  {
    name: "Arun",
    rating: 5,
    comment: "Fast delivery and well-packaged plants. Highly recommend Plant Paradise!",
  },
];

const Testimonials = () => {
  const carouselRef = useRef();

  useEffect(() => {
    let scrollAmount = 0;
    const cardWidth =
      carouselRef.current.scrollWidth / (testimonialsData.length * 2);

    const interval = setInterval(() => {
      if (carouselRef.current) {
        scrollAmount += cardWidth;
        if (scrollAmount >= carouselRef.current.scrollWidth / 2) {
          scrollAmount = 0; // reset back to start
        }
        carouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-50 py-16 px-4 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        🌱 What People Say About Our Plants 🌱
      </h2>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {[...testimonialsData, ...testimonialsData].map(
          (testimonial, index) => (
            <div
              key={index}
              className="w-[95%] sm:w-[60%] md:w-[45%] lg:w-[30%] xl:w-[25%] 
              bg-white p-6 md:p-10 rounded-2xl flex-shrink-0 shadow-xl"
            >
              {/* Profile + stars */}
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-green-200 flex items-center justify-center text-white font-bold mr-4 text-xl md:text-2xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl">{testimonial.name}</h3>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                {testimonial.comment}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Testimonials;
