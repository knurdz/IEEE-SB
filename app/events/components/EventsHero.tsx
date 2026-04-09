'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function EventsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive setup
    const isMobile = window.innerWidth < 768;
    const SPACING = isMobile ? 24 : 20;
    const INFLUENCE_RADIUS = isMobile ? 120 : 180;

    if (shouldReduceMotion) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);

      const cols = Math.ceil(canvas.offsetWidth / SPACING) + 1;
      const rows = Math.ceil(canvas.offsetHeight / SPACING) + 1;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      gradient.addColorStop(0, 'rgba(0, 139, 230, 0.35)'); // Accent
      gradient.addColorStop(1, 'rgba(0, 87, 157, 0.1)'); // Primary
      ctx.fillStyle = gradient;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          ctx.arc(c * SPACING, r * SPACING, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return;
    }

    let rafId: number;
    let resizeTimeout: NodeJS.Timeout;
    
    const mouse = { x: -9999, y: -9999 };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let dots: { x: number, y: number, baseX: number, baseY: number }[] = [];

    const setupDots = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(canvas.offsetWidth / SPACING) + 1;
      const rows = Math.ceil(canvas.offsetHeight / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: col * SPACING,
            y: row * SPACING,
            baseX: col * SPACING,
            baseY: row * SPACING
          });
        }
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupDots();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    setupDots();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const time = Date.now() * 0.005;
      const VIBE_RADIUS = 350;

      const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      gradient.addColorStop(0, 'rgba(0, 139, 230, 0.45)'); // Accent
      gradient.addColorStop(1, 'rgba(0, 87, 157, 0.15)'); // Primary
      ctx.fillStyle = gradient;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        const dx = dot.baseX - mouse.x;
        const dy = dot.baseY - mouse.y;
        const dist = Math.hypot(dx, dy);

        // Local phase based on position
        const phase = (dot.baseX * 0.05) + (dot.baseY * 0.05);
        
        let vibeScale = 1.0;
        let freqScale = 1.0;
        
        if (dist < VIBE_RADIUS) {
          const vibeProximity = 1 - (dist / VIBE_RADIUS);
          vibeScale = 1.0 + vibeProximity * 1.2; 
          freqScale = 1.0 + vibeProximity * 2.0; // Increase speed on hover
        }

        const swayX = Math.sin(time * freqScale + phase) * 0.3 * vibeScale;
        const swayY = Math.cos(time * 1.1 * freqScale + phase) * 0.3 * vibeScale;

        let targetX = dot.baseX + swayX;
        let targetY = dot.baseY + swayY;
        
        if (dist < INFLUENCE_RADIUS) {
          const proximity = 1 - (dist / INFLUENCE_RADIUS);
          const force = Math.pow(proximity, 1.5) * 20; 
          targetX += (dx / Math.max(dist, 1)) * force;
          targetY += (dy / Math.max(dist, 1)) * force;
        }

        ctx.beginPath();
        ctx.arc(targetX, targetY, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldReduceMotion]);

  return (
    <section className="relative min-h-[50vh] py-32 flex flex-col justify-center items-center overflow-hidden bg-transparent text-center px-4">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          className="text-accent tracking-[0.2em] uppercase font-semibold text-sm mb-6 font-mono"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          — IEEE UOM Student Branch —
        </motion.p>

        <motion.h1
          className="font-orbitron font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-4 tracking-tight"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A Legacy of <span className="text-gradient">Innovation</span>
        </motion.h1>

        <motion.p
          className="text-muted font-sans text-lg sm:text-xl max-w-2xl mb-8"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Explore the events that define IEEE UOM
        </motion.p>

        <motion.div
          className="h-[2px] w-[60px] bg-accent origin-left rounded-full fiber-glow"
          initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'circOut' }}
        />
      </div>
    </section>
  );
}
