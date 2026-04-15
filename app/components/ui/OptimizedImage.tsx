'use client';

import { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { cn } from '@/lib/cn';
import { resolveStaticAssetUrl } from '@/lib/static-site';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string | any; // allow any for static imports
  wrapperClassName?: string;
  skeletonClassName?: string;
  forceLoading?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  skeletonClassName,
  forceLoading,
  priority,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Apply basePath for HTTP servers (GitHub Pages etc.).
  // unoptimized=true bypasses the custom loader, so we resolve the path here.
  const resolvedSrc = typeof src === 'string' ? resolveStaticAssetUrl(src) : src;

  return (
    <div className={cn("relative overflow-hidden w-full h-full", wrapperClassName)}>
      {/* Background Skeleton */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200/40 dark:bg-zinc-800/40 animate-pulse backdrop-blur-sm z-0",
            skeletonClassName
          )}
        />
      )}
      
      {!hasError ? (
        <NextImage
          src={resolvedSrc}
          alt={alt || "Image"}
          className={cn(
            "transition-opacity duration-500 ease-in-out z-10",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={(e) => {
            setIsLoading(false);
            if (onLoad) onLoad(e);
          }}
          onError={(e) => {
            setIsLoading(false);
            setHasError(true);
            if (onError) onError(e);
          }}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          unoptimized={true} // ensure unoptimized for static exports to prevent client-side optimization errors if server is missing
          {...props}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-zinc-900/50 flex flex-col items-center justify-center text-xs text-center text-gray-400">
          <svg className="w-6 h-6 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="opacity-70">Image failed to load</span>
        </div>
      )}
    </div>
  );
}
