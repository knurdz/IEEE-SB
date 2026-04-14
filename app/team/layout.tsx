import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the dedicated leaders and volunteers of the IEEE Student Branch, University of Moratuwa. Discover the people behind our innovation and impact.',
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}