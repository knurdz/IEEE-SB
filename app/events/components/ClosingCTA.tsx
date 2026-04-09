'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function ClosingCTA() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.section
      ref={ref}
      className="py-24 px-4 bg-transparent flex flex-col items-center justify-center text-center relative overflow-hidden"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-foreground mb-4">
        More Events Coming Soon
      </h2>
      <p className="font-sans text-muted text-lg mb-8 max-w-lg mx-auto">
        Stay connected with IEEE UOM Student Branch to get the latest updates on our upcoming
        events and workshops.
      </p>

      <button className="glow-button px-10 py-3.5">
        Join IEEE UOM
      </button>

      {/* Decorative glow */}
      <div className="absolute bottom-0 top-[50%] left-1/2 -translate-x-1/2 w-full max-w-sm h-[300px] bg-primary opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
    </motion.section>
  );
}
