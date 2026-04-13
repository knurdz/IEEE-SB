'use client';

import React from 'react';

/**
 * AnimatedLogoProcedural
 * 
 * To achieve 100% visual parity with the original logo asset, this component 
 * uses the exact SVG structure and PNG layers from the logo project.
 * 
 * The previous procedural version was optimized for performance (32MB -> 5KB),
 * but for absolute visual consistency, we are reverting to the original assets
 * with fixed absolute pathing to resolve the rendering issues in Next.js.
 */
export default function AnimatedLogoProcedural({ className }: { className?: string }) {
  const VIEWBOX_SIZE = 2048;
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={VIEWBOX_SIZE} 
      height={VIEWBOX_SIZE} 
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} 
      className={className}
      role="img" 
      aria-label="IEEE SB animated logo" 
      shapeRendering="geometricPrecision"
    >
      <title>IEEE SB animated logo</title>
      
      {/* Background layer (Transparent) */}
      <rect width="100%" height="100%" fill="none" />
      
      {/* Moving Background Layer - Layer 01 (Rotating Hexagon Field) */}
      <g className="moving-layer moving-layer-1">
        <animateTransform 
          attributeName="transform" 
          attributeType="XML" 
          type="rotate" 
          from="0 1024.0 1024.0" 
          to="360 1024.0 1024.0" 
          dur="40s" 
          repeatCount="indefinite" 
        />
        <image 
          href="/logo-animated/ieee-sb-logo-animated-layer-01.png" 
          x="0" 
          y="0" 
          width={VIEWBOX_SIZE} 
          height={VIEWBOX_SIZE} 
          preserveAspectRatio="none" 
        />
      </g>
      
      {/* Static Foreground Layer (Center Logo & Branding) */}
      <image 
        href="/logo-animated/ieee-sb-logo-animated-center.png" 
        x="0" 
        y="0" 
        width={VIEWBOX_SIZE} 
        height={VIEWBOX_SIZE} 
        preserveAspectRatio="none" 
      />
    </svg>
  );
}
