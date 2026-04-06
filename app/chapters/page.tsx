import type { Metadata } from 'next';
import ChaptersPage from '../components/chapters/ChaptersPage';

export const metadata: Metadata = {
  title: 'IEEE Chapters - University of Moratuwa',
  description:
    'Explore IEEE technical communities and societies at the University of Moratuwa Student Branch.',
};

export default function ChaptersRoutePage() {
  return <ChaptersPage />;
}
