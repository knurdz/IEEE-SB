'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { societies } from '../data';
import AnimatedLogoProcedural from './AnimatedLogoProcedural';

const SMALL_ROUNDED_HEX = `url("data:image/svg+xml,%3Csvg width='150' height='130' viewBox='0 0 150 130' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='46,16 104,16 134,65 104,114 46,114 16,65' fill='black' stroke='black' stroke-width='32' stroke-linejoin='round'/%3E%3C/svg%3E")`;
const BIG_ROUNDED_HEX = `url("data:image/svg+xml,%3Csvg width='300' height='260' viewBox='0 0 300 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='87,24 213,24 276,130 213,236 87,236 24,130' fill='black' stroke='black' stroke-width='48' stroke-linejoin='round'/%3E%3C/svg%3E")`;

// Spacing constants (must match positioning logic below)
const DX = 124.4;
const DY = 70;
const LEFT_SHIFT = -245;
const RIGHT_SHIFT = 245;

// All node centers in SVG viewBox coords (origin = center of the scene)
const ALL_NODES = [
  // left cluster
  { id: 1, x: -3 * DX + LEFT_SHIFT,  y: 0        },
  { id: 2, x: -2 * DX + LEFT_SHIFT,  y: -DY      },
  { id: 3, x: -2 * DX + LEFT_SHIFT,  y:  DY      },
  { id: 4, x: -1 * DX + LEFT_SHIFT,  y: -2 * DY  },
  { id: 5, x: -1 * DX + LEFT_SHIFT,  y: 0        },
  { id: 6, x: -1 * DX + LEFT_SHIFT,  y:  2 * DY  },
  { id: 7, x:  0 * DX + LEFT_SHIFT,  y: -DY      },
  { id: 8, x:  0 * DX + LEFT_SHIFT,  y:  DY      },
  // right cluster
  { id: 9, x:  0 * DX + RIGHT_SHIFT, y: -DY      },
  { id: 10, x:  0 * DX + RIGHT_SHIFT, y:  DY      },
  { id: 11, x:  1 * DX + RIGHT_SHIFT, y: -2 * DY  },
  { id: 12, x:  1 * DX + RIGHT_SHIFT, y: 0        },
  { id: 13, x:  1 * DX + RIGHT_SHIFT, y:  2 * DY  },
  { id: 14, x:  2 * DX + RIGHT_SHIFT, y: -DY      },
  { id: 15, x:  2 * DX + RIGHT_SHIFT, y:  DY      },
  { id: 16, x:  3 * DX + RIGHT_SHIFT, y: 0        },
  // Extra node for the 17th chapter, positioned above the right side cluster logos for better balance
  { id: 17, x:  2 * DX + RIGHT_SHIFT, y: -3 * DY  }, 
];

