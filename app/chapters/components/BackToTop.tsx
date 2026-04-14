'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const accentColor = '#00629B'; // IEEE blue
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 18.75rem
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center group outline-none cursor-pointer"
      aria-label="Back to top"
    >
      <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        {/* Hexagon Fill and Outline */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {/* Fill */}
          <path
            d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
            fill={accentColor}
            className="transition-colors duration-500"
            style={{ opacity: 0.1 }}
          />
          {/* Base Background Outline (faint) */}
          <path
            d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
            fill="none"
            stroke={accentColor}
            strokeWidth="4"
            className="transition-colors duration-500"
            style={{ opacity: 0.2 }}
            strokeLinejoin="round"
          />
          {/* Progress Outline */}
          <motion.path
            d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
            fill="none"
            stroke={accentColor}
            strokeWidth="4"
            strokeLinejoin="round"
            className="transition-colors duration-500"
            style={{ pathLength: scaleProgress }}
          />
        </svg>
        
        {/* Arrow Icon */}
        <svg 
          className="w-5 h-5 relative z-10 transition-colors duration-500 group-hover:-translate-y-0.5 transform transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke={accentColor} 
          strokeWidth={3.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </motion.button>
  );
}
