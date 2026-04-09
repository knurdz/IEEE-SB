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
    <div className="relative w-full aspect-square max-h-[300px] mx-auto mb-12 flex items-center justify-center">
      {/* Background circles */}
      <div className="absolute w-[280px] h-[280px] bg-[var(--surface-alt)] rounded-full opacity-60" />
      <div className="absolute w-[200px] h-[200px] bg-[var(--primary-glow)] rounded-full opacity-80" />

      {/* Envelope center */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
        className="z-10 relative bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] w-[110px] h-[85px] rounded-2xl shadow-xl flex items-center justify-center border-t border-white/30"
      >
        <div className="absolute -top-6 bg-white w-20 h-16 rounded-t-lg shadow-sm flex flex-col items-center justify-start pt-2 gap-1.5 opacity-90 z-[-1]">
          <div className="w-12 h-1 bg-[#E2E8F0] rounded-full" />
          <div className="w-14 h-1 bg-[#E2E8F0] rounded-full" />
          <div className="w-10 h-1 bg-[#E2E8F0] rounded-full" />
        </div>
        <Mail className="w-12 h-12 text-white fill-white/20" strokeWidth={1} />
      </motion.div>

      {/* Send Plane */}
      <motion.div 
        animate={{ x: [0, 10, 0], y: [0, -5, 0] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
        className="absolute right-4 top-16 z-20 text-[var(--accent)] rotate-[-20deg]"
      >
        <Send className="w-12 h-12 fill-[var(--accent)] text-[var(--accent)] opacity-90 drop-shadow-md" strokeWidth={1} />
      </motion.div>

      {/* Notification Bell */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }} 
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
        className="absolute left-8 top-12 z-20 bg-[var(--accent)] p-3 rounded-full shadow-[0_8px_16px_rgba(0,139,230,0.4)]"
      >
        <Bell className="w-6 h-6 fill-white text-white" strokeWidth={1.5} />
      </motion.div>

      {/* Message Bubble */}
      <motion.div 
        animate={{ y: [0, 8, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} 
        className="absolute left-4 bottom-16 z-20 bg-[var(--primary)] p-3.5 rounded-2xl rounded-bl-md shadow-[0_8px_16px_rgba(0,87,157,0.3)]"
      >
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="absolute top-8 right-24 w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
      <div className="absolute bottom-10 left-20 w-3 h-3 rounded-full bg-blue-400" />
      <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-pink-400" />
      <div className="absolute bottom-12 right-12 w-2.5 h-2.5 border-[2px] border-green-400 rounded-full" />
      <div className="absolute top-1/3 left-0 w-1.5 h-1.5 rounded-full bg-purple-400" />
      <div className="absolute bottom-4 right-1/3 w-1.5 h-1.5 rounded-full bg-orange-400" />
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
      className="flex flex-col w-full h-full justify-between items-center lg:items-start pl-0 lg:pl-10"
    >
      <ContactIllustration />

      <div className="flex flex-col gap-5 w-full max-w-[320px] mx-auto lg:ml-8 lg:mr-auto pl-4">
        {contactDetails.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target={item.link.startsWith('http') ? '_blank' : undefined}
            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex flex-row items-center gap-4 group"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={fadeUpTransition(0.4 + index * 0.1, 0.5)}
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center opacity-80 group-hover:scale-110 group-hover:text-[var(--accent)] transition-all">
              {item.icon}
            </div>
            <p className="text-[0.95rem] text-[var(--muted)] font-medium leading-snug hover:text-[var(--primary)] transition-colors line-clamp-2">
              {item.content}
            </p>
          </motion.a>
        ))}

        {/* Social Icons mapped to the original image colors roughly, or blue gradient */}
        <motion.div 
          className="flex flex-row gap-4 mt-6 pl-[40px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fadeUpTransition(0.7, 0.5)}
        >
          <a href="https://facebook.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:-translate-y-1 shadow-lg shadow-[#1877F2]/30 transition-all">
            <Facebook className="w-5 h-5 fill-white border-white" strokeWidth={0.5} />
          </a>
          <a href="https://twitter.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-[#40B4E5] flex items-center justify-center text-white hover:-translate-y-1 shadow-lg shadow-[#40B4E5]/30 transition-all">
            <Twitter className="w-5 h-5 fill-white text-white border-white" strokeWidth={0.5} />
          </a>
          <a href="https://instagram.com/ieeeuom" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-gradient-to-tr from-[#FFC107] via-[#F44336] to-[#9C27B0] flex items-center justify-center text-white hover:-translate-y-1 shadow-lg shadow-[#F44336]/30 transition-all">
            <Instagram className="w-[22px] h-[22px]" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
