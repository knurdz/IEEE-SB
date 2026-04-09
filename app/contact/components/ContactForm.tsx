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
        className="flex flex-col items-center justify-center h-full min-h-[400px] text-center glass-fiber rounded-3xl p-8 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 pointer-events-none" />
        <div className="w-24 h-24 bg-[var(--primary-glow)] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,139,230,0.2)] rotate-3">
          <SendIcon className="w-12 h-12 text-[var(--accent)] -rotate-3" />
        </div>
        <h3 className="text-3xl font-bold text-[var(--foreground)] mb-4 tracking-tight">Message Sent</h3>
        <p className="text-[var(--muted)] text-lg max-w-sm mx-auto">
          Thanks for reaching out! We&apos;ll review your message and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[var(--accent)] hover:text-[var(--primary)] font-semibold underline underline-offset-4 transition-colors"
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
      className="glass-fiber rounded-3xl p-8 md:p-12 shadow-xl border border-white/40 bg-white/60 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
      
      <div className="mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Let&apos;s talk</h2>
        <p className="text-gray-500 text-[1.05rem]">
          Have a question or want to collaborate? Send us a message and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-[var(--muted)] ml-1 uppercase tracking-wider">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-5 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--border-soft)] hover:border-[var(--accent)]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all text-[0.95rem] font-medium text-[var(--foreground)] shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-[var(--muted)] ml-1 uppercase tracking-wider">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-5 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--border-soft)] hover:border-[var(--accent)]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all text-[0.95rem] font-medium text-[var(--foreground)] shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-[var(--muted)] ml-1 uppercase tracking-wider">
            Your Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="How can we help you?"
            className="w-full px-5 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[var(--border-soft)] hover:border-[var(--accent)]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all text-[0.95rem] font-medium text-[var(--foreground)] resize-none shadow-sm placeholder-[var(--muted)]/50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 self-start glow-button rounded-xl !px-10 !py-4 font-semibold flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-[0.9rem] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit <SendIcon className="w-4 h-4 ml-1" strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
