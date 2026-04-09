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
    <main className="min-h-screen relative bg-[#F8F9FA]" id="contact">
      <ContactBackground />
      <ContactHero />
      
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-[#0F172A]">Get in touch</h2>
              <p className="text-[#475569] leading-relaxed">
                We are always open to new ideas, collaborations, and inquiries. Whether you are a student, professional, or potential partner, feel free to reach out to us using the contact information or the form.
              </p>
            </div>
            
            <ContactInfo />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-[#0F172A]">Send us a message</h2>
              <p className="text-[#475569] leading-relaxed">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="h-20 md:h-32"></div>
      <BackToTop />
    </main>
  );
}
