"use client";

import { lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import AboutSection from "./components/home/AboutSection";
import SectionDivider from "@/app/components/ui/SectionDivider";
import ContactSection from "./contact/components/ContactSection";

// Lazy load the heavy TextSphereAnimation with dynamic import
const TextSphereAnimation = dynamic(
  () => import("./components/home/TextSphereAnimation"),
  {
    loading: () => (
      <div className="h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center text-gray-600">
          <div className="mb-4">Loading animation...</div>
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    ),
    ssr: false,
  },
);

// Lazy load below-the-fold sections for faster initial page load
const AwardsSection = dynamic(() => import("./components/home/AwardsSection"), {
  loading: () => (
    <div className="py-20 bg-gray-50" style={{ minHeight: "400px" }} />
  ),
  ssr: true,
});

const StrategicPartnerSection = dynamic(
  () => import("./components/home/StrategicPartnerSection"),
  {
    loading: () => (
      <div className="py-20 bg-white" style={{ minHeight: "400px" }} />
    ),
    ssr: true,
  },
);

const EventsSection = dynamic(() => import("./components/home/EventsSection"), {
  loading: () => (
    <div className="py-20 bg-gray-50" style={{ minHeight: "400px" }} />
  ),
  ssr: true,
});

const WhyJoinBento = dynamic(() => import("./components/home/WhyJoinBento"), {
  loading: () => (
    <div className="py-20 bg-white" style={{ minHeight: "400px" }} />
  ),
  ssr: true,
});

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white">
      <div className="relative">
        <Suspense
          fallback={
            <div className="h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="mb-4">Loading animation...</div>
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          }
        >
          <TextSphereAnimation />
        </Suspense>
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
