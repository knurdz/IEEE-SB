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
  { href: "/contact", label: "Contact" },
];

export const footerSocialItems: SocialItem[] = [
  { href: "#", icon: "/social/FB.svg", label: "Facebook" },
  { href: "#", icon: "/social/Insta.svg", label: "Instagram" },
  { href: "#", icon: "/social/You-tube.svg", label: "YouTube" },
  { href: "#", icon: "/social/Linkdin.svg", label: "LinkedIn" },
];
