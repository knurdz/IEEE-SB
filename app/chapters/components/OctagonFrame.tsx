'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface OctagonFrameProps {
  src: string;
  alt: string;
  className?: string;
}

export default function OctagonFrame({ src, alt, className = '' }: OctagonFrameProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Reduced glow effect */}
      <motion.div
        className="absolute w-40 h-40 rounded-full opacity-10 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
        }}
        whileHover={{
          scale: 1.15,
          opacity: 0.2,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Octagon frame */}
      <motion.div
        className="relative w-64 h-64 flex items-center justify-center z-10"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          background: 'linear-gradient(145deg, #ffffff, #e8ecf4)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
        whileHover={{
          scale: 1.04,
          rotate: 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative w-[70%] h-[70%]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain drop-shadow-md"
            sizes="(max-width: 768px) 120px, 180px"
          />
        </div>
      </motion.div>
    </div>
  );
}
