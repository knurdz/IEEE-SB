import type { Metadata } from 'next';
import EventsHero from './_components/EventsHero';
import Roadmap from './_components/Roadmap';
import ClosingCTA from './_components/ClosingCTA';

export const metadata: Metadata = {
  title: 'Events | IEEE Student Branch - University of Moratuwa',
  description:
    'Explore the events that define IEEE UOM Student Branch — a legacy of innovation, competition, and community at the University of Moratuwa.',
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground fiber-lines relative">
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
