export interface EventItem {
  id: number;
  name: string;
  date: string;
  year: string;
  category: string;
  categoryColor: string;
  description: string;
  images: string[];
  gallery: string[];
}

export const EVENTS: EventItem[] = [
  {
    id: 1,
    name: 'OpenWeek',
    date: 'March–April 2026',
    year: '2026',
    category: 'COMMUNITY',
    categoryColor: '#10B981',
    description:
      'OpenWeek is an introductory two‑day event welcoming new students into the IEEE community at the University of Moratuwa. It includes talks, short workshops, and hands‑on demos in robotics, embedded systems, and data science. The event also highlights volunteering, leadership roles, and opportunities to join major IEEE competitions and projects.',
    images: ['/images/OpenWeek/OpenWeek.jpg', '/images/OpenWeek/OpenWeek2.jpg'],
    gallery: ['/images/OpenWeek/OpenWeek.jpg', '/images/OpenWeek/OpenWeek2.jpg'],
  },
  {
    id: 2,
    name: 'MoraUxplore',
    date: 'Late 2025 – early 2026',
    year: '2025',
    category: 'CAREER',
    categoryColor: '#EC4899',
    description:
      'MoraUxplore is an online or hybrid career and technology‑exploration platform for engineering students. It uses virtual booths, webinars, and panels with industry professionals and alumni. The event focuses on internships, research, and personal‑branding skills, helping students explore diverse engineering career paths.',
    images: ['/images/MoraUxplore/MoraUxplore.jpg'],
    gallery: ['/images/MoraUxplore/MoraUxplore.jpg'],
  },
  {
    id: 3,
    name: 'MoraXtreme',
    date: 'October 2025 – January 2026',
    year: '2025',
    category: 'HACKATHON',
    categoryColor: '#F59E0B',
    description:
      'MoraXtreme is a national competitive‑programming championship organized by the IEEE Student Branch, University of Moratuwa. Teams from universities across Sri Lanka solve algorithmic problems under time pressure. The event includes training sessions and a grand‑final awards ceremony to recognize top coders.',
    images: ['/images/MoraXtreme/MoraXtreme.jpg', '/images/MoraXtreme/MoraXtreme2.jpg'],
    gallery: ['/images/MoraXtreme/MoraXtreme.jpg', '/images/MoraXtreme/MoraXtreme2.jpg'],
  },
  {
    id: 4,
    name: 'Roboroarz',
    date: 'October 2025 + early 2026',
    year: '2025',
    category: 'COMPETITION',
    categoryColor: '#FF6B35',
    description:
      'Roboroarz Sri Lanka is a national robotics battle and competition hosted by the IEEE Student Branch, University of Moratuwa. Teams design and operate robots for sumo‑style pushing, line‑tracking, and combat‑style arenas. The event also features research robotics exhibitions and mini‑challenges for students and hobbyists.',
    images: ['/images/Roboroarz/Roboroarz.jpeg'],
    gallery: ['/images/Roboroarz/Roboroarz.jpeg'],
  },
  {
    id: 5,
    name: 'Foresight',
    date: 'Late 2025',
    year: '2025',
    category: 'INNOVATION',
    categoryColor: '#7C3AED',
    description:
      'Foresight is an insight‑driven career and innovation event by the IEEE Student Branch, University of Moratuwa. It features talks on AI, robotics, and future job markets, along with networking and mentorship opportunities. The event helps students connect classroom learning with practical engineering foresight.',
    images: ['/images/foresight/foresight.jpg'],
    gallery: ['/images/foresight/foresight.jpg'],
  },
  {
    id: 6,
    name: 'Ballerina',
    date: 'October 2025',
    year: '2025',
    category: 'CREATIVE',
    categoryColor: '#F472B6',
    description:
      '\u201cBallerina\u201d is a themed technical and social event combining art with engineering and robotics. It features interactive installations, light‑based robots, and music‑synchronized machines. The event promotes creativity and design thinking, making engineering more visually engaging for students.',
    images: ['/images/Ballerina/Ballerina.png'],
    gallery: ['/images/Ballerina/Ballerina.png'],
  },
  {
    id: 7,
    name: 'AGM & Award Ceremony',
    date: 'October 2025',
    year: '2025',
    category: 'ANNUAL',
    categoryColor: '#00A3FF',
    description:
      'The AGM & Award Ceremony is the formal closing event of the IEEE Student Branch, University of Moratuwa, where officers present annual reports and hand over leadership. It includes recognition of top volunteers and contributors, guest speeches, and a roadmap for the next year.',
    images: ['/images/AGM & Award Ceremony/AGM & Award Ceremony.jpg'],
    gallery: ['/images/AGM & Award Ceremony/AGM & Award Ceremony.jpg'],
  },
  {
    id: 8,
    name: 'MERCon',
    date: 'August 2025',
    year: '2025',
    category: 'CONFERENCE',
    categoryColor: '#6366F1',
    description:
      'Mercon is an annual conference organized by the IEEE Student Branch celebrating academic and professional excellence in engineering. The event includes research paper presentations, talks, and workshops on engineering topics. It brings together academics, researchers, and students in a collaborative setting.',
    images: ['/images/Mercon/Mercon.jpg'],
    gallery: ['/images/Mercon/Mercon.jpg'],
  },
  {
    id: 9,
    name: 'Robotics Day',
    date: 'Mid‑year 2025',
    year: '2025',
    category: 'SHOWCASE',
    categoryColor: '#14B8A6',
    description:
      'Robotics Day is a festival showcasing robotics projects, competitions, and live demos from student teams and research groups. It covers autonomous navigation, drones, robot arms, and humanoid robots. The event also includes short talks and interactive sessions to promote robotics among undergraduates.',
    images: ['/images/Robotics Day/Robotics Day.jpeg'],
    gallery: ['/images/Robotics Day/Robotics Day.jpeg'],
  },
  {
    id: 10,
    name: 'FInnC',
    date: 'March–June 2025',
    year: '2025',
    category: 'INNOVATION',
    categoryColor: '#7C3AED',
    description:
      'FInnC (Future Innovators Challenge) is an innovation competition where undergraduate teams develop prototype solutions to real‑world problems. Participants work on projects in IoT, robotics, energy, and smart systems. The event ends with an on‑site evaluation and awards for creativity, technical depth, and impact.',
    images: ['/images/Finnc/Finnc.jpeg'],
    gallery: ['/images/Finnc/Finnc.jpeg'],
  },
  {
    id: 11,
    name: 'JamborIEEE',
    date: 'September 2023',
    year: '2023',
    category: 'CONFERENCE',
    categoryColor: '#6366F1',
    description:
      'JamborIEEE is a national IEEE awareness and leadership conference originally organized by IEEE Student Branches of Sri Lanka Technological Campus and Kotelawala Defence University. It includes talks, panels, and workshops on branch development and volunteering.',
    images: [],
    gallery: [],
  },
  {
    id: 12,
    name: 'NFB Championship',
    date: 'March 2023',
    year: '2023',
    category: 'ESPORTS',
    categoryColor: '#EF4444',
    description:
      'The NFB Championship is an esports‑style gaming tournament organized by the IEEE Student Branch, University of Moratuwa. The event is structured as a competitive bracket tournament where university teams register, undergo qualifying rounds, and progress to live‑streamed finals.',
    images: ['/images/NFB championship/NFB championship.jpeg'],
    gallery: ['/images/NFB championship/NFB championship.jpeg'],
  },
  {
    id: 13,
    name: 'IEEEXtreme',
    date: 'October each year',
    year: 'Annual',
    category: 'COMPETITION',
    categoryColor: '#FF6B35',
    description:
      "IEEEXtreme is IEEE's flagship 24‑hour global programming competition for student teams. Participants solve challenging algorithmic problems in a single day under time pressure. The contest is hosted through local IEEE branches and serves as practice for international coding contests and technical interviews.",
    images: ['/images/IEEEXtreme/IEEEXtreme.jpg'],
    gallery: ['/images/IEEEXtreme/IEEEXtreme.jpg'],
  },
  {
    id: 14,
    name: 'RUM',
    date: 'Second half of the year',
    year: 'Annual',
    category: 'LEADERSHIP',
    categoryColor: '#84CC16',
    description:
      'RUM is an internal IEEE leadership retreat where branch officers review past activities, update strategies, and plan upcoming events. It includes workshops on leadership, project management, and membership growth across branches. The retreat helps align calendars and strengthen collaboration within the IEEE student community.',
    images: [],
    gallery: [],
  },
];
