"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteBackground from "@/app/components/layout/SiteBackground";

interface BentoItem {
  title: string;
  description: string;
  bg: string;
  text: string;
  desc: string;
  className: string;
}

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

const bentoContent: BentoItem[] = [
  {
    title: "Join IEEE Today",
    description:
      "Take the next crucial step in your journey. Become a member of the world's largest technical professional organization.",
    bg: "bg-[#eff6ff]",
    text: "text-[#00589e]",
    desc: "text-[#00589e]",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Connect with a global network of engineers and innovators",
    description:
      "Engage with professionals worldwide to exchange ideas, collaborate on projects, and expand your professional horizons.",
    bg: "bg-[#f2fdf5]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Gain access to cutting-edge technical knowledge and resources",
    description:
      "Utilize IEEE’s extensive publications, research, and technical materials to stay informed and develop impactful solutions.",
    bg: "bg-[#fcfaff]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Develop critical skills for engineering and innovation",
    description:
      "Strengthen problem-solving, creativity, analytical thinking, and perseverance through hands-on experiences and challenges.",
    bg: "bg-[#f0f9ff]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Stay updated on emerging technologies and trends",
    description:
      "Participate in conferences, competitions, and workshops that showcase the latest advancements in engineering and technology.",
    bg: "bg-[#f8fafc]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Enhance your career through lifelong learning and certifications",
    description:
      "Benefit from continuing education courses, professional certifications, and training programs that support long-term career growth.",
    bg: "bg-[#fff1f2]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Contribute to global engineering initiatives that benefit society",
    description:
      "Align with IEEE’s mission to advance technology and engineering for the betterment of humanity while building your professional profile.",
    bg: "bg-[#fefce8]",
    text: "text-[#1a1a1a]",
    desc: "text-gray-600",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
  {
    title: "Apply your knowledge to innovate and achieve real-world impact",
    description:
      "Take part in projects, competitions, and research initiatives that turn ideas into tangible technological solutions.",
    bg: "bg-[#171717]",
    text: "text-white",
    desc: "text-gray-400",
    className: "md:col-span-1 lg:col-span-1 min-h-[18.75rem]",
  },
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
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function WhyJoinBento() {
  return (
    <section className="relative overflow-hidden z-10 py-16 lg:py-20 bg-transparent">
      {/* Local Background Matrix with localized fades */}
      <SiteBackground showTopFade={true} showBottomFade={true} />

      {/* Blurred decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50/50 rounded-full filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 z-0" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-50/50 rounded-full filter blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2 z-0" />

      {/* Hexagonal dots cluster */}
      <Dots className="absolute top-20 right-10 text-blue-200/40 z-0 scale-150" />
      <Dots className="absolute bottom-40 left-10 text-indigo-200/40 z-0 scale-125" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl lg:text-7xl text-gray-800 flex items-baseline justify-center gap-4 font-sans tracking-tight mb-6">
            <span className="font-light text-gray-700">Why Join</span>
            <span className="font-black font-serif text-gray-900 uppercase">
              IEEE?
            </span>
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
            const { title, description, bg, text, desc, className } =
              item;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl p-8 flex transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${bg} ${className}`}
              >
                <div className="relative z-20 flex flex-col">
                  <h3
                    className={`text-[1.625rem] font-medium leading-[1.2] tracking-tight mb-3 ${text}`}
                  >
                    {title}
                  </h3>
                  <p className={`text-[0.9375rem] leading-relaxed ${desc}`}>
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-14 w-full">
          <div className="w-full mx-auto">
            <div className="rounded-2xl overflow-hidden border border-black/10 bg-white/90 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/asCkFhj51ys"
                  title="Why Should I Join IEEE"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
