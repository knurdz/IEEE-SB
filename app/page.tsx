import TextSphereAnimation from './components/home/TextSphereAnimation';
import WhyJoinBento from './components/home/WhyJoinBento';
import SiteBackground from './components/layout/SiteBackground';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#F8F9FA]" id="home">
      <TextSphereAnimation />
      <WhyJoinBento />
    </main>
  );
}
