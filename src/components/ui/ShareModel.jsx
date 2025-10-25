import React from "react";
import ReactDOM from "react-dom";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify"; // ✅ use react-toastify



const ShareModel = ({ shareUrl, onClose, title = "Share This Page" }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!"); // ✅ toast notification
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-center mb-4">Share This Product</h2>

        <div className="flex justify-center space-x-4 mb-5">
          {/* same icons as before */}
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"><FaFacebookF size={18} /></a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"><FaTwitter size={18} /></a>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition"><FaWhatsapp size={18} /></a>
          <a href={`mailto:?subject=Check this product&body=${encodeURIComponent(shareUrl)}`} className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"><FaEnvelope size={18} /></a>
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          📋 Copy Link
        </button>
      </div>
    </div>,
    document.body // 👈 portal here
  );
};

export default ShareModel;
