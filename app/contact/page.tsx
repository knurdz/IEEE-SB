import type { Metadata } from 'next';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import SiteBackground from '../components/layout/SiteBackground';
import SectionDivider from '../chapters/components/SectionDivider';

export const metadata: Metadata = {
  title: 'Contact Us | IEEE Student Branch - University of Moratuwa',
  description:
    'Get in touch with the IEEE Student Branch at the University of Moratuwa. Reach out for collaborations, inquiries, or more information about our activities.',
};

import ContactSection from './components/ContactSection';

export default function ContactPage() {
  return (
    <main className="min-h-screen relative bg-white overflow-hidden" id="contact">
      <SiteBackground />
      <ContactHero />
      <SectionDivider />
      
      <ContactSection />
    </main>
  );
}
