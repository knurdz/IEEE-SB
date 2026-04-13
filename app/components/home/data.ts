export interface HomeEvent {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  subImages?: string[];
  link?: string;
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  image: string;
  imageAlt: string;
  badge?: string;
  description?: string;
}

export const featuredAward: AwardItem = {
  id: "international-award",
  year: "",
  title: "Most Outstanding Student Branch in the Asia-Pacific Region at the IEEE Region 10 SAC Awards",
  image: "/International awrd.jpg.jpeg",
  imageAlt: "Most Outstanding Student Branch in the Asia-Pacific Region Award",
  badge: "International Recognition",
};

export const secondaryAwards: AwardItem[] = [
  {
    id: "sls-best-branch-award",
    year: "",
    title: "Best Student Branch Project Award (MoraForesight)",
    image: "/events-assets/Foresight/logo.png",
    imageAlt: "MoraForesight logo",
    description: "The Best Student Branch Project award for MoraForesight was presented at IEEE Sri Lanka Section awards"
  },
  {
    id: "sls-outstanding-tech-initiative-award",
    year: "",
    title: "Best Industry Collaborative Project Award (Rise Up Mora)",
    image: "/events-assets/RUM/logo.png",
    imageAlt: "Rise Up Mora logo",
    description: "The Best Industry Collaborative Project award for Rise Up Mora was presented at IEEE Sri Lanka Section awards"
  },
  {
    id: "sls-community-impact-award",
    year: "",
    title: "Outstanding Technical Chapter Award (IEEE EMBS)",
    image: "/chapter-logos/CL1.png",
    imageAlt: "IEEE EMBS logo",
    description: "The Outstanding Technical Chapter award for IEEE EMBS was presented at IEEE Sri Lanka Section awards"
  },
];

export const homeEvents: HomeEvent[] = [
  {
    id: 1,
    title: "Ballerina",
    category: "Workshop",
    description:
      "A deep dive into the Ballerina programming language, exploring cloud-native development and integration patterns for modern engineers.",
    image: "/events-assets/Ballerina/banner.jpg",
    link: "/events/ballerina",
  },
  {
    id: 2,
    title: "Foresight",
    category: "Symposium",
    description:
      "Bridging the gap between academia and industry through expert talks on AI, robotics, and the future of engineering job markets.",
    image: "/events-assets/Foresight/banner.jpg",
    link: "/events/foresight",
  },
  {
    id: 3,
    title: "Mercon",
    category: "Conference",
    description:
      "Our premier annual conference celebrating research excellence and technical innovation across all engineering disciplines.",
    image: "/events-assets/Mercon/banner.jpg",
    link: "/events/mercon",
  },
  {
    id: 4,
    title: "MoraXtreme",
    category: "Hackathon",
    description:
      "A national-level competitive programming championship where the best coders solve complex algorithmic problems under pressure.",
    image: "/events-assets/Moraxtreme/banner.jpg",
    link: "/events/moraxtreme",
  },
  {
    id: 5,
    title: "Rise Up Mora",
    category: "Career",
    description:
      "An internship-focused career development initiative connecting students with top industry partners and mentorship opportunities.",
    image: "/events-assets/RUM/banner.jpg",
    link: "/events/rise-up-mora",
  },
  ];
