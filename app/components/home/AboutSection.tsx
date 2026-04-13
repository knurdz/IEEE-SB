'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import SiteBackground from '@/app/components/layout/SiteBackground';

const stats = [
  { num: 500, plus: '+', label: 'Active Members' },
  { num: 100, plus: '+', label: 'Annual Events' },
  { num: 17, plus: '+', label: 'Years Experience' },
  { num: 17, label: 'Chapters & Affnity Groups' },
];

const WavyLine = ({ className }: { className?: string }) => (
  <svg className={className} width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50 C 40 10, 60 90, 100 50 C 140 10, 160 90, 200 50 C 240 10, 260 90, 300 50" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Dots = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const createHex = (cx: number, cy: number, r: number) => {
    const pts = [
      [0, -1], [0.866, -0.5], [0.866, 0.5], [0, 1], [-0.866, 0.5], [-0.866, -0.5]
    ].map(([x, y]) => `${cx + x * r},${cy + y * r}`).join(" ");
    return <polygon points={pts} fill="currentColor" key={`${cx}-${cy}`} />;
  };

  return (
    <svg className={className} style={style} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {createHex(10, 10, 4.5)}
      {createHex(45, 20, 5)}
      {createHex(20, 45, 4)}
      {createHex(55, 55, 5.5)}
      {createHex(85, 30, 4)}
      {createHex(70, 75, 6)}
      {createHex(30, 85, 4.5)}
      {createHex(80, 90, 3.5)}
    </svg>
  );
};

function Counter({ value, isInView }: { value: number; isInView: boolean }) {
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return <motion.span>{displayValue}</motion.span>;
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="about" 
      className="relative w-full py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      {/* Local Background Matrix with localized fades */}
      <SiteBackground showTopFade={true} showBottomFade={true} />

      {/* Background Decorative Elements */}
      {/* <WavyLine className="absolute top-0 left-0 w-full h-[300px] text-purple-100/40 -translate-x-1/4 z-0 pointer-events-none" /> */}
      <WavyLine className="absolute bottom-0 right-0 w-[150%] h-[300px] text-orange-100/40 translate-x-1/4 z-0 pointer-events-none transform rotate-180" />
      
      {/* Blurred decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50/50 rounded-full filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 z-0" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-50/50 rounded-full filter blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2 z-0" />
      
      {/* Hexagonal dots cluster */}
      {/* <Dots className="absolute top-20 right-10 text-blue-200/40 z-0 scale-150" /> */}
      {/* <Dots className="absolute bottom-40 left-10 text-indigo-200/40 z-0 scale-125" /> */}

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="text-justify [text-align-last:center] font-medium leading-normal md:leading-relaxed text-lg md:text-xl lg:text-2xl max-w-7xl tracking-tight text-slate-800">
          As one of the most dynamic and leading influential student branches in Sri Lanka, the IEEE Student Branch of the University of Moratuwa serves to nurture innovation and technical excellence among undergraduates. With a strong community of over 300 active members and a passionate network of volunteers, the branch engages in a wide range of initiatives that foster both personal and professional growth. <span className="text-slate-400">In addition, the IEEE Student Branch of the University of Moratuwa prioritizes fostering a culture of unity and harmony among its members. The IEEE Student Branch of the University of Moratuwa represents more than an organization, it is a supportive community driven by shared values, collective ambition, and a spirit of fellowship.</span>
        </div>

        {/* Stats Row */}
        <div className="w-full mt-20 lg:mt-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center divide-x-0 md:divide-x divide-slate-200">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                className="flex flex-col items-center justify-center px-4"
              >
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900">
                    <Counter value={stat.num} isInView={isInView} />
                  </span>
                  <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 ml-[2px]">
                    {stat.plus}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
