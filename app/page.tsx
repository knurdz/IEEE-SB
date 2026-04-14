import TextSphereAnimation from "./components/home/TextSphereAnimation";
import AboutSection from "./components/home/AboutSection";
import AwardsSection from "./components/home/AwardsSection";
import StrategicPartnerSection from "./components/home/StrategicPartnerSection";
import EventsSection from "./components/home/EventsSection";
import WhyJoinBento from "./components/home/WhyJoinBento";
import SiteBackground from "./components/layout/SiteBackground";
import SectionDivider from "@/app/components/ui/SectionDivider";
import ContactForm from "./contact/components/ContactForm";
import ContactSection from "./contact/components/ContactSection";

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
      <AwardsSection />
      <StrategicPartnerSection />
      <EventsSection />

      <WhyJoinBento />

      <ContactSection />
    </main>
  );
}
