'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PagePreloader() {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-700/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-700 rounded-full animate-spin"></div>
        </div>
        <p className="text-blue-700/80 text-sm font-mono tracking-[0.3em] animate-pulse uppercase">
          Loading
        </p>
      </div>
    </motion.div>
  );
}
