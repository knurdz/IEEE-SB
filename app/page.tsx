import TextSphereAnimation from './components/TextSphereAnimation';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';

export default function Home() {
  return (
    <main className="min-h-screen" id="home">
      <TextSphereAnimation />
      <AboutSection />
      <EventsSection />
    </main>
  );
}
