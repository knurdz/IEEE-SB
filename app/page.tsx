import TextSphereAnimation from "./components/home/TextSphereAnimation";
import AboutSection from "./components/home/AboutSection";
import AwardsSection from "./components/home/AwardsSection";
import StrategicPartnerSection from "./components/home/StrategicPartnerSection";
import EventsSection from "./components/home/EventsSection";
import WhyJoinBento from "./components/home/WhyJoinBento";
import SiteBackground from "./components/layout/SiteBackground";
import SectionDivider from "@/app/chapters/components/SectionDivider";
import ContactForm from "./contact/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactSection from "./contact/components/ContactSection";

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white">
      <div className="relative">
        <TextSphereAnimation />
        {/* Bottom Fade Mask to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
        <div className="absolute bottom-[-160px] md:bottom-[-256px] left-0 w-full z-20 pointer-events-none text-white lg:text-[#4A3B6B]">
          <SectionDivider flipX flipY className="!mt-0 !mb-0" />
        </div>
      </div>

      <AboutSection />
      <AwardsSection />
      <StrategicPartnerSection />
      <EventsSection />

      <WhyJoinBento />

      <ContactSection />
    </main>
  );
}
