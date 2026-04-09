import TextSphereAnimation from './components/home/TextSphereAnimation';
import WhyJoinBento from './components/home/WhyJoinBento';
import SiteBackground from './components/layout/SiteBackground';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-white">
      <div className="relative">
        <TextSphereAnimation />
        {/* Bottom Fade Mask to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
      </div>
      <WhyJoinBento />
    </main>
  );
}
