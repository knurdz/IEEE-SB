import StrategicPartnerSection from './components/home/StrategicPartnerSection';
import TextSphereAnimation from './components/home/TextSphereAnimation';
import AboutSection from './components/home/AboutSection';
import EventsSection from './components/home/EventsSection';

export default function Home() {
  return (
    <main className="min-h-screen" id="home">
      <TextSphereAnimation />
      <AboutSection />
      <StrategicPartnerSection />
      <EventsSection />
    </main>
  );
}
