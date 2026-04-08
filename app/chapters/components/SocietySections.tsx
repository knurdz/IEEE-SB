'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { societies } from '../data';
import Image from 'next/image';

const CHECKMARKS = [
  "In-app featured content",
  "Webinars and Workshops",
  "Newsletter feature",
  "Social media collaboration",
];

const CheckIcon = () => (
  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const WavyLine = ({ className }: { className?: string }) => (
  <svg className={className} width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50 C 40 10, 60 90, 100 50 C 140 10, 160 90, 200 50 C 240 10, 260 90, 300 50" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Dots = ({ className }: { className?: string }) => (
  <svg className={className} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="4.5" fill="currentColor" />
    <circle cx="45" cy="20" r="5" fill="currentColor" />
    <circle cx="20" cy="45" r="4" fill="currentColor" />
    <circle cx="55" cy="55" r="5.5" fill="currentColor" />
    <circle cx="85" cy="30" r="4" fill="currentColor" />
    <circle cx="70" cy="75" r="6" fill="currentColor" />
    <circle cx="30" cy="85" r="4.5" fill="currentColor" />
    <circle cx="80" cy="90" r="3.5" fill="currentColor" />
  </svg>
);

export default function SocietySections() {
  return (
    <section className="pt-8 pb-24 bg-transparent relative overflow-hidden z-10" id="societies-list">
      {/* Background large decorative line matching the reference */}
      <WavyLine className="absolute top-1/4 left-0 w-full h-[300px] text-purple-100/50 -translate-x-1/4 z-0 pointer-events-none" />
      <WavyLine className="absolute bottom-1/4 right-0 w-[150%] h-[300px] text-orange-100/50 translate-x-1/4 z-0 pointer-events-none transform rotate-180" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {societies.map((society, index) => {
          const isReversed = index % 2 !== 0;
          const blobShape1 = "40% 60% 70% 30% / 40% 50% 60% 50%";
          const blobShape2 = "60% 40% 30% 70% / 50% 60% 40% 50%";
          const blobShape3 = "50% 50% 60% 40% / 40% 60% 50% 50%";
          
          const imageShape = index % 3 === 0 ? blobShape1 : index % 3 === 1 ? blobShape2 : blobShape3;
          const bgShape = index % 3 === 0 ? blobShape2 : index % 3 === 1 ? blobShape3 : blobShape1;
          
          // Alternating colors based on reference: purple vs light orange/peach
          const colorMain = index % 2 === 0 ? 'bg-[#7C3AED]' : 'bg-[#FDA4AF]'; 
          const dotColor = index % 2 === 0 ? 'text-[#7C3AED]' : 'text-[#FDA4AF]';
          
          const isSocietyName = society.title.endsWith('Society');
          const firstPart = isSocietyName ? society.title.replace(' Society', '') : society.title.split(' ')[0];
          const secondPart = isSocietyName ? 'Society' : society.title.split(' ').slice(1).join(' ');

          return (
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              key={society.id}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-28 py-12 lg:py-16 ${
                isReversed ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative flex justify-center items-center py-10 min-h-[400px]">
                {/* Wavy line decors (abstract corner squiggles) */}
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   className={`absolute ${isReversed ? '-bottom-10 -right-10' : '-top-10 -left-10'} w-32 h-32 opacity-30 z-0`}
                >
                   <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                      <path d="M10 50 Q 25 10 50 50 T 90 50" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <path d="M10 70 Q 25 30 50 70 T 90 70" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
                   </svg>
                </motion.div>
                
                <Dots className={`absolute ${isReversed ? '-top-5 -left-10' : '-bottom-10 -right-10'} z-0 opacity-80 ${dotColor} scale-75 md:scale-100`} />

                {/* Abstract Blob Background */}
                <motion.div
                  animate={{ 
                    borderRadius: [bgShape, blobShape1, bgShape],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute w-72 h-72 lg:w-[450px] lg:h-[450px] ${colorMain} z-0 origin-center ${isReversed ? 'translate-x-6 -translate-y-6' : '-translate-x-6 translate-y-6'}`}
                >
                  {/* Decorative dashed lines radiating inside the blob to match reference */}
                  <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-[inherit] transform -rotate-6"></div>
                  <div className="absolute inset-8 border-2 border-dashed border-white/20 rounded-[inherit] transform rotate-12"></div>
                </motion.div>

                {/* Main Image with thick white border and organic shape */}
                <motion.div
                  animate={{ 
                    borderRadius: [imageShape, blobShape2, imageShape]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="relative z-10 w-64 h-64 lg:w-[380px] lg:h-[380px] overflow-hidden border-[10px] border-white shadow-2xl bg-gray-100 object-cover"
                >
                  <Image 
                    src={society.logo || '/chapters/society_logo.png'}
                    alt={society.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-12 transition-transform duration-700 hover:scale-110"
                  />
                </motion.div>
                
                {/* Additional floating abstract shape */}
                <motion.div 
                   animate={{ y: [-10, 10, -10] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className={`absolute top-1/2 ${isReversed ? 'left-0' : 'right-0'} w-16 h-16 ${dotColor} opacity-20 filter blur-xl rounded-full mix-blend-multiply`}
                ></motion.div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col items-start z-10 pl-4 md:pl-10">
                <div className="mb-6 relative">
                   {/* Subtitle brush stroke effect background (Optional, can just use light text) */}
                   <span className="absolute -left-6 -top-6 w-32 h-32 bg-amber-50 rounded-full mix-blend-multiply filter blur-2xl z-[-1]" />
                   <h2 className="text-4xl lg:text-[3.5rem] text-gray-800 flex flex-col gap-2 font-sans tracking-tight">
                     <span className="font-light text-gray-700">{firstPart}</span>
                     {secondPart && <span className="font-black font-serif text-gray-900 leading-[1.1]">{secondPart}</span>}
                   </h2>
                </div>
                
                <p className="text-gray-500 mt-4 mb-10 text-lg leading-relaxed max-w-lg">
                  {society.description}
                </p>

                <div className="space-y-4 mb-12 w-full max-w-md">
                  {CHECKMARKS.map((check, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 cursor-pointer group"
                    >
                      <CheckIcon />
                      <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{check}</span>
                    </motion.div>
                  ))}
                </div>

                <a 
                  href={society.links?.website || '#'}
                  className="px-8 py-3.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-black rounded-full font-bold shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/30"
                >
                  Get Started
                </a>
              </div>
            </motion.div >
          );
        })}
      </div>
    </section>
  );
}
