'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';
import { footerSocialItems } from '@/lib/site';

export default function ContactSection() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-20 px-4 md:px-0 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:px-8" id="contact">
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

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch relative z-10 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:gap-8 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:flex-col">
        
        {/* Left Column: Organization Branding & Info */}
        <div className="w-full md:w-[45%] flex flex-col justify-start pt-4 pb-12 md:pr-12 relative z-10 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:max-w-[42rem] [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:mx-auto [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:w-full [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:pb-4 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:pr-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-7xl flex flex-wrap items-baseline justify-start gap-4 font-sans tracking-tight mb-12">
              <span className="font-light text-black uppercase">IEEE Student</span>
              <span className="font-black font-serif text-black uppercase">BRANCH</span>
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

              <div className="flex items-center gap-6 group text-left">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#00589e] shrink-0 border-2 border-[#00589e]/30 bg-[#00589e]/5 group-hover:bg-[#00589e] group-hover:text-white transition-all cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start flex-1">
                   <p className="text-[15px] font-bold text-black/70 text-left leading-tight break-all font-sans">
                     Ieeesbuom.2526@gmail.com
                   </p>
                </div>
              </div>
            </div>

            {/* Social Connect Icons */}
            <div className="flex flex-col gap-4 mt-12 md:mt-16">
              <span className="text-[12px] font-bold text-black/40 uppercase tracking-widest">Connect With Us</span>
              <div className="flex items-center flex-wrap gap-4">
                {footerSocialItems.map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-transform hover:-translate-y-1 hover:brightness-110 drop-shadow-md"
                  >
                    <Image src={social.icon} alt={social.label} width={44} height={44} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Overlapping Map Container - Increased Width and Size */}
        <div className="w-full md:w-[42%] min-h-[400px] relative z-20 md:-ml-24 md:-mr-8 my-12 md:my-0 flex flex-col justify-center -translate-x-[10px] -translate-y-[10px] [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:max-w-[42rem] [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:mx-auto [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:w-full [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:my-0 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:translate-x-0 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:translate-y-0 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:ml-0 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:mr-0">
          <ContactMap />
        </div>

        {/* Right Column: Premium Contact Form Area Wrapper - Expanded for no overlap */}
        <div className="w-full md:w-[70%] flex flex-col justify-center py-10 md:py-8 lg:py-6 relative z-10 hidden md:flex md:-ml-[20%] [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:hidden">
          <div className="w-full bg-[#00589e] overflow-hidden shadow-2xl rounded-[6px] h-fit">
             <ContactForm />
          </div>
        </div>

        {/* Mobile View rendering of form */}
        <div className="w-full bg-[#00589e] overflow-hidden shadow-2xl rounded-[6px] relative z-10 md:hidden mt-4 [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:block [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:max-w-[42rem] [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:mx-auto [@media(min-width:768px)_and_(max-width:1024px)_and_(orientation:portrait)]:mt-0">
           <ContactForm />
        </div>

      </div>

      {/* Decorative Arrow Overlay for responsiveness/styling if needed */}
    </section>
  );
}
