import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name.ar,
    short_name: site.shortName.ar,
    description: site.description.ar,
    start_url: '/ar',
    display: 'browser',
    lang: 'ar',
    dir: 'rtl',
    background_color: '#0a1420',
    theme_color: '#1e3a5f',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
