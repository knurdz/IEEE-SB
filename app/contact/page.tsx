import type { Metadata } from 'next';
import ContactHero from './components/ContactHero';
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
    <main className="min-h-screen bg-white" id="contact">
    </main>
  );
}
