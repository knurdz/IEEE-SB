import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Sections | IEEE Student Branch - University of Moratuwa',
  description: 'Explore the different sections of the IEEE Student Branch at the University of Moratuwa.',
};

import WhyJoinBento from './components/WhyJoinBento';

export default function WhyJoinPage() {
  return (
    <main className="min-h-screen relative bg-[#F8F9FA]" id="page-sections">
      <section className="mt-[20rem] mb-[20rem]">
        <WhyJoinBento />
      </section>
    </main>
  );
}
