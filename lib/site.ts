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
  { href: "/#home", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/chapters", label: "Chapters" },
];

export const footerSocialItems: SocialItem[] = [
  { href: "#", icon: "/social/FB.svg", label: "Facebook" },
  { href: "#", icon: "/social/Insta.svg", label: "Instagram" },
  { href: "#", icon: "/social/You-tube.svg", label: "YouTube" },
  { href: "#", icon: "/social/Linkdin.svg", label: "LinkedIn" },
];
