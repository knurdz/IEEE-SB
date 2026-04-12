"use client";

import React from "react";
import { motion } from "framer-motion";
import { societies } from "../data";
import Image from "next/image";
import SocialLinks from "./SocialLinks";

const WavyLine = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="200"
    height="100"
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 50 C 40 10, 60 90, 100 50 C 140 10, 160 90, 200 50 C 240 10, 260 90, 300 50"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const Dots = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const createHex = (cx: number, cy: number, r: number) => {
    // Generate regular upright hexagon points correctly scaled and translated
    const pts = [
      [0, -1],
      [0.866, -0.5],
      [0.866, 0.5],
      [0, 1],
      [-0.866, 0.5],
      [-0.866, -0.5],
    ]
      .map(([x, y]) => `${cx + x * r},${cy + y * r}`)
      .join(" ");
    return <polygon points={pts} fill="currentColor" key={`${cx}-${cy}`} />;
  };

  return (
    <svg
      className={className}
      style={style}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

export default function SocietySections() {
  return (
    <section
      className="pt-8 pb-24 bg-transparent relative overflow-hidden z-10"
      id="societies-list"
    >
      {/* Background large decorative line matching the reference */}
      <WavyLine className="absolute top-1/4 left-0 w-full h-[300px] text-purple-100/50 -translate-x-1/4 z-0 pointer-events-none" />
      <WavyLine className="absolute bottom-1/4 right-0 w-[150%] h-[300px] text-orange-100/50 translate-x-1/4 z-0 pointer-events-none transform rotate-180" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {societies.map((society, index) => {
          const isReversed = index % 2 !== 0;

          // Rounded Hexagon shapes that wobble slightly more organically - simulating a fluid rounded hexagon
          const roundedHex1 =
            "M0.5,0 C0.55,0 0.6,0.02 0.64,0.04 L0.93,0.19 C0.98,0.22 1,0.27 1,0.32 L1,0.68 C1,0.73 0.98,0.78 0.93,0.81 L0.64,0.96 C0.6,0.98 0.55,1 0.5,1 C0.45,1 0.4,0.98 0.36,0.96 L0.07,0.81 C0.02,0.78 0,0.73 0,0.68 L0,0.32 C0,0.27 0.02,0.22 0.07,0.19 L0.36,0.04 C0.4,0.02 0.45,0 0.5,0 Z";
          const roundedHex2 =
            "M0.5,0.02 C0.56,0.02 0.61,0.04 0.65,0.06 L0.91,0.21 C0.95,0.23 0.97,0.28 0.97,0.33 L0.97,0.67 C0.97,0.72 0.95,0.77 0.91,0.79 L0.65,0.94 C0.61,0.96 0.56,0.98 0.5,0.98 C0.44,0.98 0.39,0.96 0.35,0.94 L0.09,0.79 C0.05,0.77 0.03,0.72 0.03,0.67 L0.03,0.33 C0.03,0.28 0.05,0.23 0.09,0.21 L0.35,0.06 C0.39,0.04 0.44,0.02 0.5,0.02 Z";
          const roundedHex3 =
            "M0.5,0.01 C0.54,0.01 0.58,0.02 0.62,0.04 L0.94,0.2 C0.99,0.23 1,0.26 1,0.31 L1,0.69 C1,0.74 0.99,0.77 0.94,0.8 L0.62,0.96 C0.58,0.98 0.54,0.99 0.5,0.99 C0.46,0.99 0.42,0.98 0.38,0.96 L0.06,0.8 C0.01,0.77 0,0.74 0,0.69 L0,0.31 C0,0.26 0.01,0.23 0.06,0.2 L0.38,0.04 C0.42,0.02 0.46,0.01 0.5,0.01 Z";

          const imageShapeAnim =
            index % 2 === 0
              ? [roundedHex1, roundedHex2, roundedHex3, roundedHex1]
              : [roundedHex2, roundedHex3, roundedHex1, roundedHex2];
          const bgShapeAnim =
            index % 2 === 0
              ? [roundedHex3, roundedHex1, roundedHex2, roundedHex3]
              : [roundedHex1, roundedHex2, roundedHex3, roundedHex1];

          const isSocietyName = society.title.endsWith("Society");
          const firstPart = isSocietyName
            ? society.title.replace(" Society", "")
            : society.title.split(" ")[0];
          const secondPart = isSocietyName
            ? "Society"
            : society.title.split(" ").slice(1).join(" ");
          const websiteUrl =
            society.links?.website && society.links.website !== "#"
              ? society.links.website
              : undefined;

          return (
            <motion.div
              id={`society-${society.id}`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              key={society.id}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-28 py-10 md:py-16 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* SVG Definitions for dynamic curved clip-paths since CSS clip-path: polygon doesn't support border-radius */}
              <svg
                width="0"
                height="0"
                className="absolute w-0 h-0 pointer-events-none"
              >
                <defs>
                  <clipPath
                    id={`hexClipBg-${society.id}`}
                    clipPathUnits="objectBoundingBox"
                  >
                    <motion.path
                      animate={{ d: bgShapeAnim }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </clipPath>
                  <clipPath
                    id={`hexClipImg-${society.id}`}
                    clipPathUnits="objectBoundingBox"
                  >
                    <motion.path
                      animate={{ d: imageShapeAnim }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </clipPath>
                </defs>
              </svg>

              {/* Image Side */}
              <div className="w-full md:w-1/2 relative flex justify-center items-center py-6 md:py-10 min-h-[300px] md:min-h-[400px]">
                {/* Wavy line decors (abstract corner squiggles) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute ${isReversed ? "-bottom-6 md:-bottom-10 -right-6 md:-right-10" : "-top-6 md:-top-10 -left-6 md:-left-10"} w-24 md:w-32 h-24 md:h-32 opacity-40 z-0`}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      d="M10 50 Q 25 10 50 50 T 90 50"
                      stroke={society.color || "#f59e0b"}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 70 Q 25 30 50 70 T 90 70"
                      stroke={society.color || "#f59e0b"}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>

                <Dots
                  className={`absolute ${isReversed ? "-top-5 -left-5 md:-left-10" : "-bottom-5 md:-bottom-10 -right-5 md:-right-10"} z-0 opacity-80 scale-50 sm:scale-75 md:scale-100`}
                  style={{ color: society.color }}
                />

                {/* Abstract Hexagon Background */}
                <motion.div
                  animate={{
                    y: [-15, 15, -15],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    clipPath: `url(#hexClipBg-${society.id})`,
                    backgroundColor: society.color,
                  }}
                  className={`absolute w-[240px] h-[260px] sm:w-[300px] sm:h-[320px] lg:w-[420px] lg:h-[450px] z-0 origin-center ${isReversed ? "translate-x-4 md:translate-x-6 -translate-y-4 md:-translate-y-6" : "-translate-x-4 md:-translate-x-6 translate-y-4 md:translate-y-6"}`}
                >
                  {/* Inner nested hexagons for depth, using inset square parents so clipPath scales down seamlessly */}
                  <div
                    className="absolute inset-4 lg:inset-6"
                    style={{ clipPath: `url(#hexClipBg-${society.id})` }}
                  >
                    <div className="w-full h-full bg-white/10" />
                  </div>
                  <div
                    className="absolute inset-8 lg:inset-12"
                    style={{ clipPath: `url(#hexClipBg-${society.id})` }}
                  >
                    <div className="w-full h-full bg-white/20" />
                  </div>
                </motion.div>

                {/* Main Image with Hexagon Shape */}
                <div className="relative z-10 w-[210px] h-[230px] sm:w-[260px] sm:h-[280px] lg:w-[380px] lg:h-[410px] drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
                  {/* Outer clipped white border */}
                  <motion.div
                    animate={{
                      y: [10, -10, 10],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ clipPath: `url(#hexClipImg-${society.id})` }}
                    className="absolute inset-0 bg-white p-2 lg:p-3"
                  >
                    {/* Inner image container */}
                    <div
                      className="relative w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden"
                      style={{ clipPath: `url(#hexClipImg-${society.id})` }}
                    >
                      <Image
                        src={society.logo || "/chapter-logos/society_logo.png"}
                        alt={society.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-6 lg:p-10 transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Additional floating abstract shape */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundColor: society.color }}
                  className={`absolute top-1/2 ${isReversed ? "left-0" : "right-0"} w-12 md:w-16 h-12 md:h-16 opacity-20 filter blur-xl rounded-full mix-blend-multiply`}
                ></motion.div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 px-4 md:pl-10">
                <div className="mb-6 relative">
                  {/* Subtitle brush stroke effect background (Optional, can just use light text) */}
                  <span className="absolute -left-6 -top-6 w-32 h-32 bg-amber-50 rounded-full mix-blend-multiply filter blur-2xl z-[-1]" />
                  <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] text-gray-800 flex flex-col gap-1 md:gap-2 font-sans tracking-tight">
                    <span className="font-light text-gray-700">
                      {firstPart}
                    </span>
                    {secondPart && (
                      <span className="font-black font-serif text-gray-900 leading-[1.1]">
                        {secondPart}
                      </span>
                    )}
                  </h2>
                </div>

                <p className="text-gray-500 mt-2 md:mt-4 mb-8 md:mb-10 text-base md:text-lg leading-relaxed max-w-lg">
                  {society.description}
                </p>

                <div className="w-full max-w-md mb-8 md:mb-10 flex flex-col items-center md:items-start">
                  <div className="flex justify-center md:justify-start w-full">
                    <SocialLinks
                      links={society.links}
                      align="center"
                      theme="light"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
