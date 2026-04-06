'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, rgba(0, 212, 255, 0.04) 0%, transparent 60%), #060b18',
      }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridFloat 20s linear infinite',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.span
          className="inline-block px-6 py-2 mb-8 text-xs font-semibold tracking-[0.2em] uppercase rounded-full border"
          style={{
            background: 'rgba(0, 212, 255, 0.06)',
            borderColor: 'rgba(0, 212, 255, 0.15)',
            color: '#00d4ff',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          IEEE Technical Communities
        </motion.span>

        {/* Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold leading-tight mb-6"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c0d0e8 40%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Our Societies
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Discover the 17 IEEE societies shaping the future of technology, connecting
          professionals worldwide through conferences, publications, and educational resources.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-3 text-white/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-xs tracking-[0.15em] uppercase">Scroll to explore</span>
          <motion.div
            className="w-10 h-10 flex items-center justify-center rounded-full border border-cyan-400/20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gridFloat {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }
      `}</style>
    </section>
  );
}
