'use client';

import { motion } from 'framer-motion';

export default function NetworkVisualization() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
        {['M100,300 Q300,100 500,300 T900,300', 'M100,400 Q400,200 700,400', 'M200,500 Q500,300 800,500'].map(
          (d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="url(#tg)" strokeWidth="1" strokeDasharray="5,5" />
              <circle r="3" fill="#00d4ff">
                <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )
        )}
        <defs>
          <linearGradient id="tg">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
