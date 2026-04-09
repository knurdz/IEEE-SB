'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BentoItem {
  title: string;
  description: string;
  bg: string;
  text: string;
  desc: string;
  className: string;
  Graphic: React.ComponentType;
}

const Segment = ({x1, y1, x2, y2}: {x1:number, y1:number, x2:number, y2:number}) => {
  const px1 = 400 + x1 * 80, py1 = 200 + y1 * 80;
  const px2 = 400 + x2 * 80, py2 = 200 + y2 * 80;
  const gap = 20; 
  const len = Math.hypot(px2-px1, py2-py1);
  const ratio = gap / len;
  return <line x1={px1 + (px2-px1)*ratio} y1={py1 + (py2-py1)*ratio} x2={px2 - (px2-px1)*ratio} y2={py2 - (py2-py1)*ratio} />;
};

const ShapeNetwork = () => (
  <>
    {/* Center node */}
    <Segment x1={-1} y1={0} x2={1} y2={0} />
    <Segment x1={0} y1={-1} x2={0} y2={1} />
    {/* Branches */}
    <Segment x1={-2} y1={-1} x2={-1} y2={-1} />
    <Segment x1={-1} y1={-1} x2={-1} y2={0} />
    
    <Segment x1={2} y1={1} x2={1} y2={1} />
    <Segment x1={1} y1={1} x2={1} y2={0} />
    
    <Segment x1={-1} y1={1} x2={0} y2={1} />
    <Segment x1={-1} y1={2} x2={-1} y2={1} />
    
    <Segment x1={1} y1={-1} x2={0} y2={-1} />
    <Segment x1={1} y1={-2} x2={1} y2={-1} />
  </>
);

const ShapeResources = () => (
  <>
    {/* Top diamond */}
    <Segment x1={-1} y1={-2} x2={0} y2={-2} />
    <Segment x1={0} y1={-2} x2={0} y2={-1} />
    <Segment x1={0} y1={-1} x2={-1} y2={-1} />
    <Segment x1={-1} y1={-1} x2={-1} y2={-2} />
    {/* Mid diamond */}
    <Segment x1={0} y1={-1} x2={1} y2={-1} />
    <Segment x1={1} y1={-1} x2={1} y2={0} />
    <Segment x1={1} y1={0} x2={0} y2={0} />
    <Segment x1={0} y1={0} x2={0} y2={-1} />
    {/* Bottom diamond */}
    <Segment x1={1} y1={0} x2={2} y2={0} />
    <Segment x1={2} y1={0} x2={2} y2={1} />
    <Segment x1={2} y1={1} x2={1} y2={1} />
    <Segment x1={1} y1={1} x2={1} y2={0} />
  </>
);

const ShapeSkills = () => (
  <>
    {/* Base platform */}
    <Segment x1={-2} y1={2} x2={-1} y2={2} />
    {/* Step 1 up */}
    <Segment x1={-1} y1={2} x2={-1} y2={1} />
    <Segment x1={-1} y1={1} x2={0} y2={1} />
    {/* Step 2 up */}
    <Segment x1={0} y1={1} x2={0} y2={0} />
    <Segment x1={0} y1={0} x2={1} y2={0} />
    {/* Step 3 up */}
    <Segment x1={1} y1={0} x2={1} y2={-1} />
    <Segment x1={1} y1={-1} x2={2} y2={-1} />
  </>
);

const ShapeTrends = () => (
  <>
    <Segment x1={-2} y1={1} x2={-1} y2={1} />
    <Segment x1={-1} y1={1} x2={-1} y2={0} />
    <Segment x1={-1} y1={0} x2={0} y2={0} />
    <Segment x1={0} y1={0} x2={0} y2={-1} />
    <Segment x1={0} y1={-1} x2={1} y2={-1} />
    <Segment x1={1} y1={-1} x2={1} y2={-2} />
    <Segment x1={1} y1={-2} x2={0} y2={-2} />
    <Segment x1={1} y1={-2} x2={2} y2={-2} />
  </>
);

