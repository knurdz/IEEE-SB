'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { fadeUpTransition } from '@/lib/motion';

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
        className="p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-[#E2E8F0] text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Message Sent!</h3>
        <p className="text-[#475569]">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[#008be6] font-medium hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-[#E2E8F0] shadow-sm flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={fadeUpTransition(0.2, 0.8)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-[#475569] ml-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="John Doe"
            className="px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#008be6]/20 focus:border-[#008be6] transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[#475569] ml-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="john@example.com"
            className="px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#008be6]/20 focus:border-[#008be6] transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-[#475569] ml-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          placeholder="How can we help?"
          className="px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#008be6]/20 focus:border-[#008be6] transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-[#475569] ml-1">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell us more about your inquiry..."
          className="px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#008be6]/20 focus:border-[#008be6] transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full py-4 rounded-xl bg-[#008be6] text-white font-semibold hover:bg-[#007acc] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
}
