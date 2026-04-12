"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SiteBackground from "@/app/components/layout/SiteBackground";
import { featuredAward, secondaryAwards } from "./data";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="relative w-full py-16 lg:py-20 overflow-hidden bg-transparent"
      aria-label="Awards and recognition"
    >
      <SiteBackground showTopFade={true} showBottomFade={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-[2rem] sm:text-4xl lg:text-7xl text-gray-800 flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-2 sm:gap-4 font-sans tracking-tight mb-6 text-center">
            <span className="font-light text-gray-700">Awards &</span>
            <span className="font-black font-serif text-gray-900 uppercase">
              Recognition
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mx-auto italic font-bold">
            Global excellence, locally celebrated.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Side: International Certificate */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative z-20"
          >
            {/* Tech frame around certificate */}
            <div className="relative rounded-xl bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50">
              {/* Glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/40 rounded-lg pointer-events-none z-10" />
              
              <div className="relative rounded-lg overflow-hidden border-4 border-[#2c3e50]">
                {/* Fallback layout if specific image isn't available, otherwise use next/image */}
                <Image
                  src={featuredAward.image || "/images/placeholder-cert.jpg"}
                  alt={featuredAward.imageAlt}
                  width={3309}
                  height={2310}
                  className="w-full h-auto block"
                  priority
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold uppercase text-gray-900 mb-2">International Awards</h3>
              <p className="text-gray-700 leading-relaxed max-w-md">
                Most Outstanding Student Branch in the Asia-Pacific Region at the IEEE Region 10 SAC Awards.
              </p>
            </div>
          </motion.div>

          {/* Right Side: National Trophies */}
          <div className="w-full lg:w-[45%] flex flex-col gap-10 relative z-10">
            <div className="mb-[-20px]">
              <h3 className="text-xl font-bold uppercase text-gray-900 mb-2">National (Sri Lankan) Awards</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Celebrating local chapter and project achievements within Sri Lanka.
              </p>
            </div>

            {secondaryAwards.slice(0, 3).map((award, index) => (
              <motion.div 
                key={award.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center gap-6 group"
              >
                {/* Tech Base with original award image */}
                <div className="relative shrink-0 w-24 h-28 transform transition-transform group-hover:scale-110">
                  <div className="absolute bottom-0 w-full h-12 bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg transform skew-x-[-10deg] border border-blue-200 shadow-[0_0_15px_rgba(91,192,235,0.3)]"></div>
                  <div className="absolute bottom-2 w-full h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-lg transform skew-x10 border border-blue-200"></div>
                  <div className="absolute inset-x-0 bottom-4 flex justify-center h-20 w-20 mx-auto overflow-hidden rounded-md border-2 border-white/50 shadow-md">
                    <Image
                      src={award.image}
                      alt={award.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100px, 100px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-sm flex-1">
                  {/* Decorative corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4da8da] rounded-tl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4da8da] rounded-br-lg"></div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{award.title}</h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    {award.description || "Presented at IEEE Sri Lanka Section awards."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
