import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Sections | IEEE Student Branch - University of Moratuwa',
  description: 'Explore the different sections of the IEEE Student Branch at the University of Moratuwa.',
};

import WhyJoinBento from './components/WhyJoinBento';
import SiteBackground from '../components/layout/SiteBackground';

export default function WhyJoinPage() {
  return (
    <main className="min-h-screen relative bg-white pb-20" id="page-sections">
      <SiteBackground showTopFade={true} showBottomFade={true} />
      <section className="mt-[20rem] mb-[20rem]">
        <WhyJoinBento />
      </section>
    </main>
  );
}
