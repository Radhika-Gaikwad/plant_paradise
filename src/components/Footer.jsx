import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white px-4 md:px-16 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        
        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-Yellow">About Us</h2>
          <p className="text-gray-200">
            Welcome to Plant Paradise — your go-to destination for lush, healthy plants 
            and gardening essentials. We bring you nature’s beauty, delivered right to your home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-yellow">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-300">Home</a></li>
            <li><a href="#" className="hover:text-green-300">Contact</a></li>
            <li><a href="#" className="hover:text-green-300">About</a></li>
            <li><a href="#" className="hover:text-green-300">Delivery</a></li>
            <li><a href="#" className="hover:text-green-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-Yellow">Follow Us</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FaFacebookF className="text-blue-500 text-xl" />
              <a href="#" className="hover:text-green-300">Facebook</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaTwitter className="text-sky-400 text-xl" />
              <a href="#" className="hover:text-green-300">Twitter</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaInstagram className="text-pink-500 text-xl" />
              <a href="#" className="hover:text-green-300">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-green-600 text-center py-4 text-gray-200 text-sm">
        <p>
          &copy; 2025 PlantParadise.com - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
