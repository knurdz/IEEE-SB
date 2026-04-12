export interface Society {
  id: string;
  title: string;
  description: string;
  logo: string;
  color: string;
  links: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const societies: Society[] = [
  {
    id: 'computer-society',
    title: 'IEEE Computer Society (CS)',
    description: "The IEEE Computer Society at the University of Moratuwa serves as a space for innovation in software engineering, algorithms, and system design which is a leading global community for computing professionals. The chapter fosters a strong technical foundation through coding competitions, development projects, and knowledge-sharing sessions. By aligning students with industry standards and emerging technologies, it prepares them to tackle complex computing challenges. Members gain both practical expertise and a deep understanding of modern software ecosystems.",
    logo: '/chapter-logos/1.png',
    color: '#97022d', // IEEE Computer Society Blue
    links: { website: 'https://www.computer.org/', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'computational-intelligence',
    title: 'IEEE Computational Intelligence Society (CIS)',
    description: 'The IEEE Computational Intelligence Society focuses on the development of intelligent and adaptive systems inspired by human cognition. It promotes learning in areas such as artificial intelligence, machine learning, neural networks, and data-driven modeling. Through hackathons, research initiatives, and innovation challenges, students are encouraged to explore real-world problem-solving. The chapter cultivates analytical thinking and empowers members to build cutting-edge AI solutions.',
    logo: '/chapter-logos/16.png',
    color: '#01529d', // CIS Dark Indigo
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'communications-society',
    title: 'IEEE Communications Society (ComSoc)',
    description: 'The IEEE Communications Society is dedicated to advancing next-generation communication technologies and global connectivity. It explores wireless systems, mobile networks, data transmission, and internet infrastructure. Through technical workshops, expert talks, and practical demonstrations, students gain insight into how modern communication systems operate. The chapter bridges theoretical knowledge with real-world applications in a rapidly evolving digital landscape.',
    logo: '/chapter-logos/2.png',
    color: '#396831', // ComSoc Cyan
    links: { website: 'https://www.comsoc.org/', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'robotics-automation',
    title: 'IEEE Robotics and Automation Society (RAS)',
    description: 'Focused on intelligent machines and automation, the IEEE Robotics and Automation Society provides hands-on exposure to robotics design, embedded systems, and autonomous technologies. Students actively engage in building prototypes, participating in competitions, and developing innovative robotic solutions. The chapter emphasizes experiential learning, encouraging members to apply engineering concepts to real-world challenges. It nurtures creativity and technical excellence in the field of robotics.',
    logo: '/chapter-logos/5.png',
    color: '#eb8e00', // RAS Red
    links: { website: 'https://www.ieee-ras.org/', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'microwave-theory',
    title: 'IEEE Microwave Theory and Techniques Society (MTT-S)',
    description: 'The IEEE Microwave Theory and Techniques Society specializes in high-frequency engineering and advanced communication technologies. It introduces students to RF systems, microwave circuits, antenna design, and signal propagation. Through simulations, laboratory work, and technical sessions, members gain in-depth practical knowledge. The chapter strengthens expertise in communication hardware and prepares students for specialized engineering domains.',
    logo: '/chapter-logos/13.png',
    color: '#00aded', // MTT-S Purple
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'engineering-medicine-biology',
    title: 'IEEE Engineering in Medicine and Biology Society (EMBS)',
    description: 'The IEEE Engineering in Medicine and Biology Society bridges the gap between engineering and healthcare innovation. It focuses on biomedical signal processing, medical imaging, and healthcare device development. Students participate in interdisciplinary projects and research-oriented activities that address real medical challenges. The chapter inspires innovation aimed at improving diagnostics, treatment methods, and overall patient care.',
    logo: '/chapter-logos/12.png',
    color: '#652d92', // EMBS Teal
    links: { website: 'https://www.embs.org/', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'signal-processing',
    title: 'IEEE Signal Processing Society (SPS)',
    description: 'The IEEE Signal Processing Society explores the analysis, interpretation, and transformation of signals in various domains. It covers applications such as audio processing, image analysis, and data modeling techniques. Through algorithm development, simulations, and competitions, students build strong analytical and technical skills. The chapter enables members to work on real-world problems involving complex data and signal systems.',
    logo: '/chapter-logos/3.png',
    color: '#7a2c83', // SPS Red
    links: { website: 'https://signalprocessingsociety.org/', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'nuclear-plasma-sciences',
    title: 'IEEE Nuclear and Plasma Sciences Society (NPSS)',
    description: 'The IEEE Nuclear and Plasma Sciences Society introduces students to advanced scientific fields including nuclear systems and plasma technologies. It explores applications in energy systems, radiation technology, and high-energy physics. Through seminars and technical discussions, members gain exposure to specialized and emerging research areas. The chapter builds a strong foundation in scientific principles and advanced engineering concepts.',
    logo: '/chapter-logos/8.png', // Reusing placeholder or matching correct index if known
    color: '#ee2229', // NPSS Red
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'power-energy',
    title: 'IEEE Power and Energy Society (PES)',
    description: 'The IEEE Power and Energy Society focuses on modern power systems and sustainable energy solutions. It covers smart grids, renewable energy integration, and efficient power distribution techniques. Through workshops, projects, and industry engagement, students gain practical exposure to real-world energy challenges. The chapter prepares members to contribute to the future of global energy systems.',
    logo: '/chapter-logos/4.png',
    color: '#861931', // PES Green/Teal
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'geoscience-remote-sensing',
    title: 'IEEE Geoscience and Remote Sensing Society (GRSS)',
    description: 'The IEEE Geoscience and Remote Sensing Society focuses on Earth observation technologies and spatial data analysis. It explores satellite imaging, environmental monitoring, and geospatial intelligence. Students engage in data-driven projects and research activities to understand global environmental systems. The chapter promotes innovation in analyzing and interpreting large-scale geospatial data.',
    logo: '/chapter-logos/14.png',
    color: '#70b8e4', // GRSS Indigo
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'professional-communication',
    title: 'IEEE Professional Communication Society (ProCom)',
    description: 'The IEEE Professional Communication Society enhances essential communication skills required for engineering and professional success. It focuses on technical writing, presentations, and effective interpersonal communication. Through workshops and training sessions, students learn to clearly articulate complex ideas. The chapter prepares members to excel in both academic and corporate environments.',
    logo: '/chapter-logos/6.png', // Placeholder
    color: '#79bc1f', // ProCom Green
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'women-in-engineering',
    title: 'IEEE Women in Engineering (WIE)',
    description: 'IEEE Women in Engineering is dedicated to promoting diversity, inclusion, and empowerment within the engineering community. It provides mentorship, leadership development, and networking opportunities for aspiring professionals. Through various initiatives, the chapter supports personal and technical growth. It creates a strong and supportive platform for women to thrive in STEM fields.',
    logo: '/chapter-logos/7.png', // Placeholder
    color: '#04567a', // WIE Blue
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'industry-applications',
    title: 'IEEE Industry Applications Society (IAS)',
    description: 'The IEEE Industry Applications Society focuses on applying engineering principles in real-world industrial environments. It explores industrial automation, electrical systems, and practical engineering solutions. Through industry visits, workshops, and case studies, students gain hands-on experience. The chapter bridges the gap between academic knowledge and industrial practices.',
    logo: '/chapter-logos/9.png', // Placeholder
    color: '#274f10', // IAS Dark Green
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'technology-engineering-management',
    title: 'IEEE Technology and Engineering Management Society (TEMS)',
    description: 'The IEEE Technology and Engineering Management Society develops leadership and management skills for future engineers. It focuses on entrepreneurship, innovation management, and strategic decision-making. Through seminars and collaborative activities, students learn to manage technology-driven projects. The chapter prepares members to lead and innovate in competitive industries.',
    logo: '/chapter-logos/11.png', // Placeholder
    color: '#005f9d', // TEMS Blue
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'industrial-electronics',
    title: 'IEEE Industrial Electronics Society (IES)',
    description: 'The IEEE Industrial Electronics Society explores advanced electronic systems used in modern industries. It emphasizes automation, control systems, and smart industrial technologies. Students engage in hands-on learning and technical experimentation to understand system-level operations. The chapter strengthens practical skills in industrial electronics and automation.',
    logo: '/chapter-logos/10.png',
    color: '#a4be1d', // IES Yellow-Green
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'power-electronics',
    title: 'IEEE Power Electronics Society (PELS)',
    description: 'The IEEE Power Electronics Society focuses on efficient energy conversion and power management technologies. It covers converters, motor drives, and renewable energy interfaces. Through simulations, circuit design, and applied projects, students gain practical expertise. The chapter equips members with the skills needed for modern power engineering applications.',
    logo: '/chapter-logos/15.png', // Placeholder
    color: '#1fb2e2', // PELS Light Blue
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
];

