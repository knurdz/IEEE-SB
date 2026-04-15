'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { resolveStaticRouteHref } from '@/lib/static-site';

type StaticSiteLinkProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export default function StaticSiteLink({
  href,
  children,
  ...props
}: StaticSiteLinkProps) {
  return (
    <a href={resolveStaticRouteHref(href)} {...props}>
      {children}
    </a>
  );
}
