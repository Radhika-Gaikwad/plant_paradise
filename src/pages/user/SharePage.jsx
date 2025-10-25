import React from "react";
import { useLocation, useParams } from "react-router-dom";

const SharePage = () => {
  const { id } = useParams(); // productId from route
  const location = useLocation();
  const product = location.state?.product; // passed via navigate

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const productUrl = `${window.location.origin}/product/${product.productId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    alert("Link copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Share This Product</h2>

        <img
          src={product?.imageUrl?.[0]}
          alt={product?.productName}
          className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
        />
        <p className="text-gray-700 font-medium mb-6">{product?.productName}</p>

        <div className="flex justify-center space-x-4 mb-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-2xl"
          >
            F
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=Check this out!`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 text-2xl"
          >
            X
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(productUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 text-2xl"
          >
            WA
          </a>
        </div>

        <button
          onClick={handleCopyLink}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default SharePage;
