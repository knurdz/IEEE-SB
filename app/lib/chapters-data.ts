export interface Chapter {
  id: string
  name: string
  shortName: string
  logo: string
  description: string
  social: {
    website?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    facebook?: string
    youtube?: string
  }
}

export const chapters: Chapter[] = [
  {
    id: "cs",
    name: "Computer Society",
    shortName: "CS",
    logo: "/chapters-logos/ieee-cs.jpg",
    description: "The world's leading organization for computer professionals, driving technological innovation. We connect over 300,000 computing professionals worldwide to advance technology and benefit society. Our members stay at the forefront of computing through conferences, publications, and educational resources.",
    social: {
      website: "https://www.computer.org",
      twitter: "https://twitter.com/iaborot",
      linkedin: "https://linkedin.com/company/ieee-computer-society",
      instagram: "https://instagram.com/ieeecomputersociety",
    },
  },
  {
    id: "ras",
    name: "Robotics and Automation Society",
    shortName: "RAS",
    logo: "/chapters-logos/ieee-ras.jpg",
    description: "Advancing innovation, education, and research in robotics and automation technologies. We foster collaboration among researchers, engineers, and practitioners to solve real-world challenges. Our society organizes premier conferences and publishes cutting-edge research in robotics and automation.",
    social: {
      website: "https://www.ieee-ras.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-ras",
      youtube: "https://youtube.com/user/IO1X",
    },
  },
  {
    id: "pes",
    name: "Power & Energy Society",
    shortName: "PES",
    logo: "/chapters-logos/ieee-pes.jpg",
    description: "Leading the way in power and energy engineering for a sustainable future. We address critical challenges in electric power generation, transmission, and distribution globally. Our members include engineers, researchers, and practitioners dedicated to advancing clean energy technologies.",
    social: {
      website: "https://www.ieee-pes.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-pes",
      facebook: "https://facebook.com/IO1X",
    },
  },
  {
    id: "embs",
    name: "Engineering in Medicine and Biology Society",
    shortName: "EMBS",
    logo: "/chapters-logos/ieee-embs.jpg",
    description: "Bridging engineering and medicine to improve healthcare and quality of life. We promote innovation in biomedical engineering, medical devices, and health technology worldwide. Our multidisciplinary community drives advances in diagnostics, treatment, and patient care technologies.",
    social: {
      website: "https://www.embs.org",
      twitter: "https://twitter.com/iabo",
      linkedin: "https://linkedin.com/company/ieee-embs",
      instagram: "https://instagram.com/iabo",
    },
  },
  {
    id: "comsoc",
    name: "Communications Society",
    shortName: "ComSoc",
    logo: "/chapters-logos/ieee-comsoc.jpg",
    description: "Fostering advances in communications and networking technologies worldwide. We support professionals working on telecommunications, networks, and information systems. Our publications and conferences provide platforms for sharing breakthrough research and industry insights.",
    social: {
      website: "https://www.comsoc.org",
      twitter: "https://twitter.com/IEOmSoc",
      linkedin: "https://linkedin.com/company/ieee-comsoc",
      youtube: "https://youtube.com/user/IEOmSoc",
    },
  },
  {
    id: "cas",
    name: "Circuits and Systems Society",
    shortName: "CAS",
    logo: "/chapters-logos/ieee-cas.jpg",
    description: "Advancing the theory, analysis, design, and implementation of circuits and systems. We serve engineers and researchers developing next-generation electronic devices and systems. Our society organizes international conferences and publishes leading journals in circuits and systems.",
    social: {
      website: "https://ieee-cas.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-cas",
    },
  },
  {
    id: "sps",
    name: "Signal Processing Society",
    shortName: "SPS",
    logo: "/chapters-logos/ieee-sps.jpg",
    description: "Advancing signal processing theory, applications, and educational activities. We unite researchers and professionals working in audio, image, video, and sensor signal processing. Through conferences and publications, we accelerate innovation in signal processing technologies.",
    social: {
      website: "https://signalprocessingsociety.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-sps",
      youtube: "https://youtube.com/user/IO1X",
    },
  },
  {
    id: "aps",
    name: "Antennas and Propagation Society",
    shortName: "APS",
    logo: "/chapters-logos/ieee-aps.jpg",
    description: "Promoting the advancement of antenna and propagation science and technology. We connect professionals working on wireless systems, satellite communications, and electromagnetic applications. Our conferences and journals showcase the latest developments in antenna design and propagation.",
    social: {
      website: "https://ieeeaps.org",
      linkedin: "https://linkedin.com/company/ieee-aps",
      facebook: "https://facebook.com/IO1X",
    },
  },
  {
    id: "vts",
    name: "Vehicular Technology Society",
    shortName: "VTS",
    logo: "/chapters-logos/ieee-vts.jpg",
    description: "Advancing mobile radio and motor vehicle technology for land, air, and sea. We support engineers developing transportation systems, communications, and autonomous vehicle technologies. Our society focuses on emerging challenges in connected and autonomous vehicles.",
    social: {
      website: "https://vtsociety.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-vts",
    },
  },
  {
    id: "aess",
    name: "Aerospace and Electronic Systems Society",
    shortName: "AESS",
    logo: "/chapters-logos/ieee-aess.jpg",
    description: "Advancing aerospace and electronic systems for civilian and defense applications. We serve engineers in aviation, space, radar, navigation, and surveillance systems. Our members collaborate on innovations in airborne electronics and system integration.",
    social: {
      website: "https://ieee-aess.org",
      linkedin: "https://linkedin.com/company/ieee-aess",
      youtube: "https://youtube.com/user/IO1X",
    },
  },
  {
    id: "ies",
    name: "Industrial Electronics Society",
    shortName: "IES",
    logo: "/chapters-logos/ieee-ies.jpg",
    description: "Advancing industrial electronics, automation, and manufacturing technologies. We connect professionals in factory automation, process control, and industrial IoT applications. Our research addresses the integration of electronics in modern industrial systems.",
    social: {
      website: "https://www.ieee-ies.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-ies",
      facebook: "https://facebook.com/IO1X",
    },
  },
  {
    id: "pels",
    name: "Power Electronics Society",
    shortName: "PELS",
    logo: "/chapters-logos/ieee-pels.jpg",
    description: "Promoting power electronics technology through education and innovation. We support professionals developing efficient energy conversion systems and renewable energy solutions. Our society advances technologies for electric vehicles and smart grid applications.",
    social: {
      website: "https://www.ieee-pels.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-pels",
      instagram: "https://instagram.com/IO1X",
    },
  },
  {
    id: "photonics",
    name: "Photonics Society",
    shortName: "IPS",
    logo: "/chapters-logos/ieee-photonics.jpg",
    description: "Advancing lasers, optoelectronics, and photonics research and applications. We unite scientists and engineers working in fiber optics, optical communications, and photonic systems. Our society drives innovation in quantum optics and integrated photonics.",
    social: {
      website: "https://www.photonicssociety.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-photonics",
      youtube: "https://youtube.com/user/IO1X",
    },
  },
  {
    id: "cis",
    name: "Computational Intelligence Society",
    shortName: "CIS",
    logo: "/chapters-logos/ieee-cis.jpg",
    description: "Advancing computational intelligence including neural networks and fuzzy systems. We foster research in evolutionary computation, swarm intelligence, and machine learning. Our society connects researchers developing AI and intelligent systems applications.",
    social: {
      website: "https://cis.ieee.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-cis",
    },
  },
  {
    id: "mtt",
    name: "Microwave Theory and Technology Society",
    shortName: "MTT-S",
    logo: "/chapters-logos/ieee-mtt.jpg",
    description: "Advancing microwave theory, techniques, and applications globally. We support professionals in RF engineering, wireless communications, and microwave systems. Our conferences and publications lead the field in microwave technology developments.",
    social: {
      website: "https://mtt.org",
      linkedin: "https://linkedin.com/company/ieee-mtt",
      facebook: "https://facebook.com/IO1X",
      youtube: "https://youtube.com/user/IO1X",
    },
  },
  {
    id: "eds",
    name: "Electron Devices Society",
    shortName: "EDS",
    logo: "/chapters-logos/ieee-eds.jpg",
    description: "Advancing electron device technology and its applications. We connect researchers in semiconductor technology, device physics, and manufacturing. Our society focuses on emerging devices for computing, power, and sensing applications.",
    social: {
      website: "https://eds.ieee.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-eds",
      instagram: "https://instagram.com/IO1X",
    },
  },
  {
    id: "controls",
    name: "Control Systems Society",
    shortName: "CSS",
    logo: "/chapters-logos/ieee-controls.jpg",
    description: "Advancing control theory and practice for engineering systems. We unite researchers working on feedback control, automation, and system dynamics. Our society addresses applications across industrial, biological, and infrastructure systems.",
    social: {
      website: "https://ieeecss.org",
      twitter: "https://twitter.com/IO1X",
      linkedin: "https://linkedin.com/company/ieee-css",
      youtube: "https://youtube.com/user/IO1X",
    },
  },
]
