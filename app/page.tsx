"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import AboutSection from "./components/home/AboutSection";
import SectionDivider from "@/app/components/ui/SectionDivider";
import ContactSection from "./contact/components/ContactSection";

// Lazy load the heavy TextSphereAnimation with dynamic import
const TextSphereAnimation = dynamic(
  () => import("./components/home/TextSphereAnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[65vh] md:h-screen bg-white overflow-hidden">
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-700/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-700 rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-700/80 text-sm font-jetbrains tracking-[0.3em] animate-pulse">
              LOADING
            </p>
          </div>
        </div>
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
  return (
    <main className="min-h-screen relative bg-white">
      <div className="relative">
        <TextSphereAnimation />
        {/* Bottom Fade Mask to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
        <div className="absolute bottom-[-10rem] md:bottom-[-16rem] left-0 w-full z-20 pointer-events-none text-white lg:text-[#4A3B6B]">
          <SectionDivider flipX flipY className="!mt-0 !mb-0" />
        </div>
      </div>

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
    </main>
  );
}
