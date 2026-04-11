'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
// Custom SVGs for Facebook, X (Twitter), and Instagram icons
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.53 2.47a2.5 2.5 0 0 1 3.54 3.54l-5.1 5.1 5.1 5.1a2.5 2.5 0 0 1-3.54 3.54l-5.1-5.1-5.1 5.1a2.5 2.5 0 0 1-3.54-3.54l5.1-5.1-5.1-5.1A2.5 2.5 0 0 1 6.93 2.47l5.1 5.1 5.1-5.1z"/></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.545 1.445 2.488 2.502 2.23 3.675 2.172 4.952.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.373 3.507 1.057 1.057 2.23 1.315 3.507 1.373C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.277-.058 2.45-.316 3.507-1.373 1.057-1.057 1.315-2.23 1.373-3.507.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.058-1.277-.316-2.45-1.373-3.507C19.398.388 18.225.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
);
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

export default function ContactSection() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-20 px-4 md:px-0" id="contact">
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200 Q 250 150 500 200 T 1000 200" stroke="black" fill="none" strokeWidth="1" />
          <path d="M0 300 Q 250 250 500 300 T 1000 300" stroke="black" fill="none" strokeWidth="1" />
          <path d="M0 400 Q 250 350 500 400 T 1000 400" stroke="black" fill="none" strokeWidth="1" />
          <path d="M0 500 Q 250 450 500 500 T 1000 500" stroke="black" fill="none" strokeWidth="1" />
          <path d="M0 600 Q 250 550 500 600 T 1000 600" stroke="black" fill="none" strokeWidth="1" />
          <path d="M0 700 Q 250 650 500 700 T 1000 700" stroke="black" fill="none" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch relative z-10">
        
        {/* Left Column: Organization Branding & Info */}
        <div className="w-full md:w-[45%] flex flex-col justify-start pt-4 pb-12 md:pr-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-7xl flex flex-wrap items-baseline justify-start gap-4 font-sans tracking-tight mb-12">
              <span className="font-light text-gray-700 uppercase">IEEE Student</span>
              <span className="font-black font-serif text-gray-900 uppercase">BRANCH</span>
            </h2>

            <div className="flex flex-col gap-8 max-w-[320px]">
              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#00589e] shrink-0 border-2 border-[#00589e]/20 group-hover:bg-[#00589e] group-hover:text-white transition-all cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start flex-1">
                   <p className="text-[15px] font-bold text-black/60 text-left leading-tight">
                     IEEE Student Branch, University of Moratuwa, Katubedda, 10400
                   </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#00589e] shrink-0 border-2 border-[#00589e]/20 group-hover:bg-[#00589e] group-hover:text-white transition-all cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start flex-1">
                   <p className="text-[15px] font-bold text-black/60 text-left leading-tight">
                     +94 11 123 4567
                   </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group text-left">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#00589e] shrink-0 border-2 border-[#00589e]/20 group-hover:bg-[#00589e] group-hover:text-white transition-all cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start flex-1">
                   <p className="text-[15px] font-bold text-black/60 text-left leading-tight break-all">
                     Ieeesbuom.2526@gmail.com
                   </p>
                </div>
              </div>
            </div>

            {/* Social Connect Icons */}
            <div className="flex flex-col gap-4 mt-12 md:mt-16">
              <span className="text-[12px] font-bold text-black/40 uppercase tracking-widest">Connect With Us</span>
              <div className="flex items-center gap-4">
                <a href="https://facebook.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-1 hover:brightness-110 drop-shadow-md">
                  <Image src="/social/FB.svg" alt="Facebook" width={44} height={44} />
                </a>
                <a href="https://twitter.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-1 hover:brightness-110 drop-shadow-md">
                  <Image src="/social/X.svg" alt="X (Twitter)" width={44} height={44} />
                </a>
                <a href="https://instagram.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-1 hover:brightness-110 drop-shadow-md">
                  <Image src="/social/Insta.svg" alt="Instagram" width={44} height={44} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Overlapping Map Container - Shifted 10px Left and Up */}
        <div className="w-full md:w-[35%] min-h-[350px] relative z-20 md:-ml-20 md:-mr-4 my-12 md:my-0 flex flex-col justify-center -translate-x-[10px] -translate-y-[10px]">
          <ContactMap />
        </div>

        {/* Right Column: Premium Contact Form Area Wrapper to reduce height */}
        <div className="w-full md:w-[45%] flex flex-col justify-center py-10 md:py-8 lg:py-6 relative z-10 hidden md:flex">
          <div className="w-full bg-gradient-to-br from-[#00589e] via-[#00457c] to-[#00335e] overflow-hidden shadow-2xl rounded-[6px] h-fit">
             <ContactForm />
          </div>
        </div>

        {/* Mobile View rendering of form */}
        <div className="w-full bg-gradient-to-br from-[#00589e] via-[#00457c] to-[#00335e] overflow-hidden shadow-2xl rounded-[6px] relative z-10 md:hidden mt-4">
           <ContactForm />
        </div>

      </div>

      {/* Decorative Arrow Overlay for responsiveness/styling if needed */}
    </section>
  );
}
