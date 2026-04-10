'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUpTransition } from '@/lib/motion';

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SendIcon = ({ className, strokeWidth = 2, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-white shadow-2xl p-8 md:p-12 relative overflow-hidden rounded-2xl border border-gray-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight uppercase font-serif">Message Sent</h3>
        <p className="text-slate-600 text-lg max-w-sm mx-auto italic">
          Thanks for reaching out! We&apos;ll review your message and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[#40335e] hover:text-[#302547] font-semibold underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={fadeUpTransition(0.2, 0.6)}
      className="bg-white/95 backdrop-blur-xl p-8 md:p-14 relative overflow-hidden shadow-2xl rounded-3xl border border-blue-100/50 min-h-[750px] flex flex-col justify-center"
    >
      {/* Animated Pulsing Hexagon Pattern - Moved to far corner and further reduced size */}
      <div className="absolute -top-10 -right-10 w-40 h-40 md:w-56 md:h-56 pointer-events-none opacity-[0.2] overflow-hidden rounded-tr-2xl z-0">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Core Hexagon */}
            <polygon points="100,50 143.3,75 143.3,125 100,150 56.7,125 56.7,75" stroke="#40335e" strokeOpacity="1" strokeWidth="1.5" fill="#40335e" fillOpacity="0.05" />
            
            {/* Pulsing Outer Hexagonal Rings */}
            {[...Array(5)].map((_, i) => (
              <motion.polygon
                key={i}
                points="100,10 177.94,55 177.94,145 100,190 22.06,145 22.06,55"
                stroke="#40335e"
                strokeWidth={0.75}
                strokeDasharray={i % 2 === 0 ? "6 8" : "none"}
                fill="none"
                initial={{ scale: 0.35 + (i * 0.18) }}
                animate={{ 
                  scale: [0.35 + (i * 0.18), 0.4 + (i * 0.18), 0.35 + (i * 0.18)],
                  opacity: [0.1, 0.7, 0.1],
                  rotate: i % 2 !== 0 ? [0, -5, 0] : [0, 5, 0]
                }}
                style={{ transformOrigin: "100px 100px" }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      <div className="mb-6 text-left relative z-10 max-w-[85%] md:max-w-[75%] lg:max-w-[80%] xl:max-w-[75%]">
        <h2 className="text-3xl lg:text-[2.6rem] leading-tight font-sans font-medium text-gray-900 mb-2 tracking-tight">Let&apos;s talk</h2>
        <p className="text-gray-600 text-lg font-sans leading-relaxed">Have a question or want to collaborate? Send us a message and we&apos;ll get back to you within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-10 relative z-10 w-full mt-4">
        <div className="flex flex-col relative group">
          <label 
            htmlFor="name" 
            className="absolute -top-[10px] left-5 px-2 bg-white text-[0.75rem] font-bold text-[#4c6b8c] uppercase tracking-wider z-20 transition-colors group-focus-within:text-[#00589e]"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="Name"
            className="w-full px-6 py-4 bg-white/50 border border-blue-200/60 rounded-2xl hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#00589e]/10 focus:border-[#00589e] transition-all text-base text-gray-800 font-bold placeholder:font-normal relative z-10 shadow-sm"
          />
        </div>

        <div className="flex flex-col relative group">
          <label 
            htmlFor="email" 
            className="absolute -top-[10px] left-5 px-2 bg-white text-[0.75rem] font-bold text-[#4c6b8c] uppercase tracking-wider z-20 transition-colors group-focus-within:text-[#00589e]"
          >
            Your Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full px-6 py-4 bg-white/50 border border-blue-200/60 rounded-2xl hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#00589e]/10 focus:border-[#00589e] transition-all text-base text-gray-800 font-bold placeholder:font-normal relative z-10 shadow-sm"
            />
            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-blue-400 z-20">
              <MailIcon className="w-5 h-5" />
            </span>
          </div>
        </div>

        <div className="flex flex-col relative group">
          <label 
            htmlFor="message" 
            className="absolute -top-[10px] left-5 px-2 bg-white text-[0.75rem] font-bold text-[#4c6b8c] uppercase tracking-wider z-20 transition-colors group-focus-within:text-[#00589e]"
          >
            Your Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="Type your message here"
            className="w-full px-6 py-4 bg-white/50 border border-blue-200/60 rounded-2xl hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-[#00589e]/10 focus:border-[#00589e] transition-all text-base text-gray-800 font-bold placeholder:font-normal resize-none h-40 relative z-10 shadow-sm"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-xl bg-[#00589e] px-6 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-[#00457c] disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
