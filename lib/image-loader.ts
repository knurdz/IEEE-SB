'use client';

import { resolveStaticAssetUrl } from '@/lib/static-site';

interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src }: LoaderParams) {
  return resolveStaticAssetUrl(src);
}
