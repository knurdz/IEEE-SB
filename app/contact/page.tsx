import type { Metadata } from 'next';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import SiteBackground from '../components/layout/SiteBackground';
import BackToTop from '../chapters/components/BackToTop';
import SectionDivider from '../chapters/components/SectionDivider';

export const metadata: Metadata = {
  title: 'Contact Us | IEEE Student Branch - University of Moratuwa',
  description:
    'Get in touch with the IEEE Student Branch at the University of Moratuwa. Reach out for collaborations, inquiries, or more information about our activities.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen relative bg-white overflow-hidden pb-12 md:pb-20" id="contact">
      <SiteBackground />
      <ContactHero />
      <SectionDivider />
      
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start" id="contact-content">
         <div className="w-full lg:w-[50%] flex flex-col justify-center">
            <ContactForm />
         </div>
         <div className="w-full lg:w-[50%] flex flex-col justify-between h-full">
            <ContactInfo />
         </div>
      </section>
      
      <div className="h-32"></div>
      <BackToTop />
    </main>
  );
}
