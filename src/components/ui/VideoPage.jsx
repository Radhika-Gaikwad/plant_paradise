// src/components/VideoPage.jsx
import React from "react";
import plantationVideo from "../../assets/treeplantation.mp4"; 
import plantbenefits from "../../assets/plantbenefits.png";

const VideoPage = () => {
  return (
    <div className="w-full mt-8">
      {/* ✅ Benefits of Plants Image */}
      <div className="w-full h-screen relative overflow-hidden mt-8">
        <img
          src={plantbenefits}
          alt="Benefits of Plants"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ✅ Video Section with spacing */}
      <div className="w-full h-screen relative overflow-hidden mt-8">
        <video
          src={plantationVideo}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      </div>
    </div>
  );
};

export default VideoPage;