const ShapeCareer = () => (
  <>
    {/* Left rail */}
    <Segment x1={-1} y1={2} x2={-1} y2={1} />
    <Segment x1={-1} y1={1} x2={-1} y2={0} />
    <Segment x1={-1} y1={0} x2={-1} y2={-1} />
    <Segment x1={-1} y1={-1} x2={-1} y2={-2} />
    {/* Right rail */}
    <Segment x1={1} y1={2} x2={1} y2={1} />
    <Segment x1={1} y1={1} x2={1} y2={0} />
    <Segment x1={1} y1={0} x2={1} y2={-1} />
    <Segment x1={1} y1={-1} x2={1} y2={-2} />
    {/* Rungs */}
    <Segment x1={-1} y1={1} x2={0} y2={1} />
    <Segment x1={0} y1={1} x2={1} y2={1} />
    
    <Segment x1={-1} y1={0} x2={0} y2={0} />
    <Segment x1={0} y1={0} x2={1} y2={0} />
    
    <Segment x1={-1} y1={-1} x2={0} y2={-1} />
    <Segment x1={0} y1={-1} x2={1} y2={-1} />
  </>
);

const ShapeSociety = () => (
  <>
    {[-1,0,1].map(x => (
       <React.Fragment key={`v${x}`}>
         <Segment x1={x} y1={-1} x2={x} y2={0} />
         <Segment x1={x} y1={0} x2={x} y2={1} />
       </React.Fragment>
    ))}
    {[-1,0,1].map(y => (
       <React.Fragment key={`h${y}`}>
         <Segment x1={-1} y1={y} x2={0} y2={y} />
         <Segment x1={0} y1={y} x2={1} y2={y} />
       </React.Fragment>
    ))}
  </>
);

const ShapeImpact = () => (
  <>
    <Segment x1={0} y1={0} x2={0} y2={-1} />
    <Segment x1={0} y1={0} x2={0} y2={1} />
    <Segment x1={0} y1={0} x2={-1} y2={0} />
    <Segment x1={0} y1={0} x2={1} y2={0} />
    
    <Segment x1={-1} y1={-1} x2={0} y2={-1} />
    <Segment x1={-1} y1={-1} x2={-1} y2={0} />
    
    <Segment x1={1} y1={-1} x2={0} y2={-1} />
    <Segment x1={1} y1={-1} x2={1} y2={0} />
    
    <Segment x1={-1} y1={1} x2={0} y2={1} />
    <Segment x1={-1} y1={1} x2={-1} y2={0} />
    
    <Segment x1={1} y1={1} x2={0} y2={1} />
    <Segment x1={1} y1={1} x2={1} y2={0} />
    
    <Segment x1={-2} y1={-2} x2={-1} y2={-2} />
    <Segment x1={-2} y1={-2} x2={-2} y2={-1} />
    
    <Segment x1={2} y1={-2} x2={1} y2={-2} />
    <Segment x1={2} y1={-2} x2={2} y2={-1} />
    
    <Segment x1={-2} y1={2} x2={-1} y2={2} />
    <Segment x1={-2} y1={2} x2={-2} y2={1} />
    
    <Segment x1={2} y1={2} x2={1} y2={2} />
    <Segment x1={2} y1={2} x2={2} y2={1} />
  </>
);

const ShapeIEEE = () => (
  <image href="/favicon.png" x="336" y="136" width="128" height="128" preserveAspectRatio="xMidYMid meet" transform="rotate(-45 400 200)" />
);

interface HexBentoGraphicProps {
  color: string;
  strokeColor: string;
  Shape: React.ComponentType;
  patternType?: 'crosses' | 'dashes' | 'diagonal-dashes';
  className?: string;
}

