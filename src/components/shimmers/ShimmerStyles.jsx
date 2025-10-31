// src/components/shimmers/ShimmerStyles.jsx
import React from "react";

/**
 * Small component that injects a single shared shimmer CSS.
 * Import and render <ShimmerStyles/> once (or in each shimmer) to get animation.
 */
const ShimmerStyles = () => (
  <style>{`
    .shimmer {
      background: linear-gradient(
        90deg,
        rgba(240,240,240,1) 25%,
        rgba(224,224,224,1) 50%,
        rgba(240,240,240,1) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.2s infinite linear;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `}</style>
);

export default ShimmerStyles;
