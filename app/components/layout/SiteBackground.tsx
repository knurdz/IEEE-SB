'use client';

import React from 'react';

interface SiteBackgroundProps {
  showTopFade?: boolean;
  showBottomFade?: boolean;
}

export default function SiteBackground({ showTopFade = false, showBottomFade = true }: SiteBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <polygon id="hex-bg" points="0,-80 69.28,-40 69.28,40 0,80 -69.28,40 -69.28,-40" />
          
          <g id="hexBlock-bg">
            {/* Standard Grid - Very Subtle */}
            <use href="#hex-bg" x="0.0" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="138.6" y="0.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(277.1, 0.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" transform="translate(415.7, 0.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="554.2" y="0.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="692.8" y="0.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="831.4" y="0.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="969.9" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1247.0" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1385.6" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1524.2" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1662.7" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1801.3" y="0.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1939.8" y="0.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
            <use href="#hex-bg" x="-69.3" y="120.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="69.3" y="120.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="207.8" y="120.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="346.4" y="120.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="485.0" y="120.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="762.1" y="120.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(900.6, 120.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1177.8" y="120.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1316.3" y="120.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
            <use href="#hex-bg" x="1454.9" y="120.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1593.4" y="120.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1732.0" y="120.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
            <use href="#hex-bg" x="1870.6" y="120.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="0.0" y="240.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="138.6" y="240.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(277.1, 240.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="415.7" y="240.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1524.2" y="240.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
            <use href="#hex-bg" x="1662.7" y="240.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1801.3" y="240.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1939.8" y="240.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="346.4" y="360.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="485.0" y="360.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1593.4" y="360.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(1732.0, 360.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" transform="translate(1870.6, 360.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="415.7" y="480.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1524.2" y="480.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(1662.7, 480.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1801.3" y="480.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1939.8" y="480.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="346.4" y="600.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(1454.9, 600.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" transform="translate(1593.4, 600.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1732.0" y="600.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1870.6" y="600.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1662.7" y="720.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(1801.3, 720.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1939.8" y="720.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="-69.3" y="840.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="69.3" y="840.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="207.8" y="840.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="346.4" y="840.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
            <use href="#hex-bg" x="485.0" y="840.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1593.4" y="840.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1732.0" y="840.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1870.6" y="840.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="0.0" y="960.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="138.6" y="960.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(277.1, 960.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="415.7" y="960.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
            <use href="#hex-bg" x="1247.0" y="960.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1385.6" y="960.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(1524.2, 960.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1662.7" y="960.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
            <use href="#hex-bg" x="1801.3" y="960.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
            <use href="#hex-bg" x="1939.8" y="960.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="-69.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="69.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(207.8, 1080.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="346.4" y="1080.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="485.0" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="623.5" y="1080.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
            <use href="#hex-bg" x="762.1" y="1080.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="900.6" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(1039.2, 1080.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1177.8" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1316.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" />
            <use href="#hex-bg" x="1454.9" y="1080.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1593.4" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1732.0" y="1080.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1870.6" y="1080.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="0.0" y="1200.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="138.6" y="1200.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="277.1" y="1200.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="415.7" y="1200.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="554.2" y="1200.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" transform="translate(692.8, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" transform="translate(831.4, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" transform="translate(969.9, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" transform="translate(1108.5, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.03)" stroke="none" />
            <use href="#hex-bg" x="1247.0" y="1200.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1385.6" y="1200.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1524.2" y="1200.0" fill="rgba(37,99,235,0.02)" stroke="rgba(59,130,246,0.03)" strokeWidth="1" />
            <use href="#hex-bg" x="1662.7" y="1200.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1801.3" y="1200.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
            <use href="#hex-bg" x="1939.8" y="1200.0" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
          </g>

          <pattern id="chaptersHexPattern" patternUnits="userSpaceOnUse" width="2010" height="1280">
            <use href="#hexBlock-bg" x="0" y="40" />
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#chaptersHexPattern)" />
      </svg>

      {/* Top Transition Overlay */}
      {showTopFade && (
        <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none z-10" />
      )}

      {/* Bottom Transition Overlay */}
      {showBottomFade && (
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
}
