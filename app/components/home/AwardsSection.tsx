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

        <div className="relative flex flex-col gap-16 lg:gap-24">
          
          {/* Top Section: International Certificate */}
          <div className="flex flex-col gap-6 w-full relative z-20">
            <div className="text-center md:text-left flex items-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-900">International</h3>
              <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full relative group"
            >
               {/* Ambient Glow */}
               <div className="absolute -inset-2 bg-gradient-to-r from-[#00589e]/10 via-[#00589e]/20 to-[#00589e]/5 blur-3xl group-hover:blur-2xl transition-all duration-700 rounded-[2rem] -z-10"></div>
               
               {/* Wide Glass Panel */}
               <div className="relative w-full rounded-[2rem] bg-gradient-to-br from-white/80 via-white/60 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row shadow-[#00589e]/5 group-hover:shadow-[0_20px_50px_rgba(0,88,158,0.1)] transition-all duration-700">
                  
                  {/* Certificate Image Area */}
                  <div className="relative w-full md:w-[50%] lg:w-[50%] min-h-[300px] md:min-h-[450px] bg-gradient-to-b from-slate-800 to-slate-900 p-6 sm:p-10 flex items-center justify-center overflow-hidden border-r border-white/10">
                     {/* Ambient inner glow */}
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay z-20 pointer-events-none transform -skew-x-12 -translate-x-[150%] md:group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />
                     
                     <div className="relative w-full max-w-xl transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:-translate-y-1">
                        <div className="relative rounded-xl p-1 bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400 shadow-[0_15px_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_25px_50px_rgba(0,88,158,0.2)] transition-all duration-500">
                          <div className="relative rounded-lg bg-white overflow-hidden p-0.5">
                            <div className="relative rounded-md overflow-hidden bg-slate-100">
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
                     </div>
                  </div>

                  {/* Info Area */}
                  <div className="flex-1 p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-white/40">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00589e]/5 border border-[#00589e]/20 shadow-sm mb-6 w-max">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00589e] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00589e]"></span>
                        </span>
                        <span className="text-[11px] font-bold text-[#00589e] uppercase tracking-widest">{featuredAward.badge || 'Global Achievement'}</span>
                     </div>
                     
                     <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-gray-900 mb-4 leading-tight tracking-tight">
                       Most Outstanding <br/><span className="text-[#00589e]">Student Branch</span>
                     </h3>
                     <div className="h-1.5 w-12 bg-[#00589e] mb-6 rounded-full shadow-[0_0_10px_rgba(0,88,158,0.3)]"></div>
                     <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                       Secured at the IEEE Region 10 SAC Awards in the Asia-Pacific Region. A testament to relentless dedication and global excellence.
                     </p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Bottom Section: National Trophies */}
          <div className="flex flex-col gap-6 relative z-10 w-full mt-2 lg:mt-6">
            <div className="text-center md:text-left flex items-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-900">Sri Lankan</h3>
              <div className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-gray-300 to-transparent"></div>
            </div>

            {/* Grid of 3 vertical boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {secondaryAwards.slice(0, 3).map((award, index) => (
                <motion.div 
                  key={award.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative flex flex-col bg-white/70 backdrop-blur-xl rounded-[1.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,88,158,0.12)] hover:-translate-y-2 transition-all duration-500 cursor-default"
                >
                  {/* Vertical Image Header */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-200">
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent mix-blend-multiply opacity-50 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none" />
                     <Image
                        src={award.image}
                        alt={award.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                     />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                     <div className="w-8 h-1.5 bg-[#00589e]/60 mb-5 rounded-full group-hover:bg-[#00589e] transition-colors duration-300 shadow-sm"></div>
                     <h4 className="text-[1.125rem] lg:text-[1.25rem] font-bold text-slate-800 mb-3 leading-snug group-hover:text-[#00589e] transition-colors">{award.title}</h4>
                     <p className="text-sm text-slate-600 leading-relaxed flex-1 font-medium">
                       {award.description || "Presented at IEEE Sri Lanka Section awards."}
                     </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
