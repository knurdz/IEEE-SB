import type { Metadata } from 'next';
import EventsHero from './components/EventsHero';
import Roadmap from './components/Roadmap';
import ClosingCTA from './components/ClosingCTA';
import SiteBackground from '../components/layout/SiteBackground';

export const metadata: Metadata = {
  title: 'Events | IEEE Student Branch - University of Moratuwa',
  description:
    'Explore the events that define our legacy of innovation, competition, and community at the University of Moratuwa.',
};

export default function EventsPage() {
  return (
    <main className="min-h-screen relative bg-white text-foreground overflow-hidden">
      <SiteBackground />
      <EventsHero />

      {/* Hero Separator */}
      <div className="w-full flex justify-center py-6 bg-transparent relative z-10">
        <div className="w-[95%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent fiber-glow" />
      </div>

      <Roadmap />

      {/* Roadmap Separator */}
      <div className="w-full flex justify-center py-8 bg-transparent relative z-10 overflow-hidden">
        <div className="w-[95%] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent fiber-glow" />
      </div>

      <ClosingCTA />
    </main>
  );
}
