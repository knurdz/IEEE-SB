'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import CustomAlert from '@/app/components/ui/CustomAlert';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [status, setStatus] = useState<'' | 'success' | 'error'>('');
  const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, message: string, type: 'error'|'success'|'info'}>({
    isOpen: false,
    message: '',
    type: 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setStatus('success');
      } else {
        setStatus('error');
        setAlertConfig({ isOpen: true, message: 'Failed to send message. Please try again later.', type: 'error' });
      }
    } catch (error) {
      console.error('Email error:', error);
      setStatus('error');
      setAlertConfig({ isOpen: true, message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-full min-h-[25rem] text-center p-8 lg:py-10 lg:pr-10 lg:pl-[calc(2.5rem+36%)] text-white relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Message Sent</h3>
        <p className="text-white/80 text-lg max-w-sm mx-auto font-medium">
          Thanks for reaching out! Our team will review your message and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <CustomAlert 
        isOpen={alertConfig.isOpen} 
        message={alertConfig.message} 
        type={alertConfig.type} 
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full h-full flex flex-col p-8 lg:py-10 lg:pr-10 lg:pl-[calc(2rem+30%)] relative z-10 text-white [@media(min-width:48rem)_and_(max-width:64rem)]:p-10"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[5rem] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00457c]/50 rounded-full blur-[3.75rem] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="mb-6 relative z-20">
        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-3">Let&apos;s Talk</h3>
        <p className="text-white/80 font-medium max-w-[20rem] text-[0.9375rem] leading-relaxed">
          Have a question or want to collaborate? Send us a message and we&apos;ll get back to you within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mb-0 relative z-20">
        
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="text-[0.75rem] font-bold text-white uppercase tracking-widest pl-1">Name</label>
          <input
            type="text"
            id="name"
            required
            className="bg-white/10 border border-white/20 outline-none focus:border-white focus:bg-white/20 focus:ring-4 focus:ring-white/10 rounded-[0.375rem] text-white font-medium text-base w-full px-5 py-2.5 transition-all placeholder:text-white/40"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-[0.75rem] font-bold text-white uppercase tracking-widest pl-1">Email Address</label>
          <input
            type="email"
            id="email"
            required
            className="bg-white/10 border border-white/20 outline-none focus:border-white focus:bg-white/20 focus:ring-4 focus:ring-white/10 rounded-[0.375rem] text-white font-medium text-base w-full px-5 py-2.5 transition-all placeholder:text-white/40"
            placeholder="Your email"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="message" className="text-[0.75rem] font-bold text-white uppercase tracking-widest pl-1">Message</label>
          <textarea
            id="message"
            required
            rows={3}
            className="bg-white/10 border border-white/20 outline-none focus:border-white focus:bg-white/20 focus:ring-4 focus:ring-white/10 rounded-[0.375rem] text-white font-medium text-base w-full px-5 py-2.5 resize-none transition-all placeholder:text-white/40"
            placeholder="Write your message here..."
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex items-center justify-center gap-3 w-full md:w-auto bg-white px-10 py-3 rounded-[0.375rem] text-[0.9375rem] font-black text-[#00589e] uppercase tracking-wider overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer [@media(min-width:48rem)_and_(max-width:64rem)]:w-full"
          >
            {/* Hover Expansion Background */}
            <div className="absolute inset-0 w-0 bg-gray-100 transition-all duration-300 ease-out group-hover:w-full z-0" />
            
            <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            
            <motion.div 
               className="relative z-10"
               animate={isSubmitting ? { x: 20, opacity: 0 } : { x: 0, opacity: 1 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </motion.div>
          </button>
        </div>
      </form>
    </motion.div>
    </>
  );
}
