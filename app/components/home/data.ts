export interface HomeEvent {
  id: number;
  title: string;
  date: string;
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
}

export const featuredAward: AwardItem = {
  id: "international-award",
  year: "2024",
  title: "International Award",
  image: "/s2.jpg",
  imageAlt: "International IEEE award banner",
  badge: "International Recognition",
};

export const secondaryAwards: AwardItem[] = [
  {
    id: "sls-best-branch-award",
    year: "2023",
    title: "Best Student Branch Award",
    image: "/award.jpg",
    imageAlt: "Sri Lankan section best student branch award banner",
  },
  {
    id: "sls-outstanding-tech-initiative-award",
    year: "2022",
    title: "Outstanding Technical Initiative Award",
    image: "/award.jpg",
    imageAlt: "Sri Lankan section outstanding technical initiative award banner",
  },
  {
    id: "sls-community-impact-award",
    year: "2021",
    title: "Community Impact Award",
    image: "/award.jpg",
    imageAlt: "Sri Lankan section community impact award banner",
  },
];

export const homeEvents: HomeEvent[] = [
  {
    id: 1,
    title: "Ballerina",
    date: "July 12, 2025",
    category: "Workshop",
    description:
      "A deep dive into the Ballerina programming language, exploring cloud-native development and integration patterns for modern engineers.",
    image: "/events/Ballerina/banner.jpg",
    link: "/events/ballerina",
  },
  {
    id: 2,
    title: "Foresight",
    date: "June 05, 2025",
    category: "Symposium",
    description:
      "Bridging the gap between academia and industry through expert talks on AI, robotics, and the future of engineering job markets.",
    image: "/events/Foresight/banner.jpg",
    link: "/events/foresight",
  },
  {
    id: 3,
    title: "Mercon",
    date: "Sept 10, 2025",
    category: "Conference",
    description:
      "Our premier annual conference celebrating research excellence and technical innovation across all engineering disciplines.",
    image: "/events/Mercon/banner.jpg",
    link: "/events/mercon",
  },
  {
    id: 4,
    title: "MoraXtreme",
    date: "Dec 15, 2025",
    category: "Hackathon",
    description:
      "A national-level competitive programming championship where the best coders solve complex algorithmic problems under pressure.",
    image: "/events/Moraxtreme/banner.jpg",
    link: "/events/moraxtreme",
  },
  {
    id: 5,
    title: "Rise Up Mora",
    date: "Aug 20, 2025",
    category: "Career",
    description:
      "An internship-focused career development initiative connecting students with top industry partners and mentorship opportunities.",
    image: "/events/RUM/banner.jpg",
    link: "/events/rise-up-mora",
  },
  ];
