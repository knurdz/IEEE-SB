import type { Metadata } from 'next';
import EventsHero from './_components/EventsHero';
import Roadmap from './_components/Roadmap';
import ClosingCTA from './_components/ClosingCTA';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Events | IEEE Student Branch - University of Moratuwa',
  description:
    'Explore the events that define IEEE UOM Student Branch — a legacy of innovation, competition, and community at the University of Moratuwa.',
};

export default function EventsPage() {
  return (
    <main className="bg-ieee-bg min-h-screen text-white font-body selection:bg-ieee-blue selection:text-ieee-bg">
      <EventsHero />

      {/* Separator */}
      <div className="w-full flex justify-center py-4 bg-ieee-bg relative z-10">
        <div className="w-full max-w-[95%] 2xl:max-w-[1400px] h-[2px] bg-gradient-to-r from-transparent via-ieee-blue/80 to-transparent shadow-[0_0_15px_rgba(0,163,255,0.4)]" />
      </div>

      <Roadmap />

      {/* Separator */}
      <div className="w-full flex justify-center py-4 bg-ieee-bg relative z-10">
        <div className="w-full max-w-[95%] 2xl:max-w-[1400px] h-[2px] bg-gradient-to-r from-transparent via-ieee-blue/80 to-transparent shadow-[0_0_15px_rgba(0,163,255,0.4)]" />
      </div>

      <ClosingCTA />
      <Footer />
    </main>
  );
}
