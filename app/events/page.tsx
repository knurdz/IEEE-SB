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
    <main
      className="min-h-screen text-white font-body selection:bg-ieee-blue selection:text-ieee-bg"
      style={{ background: 'linear-gradient(180deg, #000408 0%, #030E23 45%, #000408 100%)' }}
    >
      <EventsHero />

      {/* Hero Separator (Header Line) */}
      <div className="w-full flex justify-center py-6 bg-ieee-bg relative z-10">
        <div className="w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent shadow-[0_0_25px_rgba(0,163,255,0.8)]" />
      </div>

      <Roadmap />

      {/* Roadmap Separator */}
      <div className="w-full flex justify-center py-8 bg-ieee-bg relative z-10 overflow-hidden">
        <div className="w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent shadow-[0_0_25px_rgba(0,163,255,0.8)]" />
      </div>

      <ClosingCTA />
    </main>
  );
}
