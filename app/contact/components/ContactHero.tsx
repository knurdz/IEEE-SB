'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUpTransition } from '@/lib/motion';

export default function ContactHero() {
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
      className="relative min-h-[30vh] md:min-h-[35vh] flex items-center justify-center overflow-hidden bg-transparent pb-0"
    >
      <style>{`
        .contact-tagline-1 {
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

        .contact-tagline-2 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-weight: 700;
          font-size: 40px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #00579d 0%, #008be6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 12px rgba(23, 53, 153, 0.1);
        }
          
        @media (min-width: 768px) {
           .contact-tagline-2 {
              font-size: 64px;
           }
        }
      `}</style>
      
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-0 flex flex-col items-center"
        style={{ y, opacity }}
      >
        <motion.p 
            className="contact-tagline-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fadeUpTransition(0.2, 0.8)}
        >
          Get in Touch
        </motion.p>
        
        <motion.h1 
            className="contact-tagline-2 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={fadeUpTransition(0.4, 0.8)}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-[#475569] max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeUpTransition(0.6, 0.8)}
        >
          Have questions or want to collaborate? Reach out to the IEEE Student Branch at the University of Moratuwa.
        </motion.p>
      </motion.div>
    </section>
  );
}
