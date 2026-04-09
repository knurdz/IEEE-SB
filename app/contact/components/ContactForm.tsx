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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full text-center py-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <SendIcon className="w-10 h-10 text-[var(--accent)]" />
        </div>
        <h3 className="text-3xl font-bold text-[var(--primary)] mb-3">Message Sent!</h3>
        <p className="text-[var(--muted)] text-lg max-w-sm mx-auto">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[var(--accent)] font-semibold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={fadeUpTransition(0.2, 0.8)}
      className="flex flex-col h-full md:pr-6"
    >
      <h2 className="text-[2.2rem] md:text-[2.8rem] font-bold text-[var(--primary)] mb-4 tracking-tight leading-tight">
        Let&apos;s talk
      </h2>
      <p className="text-[var(--muted)] font-medium text-[0.95rem] md:text-[0.95rem] mb-10 max-w-md leading-relaxed">
        To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[0.8rem] font-semibold text-[var(--muted)] ml-3">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-6 py-4 rounded-[24px] bg-[var(--surface-alt)] border border-[var(--border-soft)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all text-sm font-medium text-[var(--foreground)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[0.8rem] font-semibold text-[var(--muted)] ml-3">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-6 py-4 rounded-[24px] bg-[var(--surface-alt)] border border-[var(--border-soft)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all text-sm font-medium text-[var(--foreground)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-[0.8rem] font-semibold text-[var(--muted)] ml-3">
            Your Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            placeholder="Type something if you want..."
            className="w-full px-6 py-4 rounded-[24px] bg-[var(--surface-alt)] border border-[var(--border-soft)] focus:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all text-[0.9rem] font-medium text-[var(--foreground)] resize-none placeholder:text-[var(--muted)] placeholder:opacity-70"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 self-start glow-button rounded-[24px] !px-10 !py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </motion.div>
  );
}
