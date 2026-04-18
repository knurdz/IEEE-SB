"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import AboutSection from "./components/home/AboutSection";
import SectionDivider from "@/app/components/ui/SectionDivider";
import ContactSection from "./contact/components/ContactSection";
import PagePreloader from "@/app/components/ui/PagePreloader";

// Lazy load the heavy TextSphereAnimation with dynamic import
const TextSphereAnimation = dynamic(
  () => import("./components/home/TextSphereAnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[65vh] md:h-screen bg-white overflow-hidden">
        <PagePreloader />
      </div>
    ),
  },
);

// Lazy load below-the-fold sections for faster initial page load
const AwardsSection = dynamic(() => import("./components/home/AwardsSection"), {
  ssr: true,
});

const StrategicPartnerSection = dynamic(
  () => import("./components/home/StrategicPartnerSection"),
  {
    ssr: true,
  },
);

const EventsSection = dynamic(() => import("./components/home/EventsSection"), {
  ssr: true,
});

const WhyJoinBento = dynamic(() => import("./components/home/WhyJoinBento"), {
  ssr: true,
});

export default function Home() {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  useEffect(() => {
    if (isGlobalLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGlobalLoading]);

  return (
    <main className="min-h-screen relative bg-white">
      <AnimatePresence mode="wait">
        {isGlobalLoading && <PagePreloader key="preloader" />}
      </AnimatePresence>

      <div className={`relative transition-opacity duration-700 ${isGlobalLoading ? 'opacity-0' : 'opacity-100'}`}>
        <TextSphereAnimation onLoaded={() => setIsGlobalLoading(false)} />
        {/* Bottom Fade Mask to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
        <div className="absolute bottom-[-10rem] md:bottom-[-16rem] left-0 w-full z-20 pointer-events-none text-white lg:text-[#4A3B6B]">
          <SectionDivider flipX flipY className="!mt-0 !mb-0" />
        </div>
      </div>

      <div className={isGlobalLoading ? 'hidden' : 'block'}>
        <AboutSection />

        <Suspense
          fallback={
            <div className="py-20 bg-gray-50" style={{ minHeight: "400px" }} />
          }
        >
          <AwardsSection />
        </Suspense>

        <Suspense
          fallback={
            <div className="py-20 bg-white" style={{ minHeight: "400px" }} />
          }
        >
          <StrategicPartnerSection />
        </Suspense>

        <Suspense
          fallback={
            <div className="py-20 bg-gray-50" style={{ minHeight: "400px" }} />
          }
        >
          <EventsSection />
        </Suspense>

        <Suspense
          fallback={
            <div className="py-20 bg-white" style={{ minHeight: "400px" }} />
          }
        >
          <WhyJoinBento />
        </Suspense>

        <ContactSection />
      </div>
    </main>
  );
}
