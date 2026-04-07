'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function EventsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const MAX_PARTICLES = 190;
    const CONN_DIS = 160;

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.color =
          Math.random() > 0.5
            ? 'rgba(0, 163, 255, 0.8)'
            : 'rgba(0, 224, 255, 0.8)';
        this.radius = 2.2;
      }

      update(allParticles: Particle[]) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          this.vx -= (dx / dist) * force * 0.05;
          this.vy -= (dy / dist) * force * 0.05;
        }

        for (let i = 0; i < allParticles.length; i++) {
          const other = allParticles[i];
          if (other === this) continue;
          const dxP = other.x - this.x;
          const dyP = other.y - this.y;
          const distP = Math.sqrt(dxP * dxP + dyP * dyP);
          const minDist = 22;
          if (distP < minDist && distP > 0) {
            const forceP = (minDist - distP) / minDist;
            this.vx -= (dxP / distP) * forceP * 0.08;
            this.vy -= (dyP / distP) * forceP * 0.08;
          }
        }

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.8) {
          this.vx = (this.vx / speed) * 1.8;
          this.vy = (this.vy / speed) * 1.8;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.05;

        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        if (this.x > canvas!.width) { this.x = canvas!.width; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        if (this.y > canvas!.height) { this.y = canvas!.height; this.vy *= -1; }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(new Particle());
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Redistribute particles to fit the new dimensions
        particles.forEach(p => {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        });
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(particles);
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIS) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 163, 255, ${0.45 * (1 - dist / CONN_DIS)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <section className="relative min-h-[50vh] py-32 flex flex-col justify-center items-center overflow-hidden bg-ieee-bg text-center px-4 bg-[radial-gradient(#00a3ff12_1.5px,transparent_1.5px)] [background-size:48px_48px]">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          className="text-ieee-blue tracking-[0.2em] uppercase font-semibold text-sm mb-6 font-body"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          — IEEE UOM Student Branch —
        </motion.p>

        <motion.h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A Legacy of Innovation
        </motion.h1>

        <motion.p
          className="text-ieee-muted font-body text-lg sm:text-xl max-w-2xl mb-8"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Explore the events that define IEEE UOM
        </motion.p>

        <motion.div
          className="h-[2px] w-[60px] bg-ieee-blue origin-left"
          initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'circOut' }}
        />
      </div>
    </section>
  );
}
