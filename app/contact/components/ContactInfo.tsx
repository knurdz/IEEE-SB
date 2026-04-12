'use client';

import { motion } from 'framer-motion';
import { fadeUpTransition } from '@/lib/motion';
import ContactMap from './ContactMap';

const Mail = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const MapPin = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const Phone = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const Facebook = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Instagram = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const Send = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);
const MessageSquare = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
const Bell = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
);

const contactDetails = [
  {
    icon: <MapPin className="w-5 h-5 text-[var(--muted)]" strokeWidth={2} />,
    content: 'IEEE Student Branch, University of Moratuwa, Katubedda, 10400',
    link: 'https://goo.gl/maps/MoratuwaUniversity',
  },
  {
    icon: <Phone className="w-5 h-5 text-[var(--muted)]" strokeWidth={2} />,
    content: '+94 11 123 4567',
    link: 'tel:+94111234567',
  },
  {
    icon: <Mail className="w-5 h-5 text-[var(--muted)]" strokeWidth={2} />,
    content: 'Ieeesbuom.2526@gmail.com',
    link: 'mailto:Ieeesbuom.2526@gmail.com',
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={fadeUpTransition(0.3, 0.8)}
      className="flex flex-col w-full h-full relative z-10 lg:pt-12"
    >
      <div className="flex flex-col w-full max-w-full sm:max-w-[550px] mx-auto lg:mr-auto lg:ml-12 pl-4">
        
        {/* Premium Info Center */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-[2rem] shadow-lg mb-6 text-left">
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
                <p className="text-[0.95rem] font-semibold text-gray-800 group-hover:text-[#00589e] transition-colors overflow-hidden text-ellipsis whitespace-nowrap">Ieeesbuom.2526@gmail.com</p>
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
    </motion.div>
  );
}
