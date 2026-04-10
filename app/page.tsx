import TextSphereAnimation from "./components/home/TextSphereAnimation";
import AboutSection from "./components/home/AboutSection";
import AwardsSection from "./components/home/AwardsSection";
import StrategicPartnerSection from "./components/home/StrategicPartnerSection";
import EventsSection from "./components/home/EventsSection";
import WhyJoinBento from "./components/home/WhyJoinBento";
import SiteBackground from "./components/layout/SiteBackground";
import SectionDivider from "@/app/chapters/components/SectionDivider";
import ContactForm from "./contact/components/ContactForm";
import ContactInfo from "./contact/components/ContactInfo";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white">
      <SiteBackground />
      <div className="relative">
        <TextSphereAnimation />
        {/* Bottom Fade Mask to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
        <div className="absolute bottom-[-160px] md:bottom-[-256px] left-0 w-full z-20 pointer-events-none">
          <SectionDivider flipX flipY className="!mt-0 !mb-0" />
        </div>
      </div>

      <AboutSection />
      <AwardsSection />
      <StrategicPartnerSection />
      <EventsSection />

      <WhyJoinBento />

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20" id="contact">
        {/* Top Fade Gradient for Section Background */}
        <div className="absolute inset-x-0 -top-8 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-[-1]" />
        
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-4xl lg:text-7xl text-gray-800 flex items-baseline justify-center gap-4 font-sans tracking-tight mb-6">
            <span className="font-light text-gray-700">Contact</span>
            <span className="font-black font-serif text-gray-900 uppercase">
              Us
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mx-auto italic font-bold">
            Have a question or want to collaborate? We&apos;d love to hear from you.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
          <div className="w-full lg:w-[50%] flex flex-col justify-center">
             <ContactForm />
          </div>
          <div className="w-full lg:w-[50%] flex flex-col justify-between h-full">
             <ContactInfo />
          </div>
        </div>
      </section>
      <div className="h-32"></div>
    </main>
  );
}
