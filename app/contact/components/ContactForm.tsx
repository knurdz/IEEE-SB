'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUpTransition } from '@/lib/motion';

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
        className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-white shadow-2xl p-8 md:p-12 relative overflow-hidden rounded-[4px] border border-gray-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-br from-[#008be6]/10 to-cyan-500/10 pointer-events-none" />
        <div className="w-28 h-28 bg-[#008be6]/10 flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce"
             style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
          <SendIcon className="w-12 h-12 text-[#008be6]" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight uppercase font-serif">Message Sent</h3>
        <p className="text-slate-600 text-lg max-w-sm mx-auto italic">
          Thanks for reaching out! We&apos;ll review your message and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[#008be6] hover:text-cyan-600 font-semibold underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={fadeUpTransition(0.2, 0.6)}
      className="bg-white/80 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden shadow-2xl rounded-[4px] border border-gray-100"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#008be6] to-cyan-400" />
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-50/50 -rotate-12 pointer-events-none"
           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-50/50 rotate-45 pointer-events-none z-0"
           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
      
      <div className="mb-10 text-center relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black font-serif uppercase text-gray-900 mb-3 tracking-widest">Let&apos;s talk</h2>
        <div className="w-12 h-1 bg-[#008be6] mx-auto mb-4" />
        <p className="text-gray-500 text-[1.05rem] italic">
          Send us a message and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 mx-auto max-w-lg w-full">
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="name" className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-widest bg-white/80 px-2 absolute -top-2 left-2 z-10 rounded">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-[4px] hover:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition-all text-base font-medium text-gray-800 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2 relative mt-4">
          <label htmlFor="email" className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-widest bg-white/80 px-2 absolute -top-2 left-2 z-10 rounded">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-[4px] hover:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition-all text-base font-medium text-gray-800 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2 relative mt-4">
          <label htmlFor="message" className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-widest bg-white/80 px-2 absolute -top-2 left-2 z-10 rounded">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="How can we help you?"
            className="w-full px-6 py-6 bg-white border border-gray-200 rounded-[4px] hover:border-blue-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition-all text-base font-medium text-gray-800 resize-none shadow-sm placeholder-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 self-center bg-gradient-to-r from-[#008be6] to-cyan-500 text-white font-bold flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-[0.95rem] shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all w-full rounded-[4px] px-12 py-4 group"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send <SendIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
