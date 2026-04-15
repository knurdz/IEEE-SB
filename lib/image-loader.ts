'use client';

import { resolveStaticAssetUrl, isFileProtocol } from '@/lib/static-site';

interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

// Inlined at build time by Next.js (defined in next.config.ts → env)
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function imageLoader({ src }: LoaderParams) {
  // Pass external URLs (http/https/data/blob/etc.) through unchanged
  if (/^(?:[a-z][a-z\d+\-.]*:|\/\/)/.test(src)) return src;

  // For file:// protocol (local browsing), use the file-based resolver
  if (isFileProtocol()) {
    return resolveStaticAssetUrl(src);
  }

  // For HTTP servers (GitHub Pages etc.): prepend basePath to absolute paths
  // Next.js does NOT do this automatically for custom loaders.
  if (src.startsWith('/') && BASE_PATH && !src.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${src}`;
  }

  return src;
}
