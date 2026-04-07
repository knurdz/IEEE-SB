export interface HomeEvent {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  subImages?: string[];
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
    id: "best-innovation-award",
    year: "2023",
    title: "Best Innovation Award",
    image: "/award.jpg",
    imageAlt: "Best innovation award banner",
  },
  {
    id: "industry-leadership-award",
    year: "2022",
    title: "Industry Leadership Award",
    image: "/award.jpg",
    imageAlt: "Industry leadership award banner",
  },
  {
    id: "quality-excellence-award",
    year: "2021",
    title: "Quality Excellence Award",
    image: "/award.jpg",
    imageAlt: "Quality excellence award banner",
  },
];

export const homeEvents: HomeEvent[] = [
  {
    id: 1,
    title: "Cybersecurity CTF",
    date: "Nov 10, 2027",
    category: "Competition",
    description:
      "Test your hacking and defense skills in our immersive Capture The Flag competition. Secure the flags to win.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614064641913-6b7596eff522?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 2,
    title: "Techxplore",
    date: "Oct 24, 2026",
    category: "Symposium",
    description:
      "A national-level technical symposium bringing together the brightest minds to showcase groundbreaking projects and attend workshops.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 3,
    title: "Innovate-A-Thon",
    date: "Mar 12, 2027",
    category: "Hackathon",
    description:
      "Our premier 24-hour hackathon where students build creative technological solutions to solve real-world problems.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 4,
    title: "AI Workshop",
    date: "Jan 15, 2027",
    category: "Workshop",
    description:
      "Dive deep into Artificial Intelligence and Machine Learning basics with hands-on labs and expert-led sessions.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1678505504264-7e80f4f9543e?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 5,
    title: "Code Relay",
    date: "Apr 05, 2027",
    category: "Contest",
    description:
      "A fast-paced competitive programming relay where teams code in shifting phases. Communication is key!",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 6,
    title: "Web Dev Bootcamp",
    date: "May 18, 2027",
    category: "Workshop",
    description:
      "A comprehensive weekend bootcamp covering modern web technologies from React to full-stack deployment.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618477247222-ac60c8059fa4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 7,
    title: "Data Science Summit",
    date: "Aug 22, 2027",
    category: "Conference",
    description:
      "Join industry experts to explore the latest trends in Data Analytics, Big Data, and predictive modeling.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 8,
    title: "Hardware Hackathon",
    date: "Oct 10, 2027",
    category: "Hackathon",
    description:
      "Bring your IoT and robotics ideas to life in this 48-hour hardware building marathon.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    subImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576400883215-7083980b6193?auto=format&fit=crop&q=80&w=800",
    ],
  },
];
