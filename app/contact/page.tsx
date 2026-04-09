import type { Metadata } from 'next';
import ContactBackground from './components/ContactBackground';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import BackToTop from '../chapters/components/BackToTop';

export const metadata: Metadata = {
  title: 'Contact Us | IEEE Student Branch - University of Moratuwa',
  description:
    'Get in touch with the IEEE Student Branch at the University of Moratuwa. Reach out for collaborations, inquiries, or more information about our activities.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-[var(--surface-alt)]" id="contact">
      <ContactBackground />
      
      <div className="w-full max-w-[1100px] glass-fiber rounded-[32px] md:rounded-[40px] shadow-2xl relative z-10 overflow-hidden p-8 md:p-12 lg:p-[4.5rem] flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
         {/* Left Side: Form */}
         <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <ContactForm />
         </div>
         {/* Right Side: Illustration and Info */}
         <div className="w-full lg:w-[45%] flex flex-col justify-between h-full">
            <ContactInfo />
         </div>
      </div>
      
      <BackToTop />
    </main>
  );
}
