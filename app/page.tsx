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
import SectionHeading from "./components/ui/SectionHeading";
import ContactMap from "./contact/components/ContactMap";

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

      <section className="relative z-10 overflow-hidden bg-transparent" id="contact">
        <SiteBackground showTopFade={true} showBottomFade={true} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col lg:flex-row gap-16 items-center lg:items-start relative z-10">
          {/* Left Side: Text and Info */}
          <div className="w-full lg:w-[45%] text-gray-900 flex flex-col justify-start">
            <h2 className="text-4xl lg:text-7xl text-gray-800 flex items-baseline justify-start gap-4 font-sans tracking-tight mb-4">
              <span className="font-light text-gray-700">Contact</span>
              <span className="font-black font-serif text-gray-900 uppercase">
                Us
              </span>
            </h2>

            {/* Premium Info Center */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-[2rem] shadow-lg mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Phone Card */}
                <a href="tel:+94111234567" className="flex flex-col gap-3 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-[#00589e] group-hover:border-[#00589e] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-[0.95rem] font-semibold text-gray-800 group-hover:text-[#00589e] transition-colors">+94 11 123 4567</p>
                  </div>
                </a>

                {/* Email Card */}
                <a href="mailto:Ieeesbuom.2526@gmail.com" className="flex flex-col gap-3 group">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-[#00589e] group-hover:border-[#00589e] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-[0.95rem] font-semibold text-gray-800 group-hover:text-[#00589e] transition-colors whitespace-nowrap">Ieeesbuom.2526@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="h-[1px] w-full bg-gray-200/50 mb-6 rounded-full"></div>

              {/* Address Card */}
              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-[#00589e] group-hover:border-[#00589e] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
                  <p className="text-[0.95rem] font-medium text-gray-800 leading-relaxed group-hover:text-[#00589e] transition-colors">
                    IEEE Student Branch, University of Moratuwa, Katubedda, 10400
                  </p>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-[1px] flex-1 bg-gray-200"></div>
                <span className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.3em]">Connect</span>
                <div className="h-[1px] flex-1 bg-gray-200"></div>
              </div>
              <div className="flex justify-center gap-4">
                <a 
                  href="https://facebook.com/ieeeuom" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2] hover:border-[#1877F2]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1877F2] group-hover:text-white transition-colors duration-300">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/ieeeuom" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30_rgba(0,0,0,0.08)] flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 hover:bg-[#1DA1F2] hover:border-[#1DA1F2]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1DA1F2] group-hover:text-white transition-colors duration-300">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/ieeeuom" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#E4405F] group-hover:text-white transition-colors duration-300">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex justify-center sm:justify-start w-full">
              <ContactMap />
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="w-full lg:w-[55%]">
             <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
