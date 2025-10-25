import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaLink, FaShareAlt } from "react-icons/fa";
import ShareModel from "./ShareModel";


const BlogCard = ({ post, wordLimit = 25 }) => {
  const [showShare, setShowShare] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const shareUrl = window.location.origin + "/blogs/" + (post._id || post.blogId);

  const description = post.description || post.content || "";

  // Truncate by wordLimit
  const words = description.split(" ");
  const isTruncated = words.length > wordLimit;
  const shortDesc = isTruncated ? words.slice(0, wordLimit).join(" ") + "..." : description;
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition mb-6 relative">
      {/* Share Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowShare(true);
        }}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10"
      >
        <FaShareAlt size={18} />
      </button>

     {/* Left Image */}
<div className="w-full md:w-1/3 h-48 md:h-auto relative">
  <img
    src={post.imageUrls?.[0] || post.imageUrl} // use imageUrls array first
    alt={post.title}
    className="w-full h-full object-cover cursor-pointer"
    onClick={() => post.imageUrls?.length > 1 && setShowGallery(true)} // open gallery on click
  />
  {/* Overlay + Counter */}
  {post.imageUrls?.length > 1 && (
    <div
      className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-sm rounded cursor-pointer"
      onClick={() => setShowGallery(true)} // click overlay opens gallery
    >
      +{post.imageUrls.length - 1} more
    </div>
  )}
</div>

      {/* Right Content */}
      <div className="flex-1 p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{shortDesc}</p>
        <Link
          to={`/blogs/${post._id || post.blogId}`}
          className="text-green-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
       {/* ✅ Gallery / Lightbox */}
      {showGallery && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowGallery(false)}
        >
          <div className="flex gap-4 overflow-x-auto max-w-full">
            {post.imageUrls.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`img-${idx}`}
                className="h-96 object-cover rounded-md flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}

      {/* Generic ShareModel */}
      {showShare && (
        <ShareModel
          shareUrl={shareUrl}
          title={`Share "${post.title}"`}
          onClose={() => setShowShare(false)}
        />
      )}
    
    </div>
  );
};

export default BlogCard;
