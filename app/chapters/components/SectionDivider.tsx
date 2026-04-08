import React from 'react';

export default function SectionDivider() {
  return (
    <div className="w-full flex justify-center items-center mt-[-16rem] mb-4 relative z-20 opacity-30 transition-opacity duration-700 hover:opacity-50">
      {/* Container for the SVG to allow responsive scaling without squishing too much */}
      <div className="w-full h-40 md:h-64 max-w-[1440px]">
        <svg
          className="w-full h-full text-blue-200"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Fill above the line to ground the network section */}
          <path
            d="M 0 0 L 320 320 L 1120 320 L 1440 0 Z"
            fill="url(#divider-gradient)"
          />
          
          {/* Main Divider Line - Split into three parts for optical thickness tuning */}
          {/* Left Slant */}
          <path
            d="M 0 0 L 320 320"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Middle Straight */}
          <path
            d="M 320 320 L 1120 320"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Right Slant */}
          <path
            d="M 1120 320 L 1440 0"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Decorative nodes at the bends */}
          <circle cx="0" cy="0" r="3" fill="currentColor" />
          <circle cx="320" cy="320" r="3" fill="currentColor" />
          <circle cx="1120" cy="320" r="3" fill="currentColor" />
          <circle cx="1440" cy="0" r="3" fill="currentColor" />

          {/* Gradients */}
          <defs>
            <linearGradient id="divider-gradient" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="currentColor" stopOpacity="0.0" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
