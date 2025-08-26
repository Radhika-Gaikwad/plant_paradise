import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // <-- Import the new header
import Footer from "../components/Footer";


const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
      
    </div>
  );
};

export default UserLayout;