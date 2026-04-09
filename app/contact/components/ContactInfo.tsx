'use client';

import { motion } from 'framer-motion';
import { fadeUpTransition } from '@/lib/motion';

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
    content: 'ieee@uom.lk',
    link: 'mailto:ieee@uom.lk',
  },
];

const ContactIllustration = () => {
  return (
    <div className="relative w-full aspect-square max-h-[350px] mx-auto mb-4 flex items-center justify-center">
      {/* Abstract Tech Node Background */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[var(--primary)]" fill="none">
           <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" strokeWidth="0.5" />
           <circle cx="50" cy="50" r="40" strokeWidth="0.2" strokeDasharray="2 4" />
           <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" strokeWidth="0.2" className="stroke-[var(--accent)]" />
        </svg>
      </motion.div>

      {/* Main Core Node */}
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[140px] h-[160px] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-80 mix-blend-multiply blur-[30px] rounded-full shadow-[0_0_60px_rgba(0,139,230,0.4)]" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(0,139,230,0.6)]">
           <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="2.5" className="text-[var(--accent)] backdrop-blur-sm" />
           <path d="M50 5 L50 95 M11 27.5 L89 72.5 M11 72.5 L89 27.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" className="text-white" />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <MessageSquare className="w-12 h-12 text-white fill-white/10 drop-shadow-md" strokeWidth={1.5} />
        </div>
      </motion.div>
      
      {/* Floating Orbital Nodes */}
      <motion.div 
        animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-10 right-6 md:right-10 w-14 h-14 bg-white/50 backdrop-blur-lg rounded-xl border border-white/60 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] rotate-12"
      >
        <Mail className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} />
      </motion.div>
      
      <motion.div 
        animate={{ y: [8, -8, 8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-16 left-4 md:left-8 w-16 h-16 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/60 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] -rotate-6"
      >
        <Phone className="w-7 h-7 text-[var(--primary)]" strokeWidth={2} />
      </motion.div>

      <motion.div 
        animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/4 left-6 md:left-12 w-10 h-10 bg-white/40 backdrop-blur-md rounded-lg border border-white/50 flex items-center justify-center shadow-lg rotate-45"
      >
        <MapPin className="w-5 h-5 text-gray-500" strokeWidth={2} />
      </motion.div>
    </div>
  );
};

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={fadeUpTransition(0.3, 0.8)}
      className="flex flex-col w-full h-full lg:pl-10 relative z-10"
    >
      <ContactIllustration />

      <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto lg:ml-8 lg:mr-auto pl-4 mt-8">
        {contactDetails.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target={item.link.startsWith('http') ? '_blank' : undefined}
            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex flex-row items-center gap-5 group glass-fiber bg-white/40 border-white/40 hover:bg-white/70 p-4 rounded-2xl transition-all shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={fadeUpTransition(0.4 + index * 0.1, 0.5)}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)] transition-all text-gray-400">
              {item.icon}
            </div>
            <p className="text-[0.95rem] text-gray-600 font-medium leading-relaxed hover:text-[var(--primary)] transition-colors">
              {item.content}
            </p>
          </motion.a>
        ))}

        {/* Social Icons Connect Line */}
        <div className="flex items-center gap-4 mt-8 pl-[10px]">
          <div className="w-12 h-[1px] bg-gray-300" />
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Connect</span>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>

        <motion.div 
          className="flex flex-row gap-5 mt-4 justify-center pr-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fadeUpTransition(0.7, 0.5)}
        >
          <a href="https://facebook.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#1877F2] hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all">
            <Facebook className="w-5 h-5 fill-current border-[#1877F2]" strokeWidth={0.5} />
          </a>
          <a href="https://twitter.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#40B4E5] hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-[#40B4E5]/20 transition-all">
            <Twitter className="w-5 h-5 fill-current border-[#40B4E5]" strokeWidth={0.5} />
          </a>
          <a href="https://instagram.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#E1306C] hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-[#E1306C]/20 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC107] via-[#F44336] to-[#9C27B0] opacity-0 group-hover:opacity-100 transition-opacity" />
            <Instagram className="w-5 h-5 group-hover:text-white transition-colors relative z-10" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
