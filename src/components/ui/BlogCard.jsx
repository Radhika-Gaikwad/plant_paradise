import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaLink, FaShareAlt } from "react-icons/fa";

const BlogCard = ({ post }) => {
  const [shareOpen, setShareOpen] = useState(false);

  const toggleShare = () => setShareOpen(!shareOpen);

  const shareUrl = window.location.origin + "/blogs/" + post._id;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  // ✅ Always get description (fallback to content if desc not available)
  const description = post.desc || post.content || "";

  // ✅ Short preview (first 120 chars)
  const shortDesc =
    description.length > 120 ? description.substring(0, 120) + "..." : description;

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition mb-6 relative">
      {/* Share Button on Top Right */}
      <button
        onClick={toggleShare}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
      >
        <FaShareAlt size={18} />
      </button>

      {/* Left Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />

      {/* Right Content */}
      <div className="flex-1 p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-2">{post.title}</h3>

        {/* ✅ Show preview instead of full desc */}
        <p className="text-gray-600 mb-4">{shortDesc}</p>

        <Link
          to={`/blogs/${post._id}`}
          className="text-green-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>

      {/* Centered Share Modal */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-72 text-center relative">
            <h3 className="font-semibold text-lg mb-4">Share this blog</h3>
            <div className="flex justify-between mb-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://wa.me/?text=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-3 rounded-full"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`mailto:?subject=Check out this blog&body=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white p-3 rounded-full"
              >
                <FaEnvelope />
              </a>
              <button
                onClick={copyLink}
                className="bg-black text-white p-3 rounded-full"
              >
                <FaLink />
              </button>
            </div>
            <button
              onClick={toggleShare}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