export default function ChaptersNetwork() {
  const leftNodes = ALL_NODES.slice(0, 8);
  const rightNodes = ALL_NODES.slice(8);

  return (
    <section className="relative w-full pt-0 pb-4 md:pb-12 bg-transparent overflow-hidden flex flex-col items-center justify-center mt-8 md:-mt-12 z-10 px-4">
      <style jsx>{`
        .network-container {
          transform: scale(0.7); /* Mobile scales just the center hexagon */
        }
        @media (min-width: 375px) {
          .network-container {
            transform: scale(0.85);
          }
        }
        @media (min-width: 480px) {
          .network-container {
            transform: scale(1);
          }
        }
        @media (min-width: 640px) {
          .network-container {
            transform: scale(1.1);
          }
        }
        @media (min-width: 768px) {
          .network-container {
            transform: scale(0.53); /* Back to fitting the entire extended grid */
          }
        }
        @media (min-width: 1024px) {
          .network-container {
            transform: scale(0.72);
          }
        }
        @media (min-width: 1200px) {
          .network-container {
            transform: scale(0.85);
          }
        }
        @media (min-width: 1400px) {
          .network-container {
            transform: scale(1);
          }
        }
      `}</style>
      
      <div className="relative w-full max-w-[1200px] h-[220px] min-[375px]:h-[260px] min-[480px]:h-[300px] sm:h-[350px] md:h-[500px] lg:h-[600px] xl:h-[650px] flex items-center justify-center z-20 overflow-visible">
        <div className="network-container relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out">
          {/* ── CENTER IEEE HEXAGON (z-30) ── */}
          <motion.div
            className="absolute z-30"
            style={{ x: 0, y: 0 }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div>
              <div
                className="relative w-[300px] h-[260px] bg-transparent flex items-center justify-center overflow-hidden"
                style={{ maskImage: BIG_ROUNDED_HEX, WebkitMaskImage: BIG_ROUNDED_HEX }}
              >
                {/* Replaced GIF with the new high-fidelity SVG component */}
                <AnimatedLogoProcedural className="relative z-10 w-64 h-auto object-contain" />
              </div>
            </div>
          </motion.div>


          {/* ── LEFT CLUSTER (z-20) ── */}
          {leftNodes.map((node, i) => {
            return (
              <motion.div
                key={`left-${node.id}`}
                className="absolute z-20 hidden md:block"
                initial={{ opacity: 0, x: node.x - 50, y: node.y }}
                whileInView={{ opacity: 1, x: node.x, y: node.y }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 80 }}
              >
                <div className="relative group hover:scale-110 transition-transform duration-300">
                  <svg width='150' height='130' viewBox='0 0 150 130' className="absolute inset-0 pointer-events-none text-[#008be6]/15 overflow-visible">
                    <polygon points='46,16 104,16 134,65 104,114 46,114 16,65' fill='none' stroke='currentColor' strokeWidth='34' strokeLinejoin='round'/>
                  </svg>
                  <div
                    onClick={() => {
                      const society = societies.find(s => s.logo === `/chapter-logos/CL${node.id}.png`);
                      if (society) {
                        const el = document.getElementById(`society-${society.id}`);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }
                    }}
                    className="relative cursor-pointer w-[150px] h-[130px] bg-white flex items-center justify-center p-4 overflow-hidden"
                    style={{ maskImage: SMALL_ROUNDED_HEX, WebkitMaskImage: SMALL_ROUNDED_HEX }}
                  >
                    <div className="absolute inset-0 bg-gray-50/50 animate-pulse transition-opacity duration-500" />
                    <Image 
                      src={`/chapter-logos/CL${node.id}.png`} 
                      alt={`Partner ${node.id}`} 
                      width={80} 
                      height={80} 
                      className="object-contain w-full h-full opacity-0 transition-opacity duration-1000" 
                      priority={i < 4}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        img.classList.remove('opacity-0');
                        if (img.previousElementSibling) img.previousElementSibling.classList.add('opacity-0');
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ── RIGHT CLUSTER (z-20) ── */}
          {rightNodes.map((node, i) => {
            return (
              <motion.div
                key={`right-${node.id}`}
                className="absolute z-20 hidden md:block"
                initial={{ opacity: 0, x: node.x + 50, y: node.y }}
                whileInView={{ opacity: 1, x: node.x, y: node.y }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 80 }}
              >
                <div className="relative group hover:scale-110 transition-transform duration-300">
                  <svg width='150' height='130' viewBox='0 0 150 130' className="absolute inset-0 pointer-events-none text-[#008be6]/15 overflow-visible">
                    <polygon points='46,16 104,16 134,65 104,114 46,114 16,65' fill='none' stroke='currentColor' strokeWidth='34' strokeLinejoin='round'/>
                    </svg>
                  <div
                    onClick={() => {
                      const society = societies.find(s => s.logo === `/chapter-logos/CL${node.id}.png`);
                      if (society) {
                        const el = document.getElementById(`society-${society.id}`);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }
                    }}
                    className="relative cursor-pointer w-[150px] h-[130px] bg-white flex items-center justify-center p-4 overflow-hidden"
                    style={{ maskImage: SMALL_ROUNDED_HEX, WebkitMaskImage: SMALL_ROUNDED_HEX }}
                  >
                    <div className="absolute inset-0 bg-gray-50/50 animate-pulse transition-opacity duration-500" />
                    <Image 
                      src={`/chapter-logos/CL${node.id}.png`} 
                      alt={`Partner ${node.id}`} 
                      width={80} 
                      height={80} 
                      className="object-contain w-full h-full opacity-0 transition-opacity duration-1000" 
                      priority={i < 4}
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        img.classList.remove('opacity-0');
                        if (img.previousElementSibling) img.previousElementSibling.classList.add('opacity-0');
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
