import { MetadataRoute } from 'next';
import { EVENTS } from './events/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ieeesb.uom.lk';

  // Main pages
  const routes = ['', '/chapters', '/events', '/team', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Dynamic Event pages
  const eventRoutes = EVENTS.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...eventRoutes];
}
