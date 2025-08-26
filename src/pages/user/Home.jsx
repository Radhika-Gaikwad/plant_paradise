import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import PlantCard from "../../components/ui/PlantCard";
import snakePlant from "../../assets/snakeplant.jpg"; 
import VideoPage from "../../components/ui/VideoPage";
import Testimonials from "../../components/ui/Testimonials";



const Home = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Plant Paradise 🌱</h1>
      <p className="mt-4 text-gray-600">
        Your one-stop shop for beautiful indoor and outdoor plants.
      </p>
      <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <header />

      {/* Main content */}
      <main className="flex-grow">
       <Hero />
       {/* Plant Card Section */}
      <PlantCard/>
      <VideoPage/>
      <Testimonials/>
      
      </main>

      {/* Footer at bottom */}
      
    </div>
    </div>
    
  );
};

export default Home;

