// src/components/VideoPage.jsx
import React from "react";
import plantationVideo from "../../assets/treeplantation.mp4"; // make sure path is correct

const VideoPage = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <video
        src={plantationVideo}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
      {/* Optional overlay for text or effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
    </div>
  );
};

export default VideoPage;
