import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IEEE Student Branch University of Moratuwa',
    short_name: 'IEEE SB UOM',
    description: 'Official website of IEEE Student Branch, University of Moratuwa.',
    start_url: `${BASE}/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#00629b',
    icons: [
      {
        src: `${BASE}/favicon.webp`,
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  };
}
