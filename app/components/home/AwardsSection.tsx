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
                <div className="relative min-h-[18.75rem] w-full bg-slate-100 flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />
                  <Image
                    src={featuredAward.image || "/event/placeholder-cert.jpg"}
                    alt={featuredAward.imageAlt}
                    width={3309}
                    height={2310}
                    className="w-full h-auto block relative z-10"
                    priority
                  />
                </div>
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
            <div className="mb-[-1.25rem]">
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
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 group"
              >
                {/* Stage Photo Thumbnail */}
                <div className="relative shrink-0 w-full sm:w-36 lg:w-40 h-48 sm:h-28 rounded-xl overflow-hidden shadow-sm border border-white/50 group-hover:border-white transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] group-hover:-translate-y-1 z-10 bg-slate-100 flex items-center justify-center">
                   {/* Glass glare effect */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent z-20 pointer-events-none"></div>
                   <div className="absolute inset-0 bg-slate-200 animate-pulse opacity-40 z-0" />
                   <Image
                      src={award.image}
                      alt={award.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 10rem"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                   />
                </div>

                {/* Text Content */}
                <div className="relative bg-white/50 group-hover:bg-white/70 transition-colors duration-500 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-blue-50 shadow-sm flex-1 flex flex-col justify-center">
                  {/* Decorative corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4da8da]/60 rounded-tl-lg transition-colors group-hover:border-[#4da8da]"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4da8da]/60 rounded-br-lg transition-colors group-hover:border-[#4da8da]"></div>
                  
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-900 transition-colors">{award.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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
