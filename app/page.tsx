import StrategicPartnerSection from './components/home/StrategicPartnerSection';
import TextSphereAnimation from './components/home/TextSphereAnimation';
import AboutSection from './components/home/AboutSection';
import AwardsSection from './components/home/AwardsSection';
import EventsSection from './components/home/EventsSection';
import WhyJoinSection from './components/WhyJoinSection';

export default function Home() {
  return (
    <main className="min-h-screen relative" id="home">
      <TextSphereAnimation />
      <AboutSection />
      <WhyJoinSection />
      <AwardsSection />
      <StrategicPartnerSection />
      <EventsSection />
    </main>
  );
}
