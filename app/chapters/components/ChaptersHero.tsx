'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUpTransition } from '@/lib/motion';

export default function ChaptersHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[25vh] md:min-h-[30vh] flex items-center justify-center overflow-hidden bg-transparent pb-0"
    >
      <style>{`
        @keyframes circuit-pulse {
          0% { stroke-dashoffset: 120; opacity: 0; }
          1% { opacity: 1; }
          20% { stroke-dashoffset: -20; opacity: 1; } 
          21% { opacity: 0; }
          100% { stroke-dashoffset: -20; opacity: 0; }
        }
        
        .animate-path {
          stroke-dasharray: 20 100;
          animation: circuit-pulse 40s linear infinite both;
        }

        .hero-tagline-1 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.25em;
          color: #008be6;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          text-shadow: 0 4px 12px rgba(0, 139, 230, 0.15);
        }

        .hero-tagline-2 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-weight: 700; /* standard bold to avoid synthetic bolding */
          font-size: 28px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #00579d 0%, #008be6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 12px rgba(23, 53, 153, 0.1);
        }
          
        @media (min-width: 480px) {
           .hero-tagline-2 {
              font-size: 40px;
           }
        }

        @media (min-width: 768px) {
           .hero-tagline-2 {
              font-size: 64px;
           }
        }
      `}</style>
      
      {/* Background hexagon grid based on home hero */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }}
      >
        <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full opacity-80 md:opacity-100" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <polygon id="hex" points="0,-80 69.28,-40 69.28,40 0,80 -69.28,40 -69.28,-40" />
            <linearGradient id="beamGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(120,190,255,0)" />
              <stop offset="35%" stopColor="rgba(120,190,255,0)" />
              <stop offset="50%" stopColor="rgba(120,190,255,0.38)" />
              <stop offset="65%" stopColor="rgba(120,190,255,0)" />
              <stop offset="100%" stopColor="rgba(120,190,255,0)" />
            </linearGradient>
            <linearGradient id="beamGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(140,200,255,0)" />
              <stop offset="35%" stopColor="rgba(140,200,255,0)" />
              <stop offset="50%" stopColor="rgba(140,200,255,0.38)" />
              <stop offset="65%" stopColor="rgba(140,200,255,0)" />
              <stop offset="100%" stopColor="rgba(140,200,255,0)" />
            </linearGradient>
            <g id="hexBlock">
              <use href="#hex" x="0.0" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="138.6" y="0.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" transform="translate(277.1, 0.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" transform="translate(415.7, 0.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="554.2" y="0.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="692.8" y="0.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="831.4" y="0.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="969.9" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1247.0" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1385.6" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1524.2" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1662.7" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1801.3" y="0.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1939.8" y="0.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="-69.3" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="69.3" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="207.8" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="346.4" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="485.0" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="762.1" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" transform="translate(900.6, 120.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1177.8" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1316.3" y="120.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1454.9" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1593.4" y="120.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1732.0" y="120.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1870.6" y="120.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="0.0" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="138.6" y="240.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(277.1, 240.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="415.7" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1524.2" y="240.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1662.7" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1801.3" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1939.8" y="240.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="346.4" y="360.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="485.0" y="360.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1593.4" y="360.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(1732.0, 360.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" transform="translate(1870.6, 360.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="415.7" y="480.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1524.2" y="480.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(1662.7, 480.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1801.3" y="480.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1939.8" y="480.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="346.4" y="600.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" transform="translate(1454.9, 600.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" transform="translate(1593.4, 600.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1732.0" y="600.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1870.6" y="600.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1662.7" y="720.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(1801.3, 720.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1939.8" y="720.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="-69.3" y="840.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="69.3" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="207.8" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="346.4" y="840.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="485.0" y="840.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1593.4" y="840.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1732.0" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1870.6" y="840.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="0.0" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="138.6" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(277.1, 960.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="415.7" y="960.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1247.0" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1385.6" y="960.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(1524.2, 960.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1662.7" y="960.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1801.3" y="960.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1939.8" y="960.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="-69.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="69.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" transform="translate(207.8, 1080.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="346.4" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="485.0" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="623.5" y="1080.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="762.1" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="900.6" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" transform="translate(1039.2, 1080.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1177.8" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1316.3" y="1080.0" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
              <use href="#hex" x="1454.9" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1593.4" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1732.0" y="1080.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1870.6" y="1080.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="0.0" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="138.6" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="277.1" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="415.7" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="554.2" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" transform="translate(692.8, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" transform="translate(831.4, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" transform="translate(969.9, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" transform="translate(1108.5, 1200.0) scale(0.6)" fill="rgba(37,99,235,0.06)" stroke="none" />
              <use href="#hex" x="1247.0" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1385.6" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1524.2" y="1200.0" fill="rgba(37,99,235,0.03)" stroke="rgba(59,130,246,0.05)" strokeWidth="1" />
              <use href="#hex" x="1662.7" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1801.3" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
              <use href="#hex" x="1939.8" y="1200.0" fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
            </g>
            <g id="hexStrokesLeft">
              <use href="#hex" x="0.0" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="554.2" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="692.8" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="831.4" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="969.9" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="-69.3" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="69.3" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="207.8" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="762.1" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="0.0" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="415.7" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="360.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="360.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="600.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="-69.3" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="69.3" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="207.8" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="0.0" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="415.7" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="-69.3" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="69.3" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="346.4" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="485.0" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="623.5" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="762.1" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="900.6" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="0.0" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="138.6" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="277.1" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="415.7" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="554.2" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
            </g>
            <g id="hexStrokesRight">
              <use href="#hex" x="1247.0" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1385.6" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1524.2" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="0.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1177.8" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1316.3" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1454.9" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="120.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1524.2" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="240.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="360.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="480.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="480.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="600.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="600.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="720.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="720.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="840.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1247.0" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1385.6" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="960.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1177.8" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1316.3" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1454.9" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1593.4" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1732.0" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1870.6" y="1080.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1247.0" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1385.6" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1524.2" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1662.7" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1801.3" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
              <use href="#hex" x="1939.8" y="1200.0" fill="black" stroke="white" strokeWidth="3" />
            </g>
            <mask id="hexMaskLeft">
              <rect width="1920" height="1080" fill="black" />
              <use href="#hexStrokesLeft" />
            </mask>
            <mask id="hexMaskRight">
              <rect width="1920" height="1080" fill="black" />
              <use href="#hexStrokesRight" />
            </mask>
          </defs>
          <g>
            <use href="#hexBlock" />
            <rect y="0" width="750" height="1080" fill="url(#beamGradientLeft)" mask="url(#hexMaskLeft)">
              <animate attributeName="x" values="-750; 750" dur="10s" repeatCount="indefinite" />
            </rect>
            <rect y="0" width="850" height="1080" fill="url(#beamGradientRight)" mask="url(#hexMaskRight)">
              <animate attributeName="x" values="750; 2700" dur="13s" begin="-5s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-0 flex flex-col items-center"
        style={{ y, opacity }}
      >
        <motion.h1 
            className="hero-tagline-2 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fadeUpTransition(0.4, 0.8)}
        >
          Our Technical Chapter & Affinity groups
        </motion.h1>
      </motion.div>
    </section>
  );
}
