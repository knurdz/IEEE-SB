'use client';

import { useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const FiberOpticsScene = dynamic(() => import('./FiberOpticsScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#000408] flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-2 border-cyan-500/30 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  ),
});

// Animated text with GSAP
function AnimatedTitle({ text, delay = 0 }: { text: string; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    gsap.fromTo(
      chars,
      {
        y: 120,
        opacity: 0,
        rotateX: -90,
        filter: 'blur(10px)',
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
        delay,
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <span className="inline-flex" style={{ perspective: '1000px' }}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{ transformOrigin: 'center bottom' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  );
}

// Glowing line animation
function GlowingLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative h-px w-full max-w-md mx-auto overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 h-px"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          delay: delay + 1,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
}

// Data stream badge
function DataStreamBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-3 bg-cyan-400 rounded-full"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
      <span className="text-cyan-400 text-sm font-medium tracking-wide">
        Transmitting Innovation
      </span>
    </motion.div>
  );
}

// Stats with data counter effect
function DataStats() {
  const stats = [
    { value: '10', unit: 'Gbps', label: 'Data Speed' },
    { value: '500+', unit: '', label: 'Members' },
    { value: '50+', unit: '', label: 'Events' },
    { value: '∞', unit: '', label: 'Possibilities' },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-4xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <span className="text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {stat.value}
            </span>
            {stat.unit && (
              <span className="text-lg text-cyan-400 ml-1">{stat.unit}</span>
            )}
          </div>
          <div className="text-sm text-white/40 mt-1 tracking-wide">{stat.label}</div>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-2 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// CTA Buttons
function CTAButtons() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <motion.a
        href="#events"
        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full overflow-hidden"
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Connect Now
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ x: '100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>

      <motion.a
        href="#about"
        className="group px-8 py-4 text-white font-medium rounded-full border border-white/20 hover:border-cyan-500/50 transition-all relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          Explore Data
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </span>
        <motion.div
          className="absolute inset-0 bg-cyan-500/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    </motion.div>
  );
}

// Scroll indicator with fiber pulse
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll to transmit</span>
      <div className="relative w-6 h-12 border border-white/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"
          animate={{
            top: ['10%', '60%'],
            height: ['20%', '10%'],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#000408]"
    >
      {/* 3D Fiber Optics Scene */}
      <Suspense fallback={null}>
        <FiberOpticsScene />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000408] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000408_70%)] pointer-events-none z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <DataStreamBadge />

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-cyan-400/60 text-sm tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            University of Moratuwa
          </motion.p>

          {/* Main Title */}
          <div className="mt-4">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter">
              <AnimatedTitle text="IEEE" delay={0.5} />
            </h1>
            <div className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                <AnimatedTitle text="Student Branch" delay={0.7} />
              </span>
            </div>
          </div>

          {/* Glowing line */}
          <div className="my-8">
            <GlowingLine delay={1} />
          </div>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Connecting minds at the speed of light. Pioneering the future of
            technology through fiber-fast innovation and seamless collaboration.
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-10">
            <CTAButtons />
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center">
            <DataStats />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Corner fiber accents */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-[2]">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
          <path
            d="M0,50 Q25,50 50,25 T100,0"
            fill="none"
            stroke="url(#fiber-gradient)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="fiber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
