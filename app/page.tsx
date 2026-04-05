import HeroSection from './components/HeroSection';
import EventsSectionNew from './components/EventsSectionNew';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <EventsSectionNew />
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

