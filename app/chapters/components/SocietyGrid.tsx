'use client';

import SocietyCard from './SocietyCard';
import { societies } from '../data';

export default function SocietyGrid() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative">
      {societies.map((society, index) => (
        <SocietyCard
          key={society.id}
          society={society}
          reverse={index % 2 === 1}
          index={index}
        />
      ))}
    </main>
  );
}