const HexBentoGraphic = ({ color, strokeColor, Shape, patternType = 'crosses', className }: HexBentoGraphicProps) => {
  const patternId = `grid-${patternType}-${color.replace('#','')}`;
  
  return (
    <div className={`absolute pointer-events-none flex items-center justify-center ${className || 'bottom-6 left-0 right-0 h-[240px]'}`}>
      
      {/* Background Grid Layer */}
      <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <svg viewBox="0 0 800 400" className="w-full h-full opacity-[0.14]" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern 
                id={patternId} 
                x="40" y="0"
                width="80" height="80" 
                patternTransform={patternType === 'diagonal-dashes' ? 'rotate(45 400 200)' : ''} 
                patternUnits="userSpaceOnUse"
              >
                {patternType === 'crosses' && (
                  <path d="M 40 30 L 40 50 M 30 40 L 50 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                )}
                {(patternType === 'dashes' || patternType === 'diagonal-dashes') && (
                  <path d="M 0 40 L 20 40 M 60 40 L 80 40 M 40 0 L 40 20 M 40 60 L 40 80" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                )}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>
      </div>

      {/* Foreground Shape Layer */}
      <div className="absolute inset-0 w-full h-full">
        <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g 
            stroke={strokeColor} 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            transform={patternType === 'diagonal-dashes' ? 'rotate(45 400 200)' : ''}
          >
             <Shape />
          </g>
        </svg>
      </div>

    </div>
  );
};

const bentoContent: BentoItem[] = [
  {
    title: "Join IEEE Today",
    description: "Take the next crucial step in your journey. Become a member of the world's largest technical professional organization.",
    bg: "bg-[#eff6ff]",
    text: "text-[#00589e]",
    desc: "text-[#00589e]",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#60a5fa" strokeColor="#00589e" patternType="diagonal-dashes" Shape={ShapeIEEE} />
  },
  {
    title: "Connect with a global network of engineers and innovators",
    description: "Engage with professionals worldwide to exchange ideas, collaborate on projects, and expand your professional horizons.",
    bg: "bg-[#f2fdf5]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#166534" strokeColor="#1a1a1a" patternType="crosses" Shape={ShapeNetwork} />
  },
  {
    title: "Gain access to cutting-edge technical knowledge and resources",
    description: "Utilize IEEE’s extensive publications, research, and technical materials to stay informed and develop impactful solutions.",
    bg: "bg-[#fcfaff]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#6b21a8" strokeColor="#1a1a1a" patternType="diagonal-dashes" Shape={ShapeResources} />
  },
  {
    title: "Develop critical skills for engineering and innovation",
    description: "Strengthen problem-solving, creativity, analytical thinking, and perseverance through hands-on experiences and challenges.",
    bg: "bg-[#f0f9ff]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#075985" strokeColor="#1a1a1a" patternType="crosses" Shape={ShapeSkills} />
  },
  {
    title: "Stay updated on emerging technologies and trends",
    description: "Participate in conferences, competitions, and workshops that showcase the latest advancements in engineering and technology.",
    bg: "bg-[#f8fafc]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#1e293b" strokeColor="#1a1a1a" patternType="diagonal-dashes" Shape={ShapeTrends} />
  },
  {
    title: "Enhance your career through lifelong learning and certifications",
    description: "Benefit from continuing education courses, professional certifications, and training programs that support long-term career growth.",
    bg: "bg-[#fff1f2]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#9f1239" strokeColor="#1a1a1a" patternType="crosses" Shape={ShapeCareer} />
  },
  {
    title: "Contribute to global engineering initiatives that benefit society",
    description: "Align with IEEE’s mission to advance technology and engineering for the betterment of humanity while building your professional profile.",
    bg: "bg-[#fefce8]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#854d0e" strokeColor="#1a1a1a" patternType="diagonal-dashes" Shape={ShapeSociety} />
  },
  {
    title: "Apply your knowledge to innovate and achieve real-world impact",
    description: "Take part in projects, competitions, and research initiatives that turn ideas into tangible technological solutions.",
    bg: "bg-[#171717]",
    text: "text-white",
    desc: "text-gray-400",
    className: "md:col-span-1 lg:col-span-1 min-h-[480px]",
    Graphic: () => <HexBentoGraphic color="#ffffff" strokeColor="#06b6d4" patternType="crosses" Shape={ShapeImpact} />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  },
};

export default function WhyJoinBento() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1a1a1a] mb-4">
          Why Join IEEE?
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {bentoContent.map((item, index) => {
          const { title, description, bg, text, desc, className, Graphic } = item;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl p-8 flex transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${bg} ${className}`}
            >
              <div className="relative z-20 flex flex-col mb-[250px]">
                <h3 className={`text-[26px] font-medium leading-[1.2] tracking-tight mb-3 ${text}`}>
                  {title}
                </h3>
                <p className={`text-[15px] leading-relaxed ${desc}`}>
                  {description}
                </p>
              </div>
              
              <Graphic />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

