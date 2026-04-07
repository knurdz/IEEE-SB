'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../_hooks/useInView';

export default function ClosingCTA() {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.section
      ref={ref}
      className="py-24 px-4 bg-ieee-bg flex flex-col items-center justify-center text-center relative overflow-hidden"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
        More Events Coming Soon
      </h2>
      <p className="font-body text-ieee-muted text-lg mb-8 max-w-lg mx-auto">
        Stay connected with IEEE UOM Student Branch to get the latest updates on our upcoming
        events and workshops.
      </p>

      <button className="bg-[#00A3FF] hover:bg-[#00E0FF] text-white font-display font-bold py-3.5 px-10 rounded-lg transition-all transform hover:scale-[1.05] shadow-[0_0_30px_rgba(0,163,255,0.4)] hover:shadow-[0_0_40px_rgba(0,163,255,0.6)] focus:outline-none focus:ring-4 focus:ring-ieee-blue/50">
        Join IEEE UOM
      </button>

      {/* Decorative glow */}
      <div className="absolute bottom-0 top-[50%] left-1/2 -translate-x-1/2 w-full max-w-sm h-[300px] bg-ieee-blue opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
    </motion.section>
  );
}
