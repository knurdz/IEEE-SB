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
    title: 'Computer Society',
    description: "The world's leading organization for computer professionals, driving technological innovation. We connect over 300,000 computing professionals worldwide to advance technology and benefit society. Our members stay at the forefront of computing through conferences, publications, and educational resources.",
    logo: '/chapters/1.png',
    color: '#97022d', // IEEE Computer Society Blue
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'communications-society',
    title: 'Communications Society',
    description: 'A leading global community of engineers and researchers advancing communications and networking technology. ComSoc fosters the development and timely distribution of information and knowledge to the worldwide technical community through publications, conferences, and outreach programs.',
    logo: '/chapters/2.png',
    color: '#396831', // ComSoc Cyan
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'signal-processing',
    title: 'Signal Processing Society',
    description: 'Advancing and disseminating state-of-the-art scientific information and resources related to signal processing. The society connects a global community of researchers and practitioners who develop innovative algorithms and systems for audio, image, video, and multimedia signal processing.',
    logo: '/chapters/3.png',
    color: '#7a2c83', // SPS Red
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'power-energy',
    title: 'Power & Energy Society',
    description: 'The largest forum for sharing the latest in technological developments in the electric power industry. PES provides premier technical knowledge, education, and networking opportunities to professionals working in the generation, transmission, and distribution of electric energy.',
    logo: '/chapters/4.png',
    color: '#861931', // PES Green/Teal
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'robotics-automation',
    title: 'Robotics & Automation Society',
    description: 'Promoting innovation, education, and fundamental research in robotics and automation. RAS members pioneer advancements in intelligent machines that work alongside humans, from industrial automation to surgical robots, autonomous vehicles, and beyond.',
    logo: '/chapters/5.png',
    color: '#eb8e00', // RAS Red
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'circuits-systems',
    title: 'Circuits & Systems Society',
    description: 'Leading the advancement of the theory, analysis, design, tools, and implementation of circuits and systems. CAS provides a vibrant community for engineers working on chip design, embedded systems, biomedical circuits, and next-generation computing architectures.',
    logo: '/chapters/6.png',
    color: '#79bc1f', // CAS Deep Purple
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'control-systems',
    title: 'Control Systems Society',
    description: 'Advancing the science and engineering of control systems, from classical feedback theory to modern autonomous systems. CSS fosters innovation in areas like adaptive control, optimal control, and cyber-physical systems that underpin modern infrastructure and technology.',
    logo: '/chapters/7.png',
    color: '#04567a', // CSS Dark Teal
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'photonics',
    title: 'Photonics Society',
    description: 'Representing the laser, optoelectronics, and photonics community. The Photonics Society promotes the generation, collection, and conversion of light through research, innovation, and professional development across fiber optics, quantum photonics, and integrated photonic circuits.',
    logo: '/chapters/8.png',
    color: '#ee2229', // Bright Red
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'electron-devices',
    title: 'Electron Devices Society',
    description: 'Fostering innovation in electron devices, including semiconductor devices, MEMS, displays, and sensors. EDS members contribute to the development of technologies that power everything from smartphones and computers to medical devices and renewable energy systems.',
    logo: '/chapters/9.png',
    color: '#274f10', // EDS Blue
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'industrial-electronics',
    title: 'Industrial Electronics Society',
    description: 'Advancing the field of industrial electronics through education, research, and development. IES focuses on intelligent and computer-controlled systems, robotics, power electronics, and other technologies that drive modern manufacturing and industrial automation.',
    logo: '/chapters/10.png',
    color: '#a4be1d', // IES Orange
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'vehicular-technology',
    title: 'Vehicular Technology Society',
    description: 'Promoting the advancement of theory and practice in mobile radio, vehicular technology, land transportation, and intelligent transportation systems. VTS members work on cutting-edge technologies for wireless communications, autonomous vehicles, and smart cities.',
    logo: '/chapters/11.png',
    color: '#005f9d', // VTS Green
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'engineering-medicine-biology',
    title: 'Engineering in Medicine & Biology Society',
    description: 'Advancing the application of engineering sciences and technology to medicine and biology. EMBS members develop medical devices, diagnostic systems, and therapeutic technologies that improve healthcare delivery and patient outcomes worldwide.',
    logo: '/chapters/12.png',
    color: '#652d92', // EMBS Teal
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'microwave-theory',
    title: 'Microwave Theory & Technology Society',
    description: 'Leading the advancement of RF and microwave engineering. MTT-S supports professionals working on wireless communications, radar systems, satellite technology, and millimeter-wave circuits that enable modern telecommunications infrastructure.',
    logo: '/chapters/13.png',
    color: '#00aded', // MTT-S Purple
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'geoscience-remote-sensing',
    title: 'Geoscience & Remote Sensing Society',
    description: 'Promoting the advancement of remote sensing and geoscience through education and research. GRSS members apply electromagnetic sensing technologies to monitor Earth\'s environment, natural resources, and climate for scientific and societal benefit.',
    logo: '/chapters/14.png',
    color: '#70b8e4', // GRSS Indigo
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'antennas-propagation',
    title: 'Antennas & Propagation Society',
    description: 'Advancing the theory and application of antennas and electromagnetic wave propagation. AP-S members design innovative antenna systems for wireless communications, radar, satellite systems, and emerging applications in 5G and beyond.',
    logo: '/chapters/15.png',
    color: '#1fb2e2', // AP-S Deep Red
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 'computational-intelligence',
    title: 'Computational Intelligence Society',
    description: 'Promoting the theory, design, and application of computational intelligence methods. CIS focuses on neural networks, fuzzy systems, evolutionary computation, and other bio-inspired technologies that enable intelligent systems and artificial intelligence.',
    logo: '/chapters/16.png',
    color: '#01529d', // CIS Dark Indigo
    links: { website: '#', instagram: '#', linkedin: '#', twitter: '#' },
  },
];

