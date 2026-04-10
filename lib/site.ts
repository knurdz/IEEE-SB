export interface NavItem {
  href: string;
  label: string;
}

export interface SocialItem {
  href: string;
  icon: string;
  label: string;
}

export const primaryNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/teams", label: "Teams" },
  { href: "/chapters", label: "Chapters" },
  { href: "/#contact", label: "Contact" },
];

export const footerQuickLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/teams", label: "Teams" },
  { href: "/chapters", label: "Chapters" },
  { href: "/#contact", label: "Contact" },
];

export const footerSocialItems: SocialItem[] = [
  { href: "https://www.facebook.com/ABORIEEE/", icon: "/social/FB.svg", label: "Facebook" },
  { href: "https://www.instagram.com/iaborieee/", icon: "/social/Insta.svg", label: "Instagram" },
  { href: "https://www.youtube.com/@iaborieee", icon: "/social/You-tube.svg", label: "YouTube" },
  { href: "https://www.linkedin.com/company/ieeesbuom/", icon: "/social/Linkdin.svg", label: "LinkedIn" },
];
