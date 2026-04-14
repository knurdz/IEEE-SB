import { Metadata } from 'next';
import { EVENTS } from '../data';
import EventDetailPageClient from './EventClientPage';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

// Required for static export: tells Next.js all possible slug values at build time
export function generateStaticParams() {
  return EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata(
  { params }: EventPageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const event = EVENTS.find((e) => e.slug === resolvedParams.slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.name,
    description: event.description,
    openGraph: {
      title: `${event.name} | IEEE Student Branch - University of Moratuwa`,
      description: event.description,
      images: event.mainImage ? [{ url: event.mainImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.name} | IEEE Student Branch - University of Moratuwa`,
      description: event.description,
      images: event.mainImage ? [event.mainImage] : [],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  return <EventDetailPageClient params={params} />;
}
