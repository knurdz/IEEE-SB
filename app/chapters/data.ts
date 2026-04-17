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
    youtube?: string;
    facebook?: string;
  };
}

export const societies: Society[] = [
  {
    id: "embs",
    title: "IEEE Engineering in Medicine and Biology Society",
    description: "The IEEE Engineering in Medicine and Biology Society bridges the gap between engineering and healthcare innovation. It focuses on biomedical signal processing, medical imaging, and healthcare device development. Students participate in interdisciplinary projects and research-oriented activities that address real medical challenges. The chapter inspires innovation aimed at improving diagnostics, treatment methods, and overall patient care.",
    logo: "/chapter-logos/CL1.webp",
    color: "#7a2c83",
    links: {
      facebook: "https://www.facebook.com/embsuom/",
      linkedin: "https://lk.linkedin.com/company/ieee-embs-at-uom",
      instagram: "https://www.instagram.com/ieeeembs.uom/",
      youtube: "https://www.youtube.com/@ieeeembsuniversityofmoratu9322"
    }
  },
  {
    id: "cs",
    title: "IEEE Computer Society",
    description: "The IEEE Computer Society at the University of Moratuwa serves as a space for innovation in software engineering, algorithms, and system design which is a leading global community for computing professionals. The chapter fosters a strong technical foundation through coding competitions, development projects, and knowledge-sharing sessions. By aligning students with industry standards and emerging technologies, it prepares them to tackle complex computing challenges. Members gain both practical expertise and a deep understanding of modern software ecosystems.",
    logo: "/chapter-logos/CL2.webp",
    color: "#9ab81e",
    links: {
      facebook: "https://www.facebook.com/csieeeuom",
      linkedin: "https://lk.linkedin.com/company/computer-society-ieee-university-of-moratuwa-student-branch",
      instagram: "https://www.instagram.com/ieeecsuom/"
    }
  },
  {
    id: "ras",
    title: "IEEE Robotics and Automation Society",
    description: "Focused on intelligent machines and automation, the IEEE Robotics and Automation Society provides hands-on exposure to robotics design, embedded systems, and autonomous technologies. Students actively engage in building prototypes, participating in competitions, and developing innovative robotic solutions. The chapter emphasizes experiential learning, encouraging members to apply engineering concepts to real-world challenges. It nurtures creativity and technical excellence in the field of robotics.",
    logo: "/chapter-logos/CL3.webp",
    color: "#97022d",
    links: {
      facebook: "https://www.facebook.com/share/1AimXnk5FG/",
      linkedin: "https://www.linkedin.com/company/ieeeras-uom/"
    }
  },
  {
    id: "wie",
    title: "IEEE Women in Engineering",
    description: "IEEE Women in Engineering is dedicated to promoting diversity, inclusion, and empowerment within the engineering community. It provides mentorship, leadership development, and networking opportunities for aspiring professionals. Through various initiatives, the chapter supports personal and technical growth. It creates a strong and supportive platform for women to thrive in STEM fields.",
    logo: "/chapter-logos/CL4.webp",
    color: "#7a2c83",
    links: {
      facebook: "https://www.facebook.com/WIEUOM",
      linkedin: "https://www.linkedin.com/company/ieeewieuom/",
      instagram: "https://www.instagram.com/wie_uom?igsh=dHJsMGszcnJ0eTM2",
      youtube: "https://www.youtube.com/@ieeewieaffinitygroup-unive9003"
    }
  },
  {
    id: "ias",
    title: "IEEE Industry Applications Society",
    description: "The IEEE Industry Applications Society focuses on applying engineering principles in real-world industrial environments. It explores industrial automation, electrical systems, and practical engineering solutions. Through industry visits, workshops, and case studies, students gain hands-on experience. The chapter bridges the gap between academic knowledge and industrial practices.",
    logo: "/chapter-logos/CL5.webp",
    color: "#274f10",
    links: {
      facebook: "https://www.facebook.com/share/14Z1db8p9oj/?mibextid=wwXIfr",
      linkedin: "https://www.linkedin.com/company/ieeeiasuom/",
      youtube: "https://youtube.com/@ieeeiasuom?si=K3DHp06SYDIQmWpK"
    }
  },
  {
    id: "tems",
    title: "IEEE Technology and Engineering Management Society",
    description: "The IEEE Technology and Engineering Management Society develops leadership and management skills for future engineers. It focuses on entrepreneurship, innovation management, and strategic decision-making. Through seminars and collaborative activities, students learn to manage technology-driven projects. The chapter prepares members to lead and innovate in competitive industries.",
    logo: "/chapter-logos/CL6.webp",
    color: "#00b5e2",
    links: {
      facebook: "https://www.facebook.com/share/1BEDpJ5Ymt/",
      linkedin: "https://www.linkedin.com/company/ieee-tems-uom/",
      youtube: "https://youtube.com/@ieeetemsuom?si=pL82Q5797YKvWnrm"
    }
  },
  {
    id: "cis",
    title: "IEEE Computational Intelligence Society",
    description: "The IEEE Computational Intelligence Society focuses on the development of intelligent and adaptive systems inspired by human cognition. It promotes learning in areas such as artificial intelligence, machine learning, neural networks, and data-driven modeling. Through hackathons, research initiatives, and innovation challenges, students are encouraged to explore real-world problem-solving. The chapter cultivates analytical thinking and empowers members to build cutting-edge AI solutions.",
    logo: "/chapter-logos/CL7.webp",
    color: "#00b5e2",
    links: {
      facebook: "https://www.facebook.com/share/1ZxomTuRub/",
      linkedin: "https://www.linkedin.com/company/ieee-cis-uom/",
      instagram: "https://www.instagram.com/ieeecisuom?igsh=YXJ5b3RtNG9nbmZp&utm_source=qr"
    }
  },
  {
    id: "grss",
    title: "IEEE Geoscience and Remote Sensing Society",
    description: "The IEEE Geoscience and Remote Sensing Society focuses on Earth observation technologies and spatial data analysis. It explores satellite imaging, environmental monitoring, and geospatial intelligence. Students engage in data-driven projects and research activities to understand global environmental systems. The chapter promotes innovation in analyzing and interpreting large-scale geospatial data.",
    logo: "/chapter-logos/CL8.webp",
    color: "#004883",
    links: {
      facebook: "https://www.facebook.com/share/1CbgBKFqBt/",
      linkedin: "https://www.linkedin.com/company/ieee-grss-student-branch-university-of-moratuwa/",
      instagram: "https://www.instagram.com/ieee_grss_sbc_moratuwa?igsh=Y2JqM2Z2cjdrMXhj"
    }
  },
  {
    id: "comsoc",
    title: "IEEE Communications Society",
    description: "The IEEE Communications Society is dedicated to advancing next-generation communication technologies and global connectivity. It explores wireless systems, mobile networks, data transmission, and internet infrastructure. Through technical workshops, expert talks, and practical demonstrations, students gain insight into how modern communication systems operate. The chapter bridges theoretical knowledge with real-world applications in a rapidly evolving digital landscape.",
    logo: "/chapter-logos/CL9.webp",
    color: "#005670",
    links: {
      facebook: "https://www.facebook.com/share/1U9mnbqTXM/",
      linkedin: "https://www.linkedin.com/company/comsoc-sb-uom/"
    }
  },
  {
    id: "mtts",
    title: "IEEE Microwave Theory and Techniques Society",
    description: "The IEEE Microwave Theory and Techniques Society specializes in high-frequency engineering and advanced communication technologies. It introduces students to RF systems, microwave circuits, antenna design, and signal propagation. Through simulations, laboratory work, and technical sessions, members gain in-depth practical knowledge. The chapter strengthens expertise in communication hardware and prepares students for specialized engineering domains.",
    logo: "/chapter-logos/CL10.webp",
    color: "#00629b",
    links: {
      facebook: "https://www.facebook.com/share/1ApAx3Qep7/",
      linkedin: "https://www.linkedin.com/company/ieee-mtt-s-student-branch-chapter-university-of-moratuwa/"
    }
  },
  {
    id: "sps",
    title: "IEEE Signal Processing Society",
    description: "The IEEE Signal Processing Society explores the analysis, interpretation, and transformation of signals in various domains. It covers applications such as audio processing, image analysis, and data modeling techniques. Through algorithm development, simulations, and competitions, students build strong analytical and technical skills. The chapter enables members to work on real-world problems involving complex data and signal systems.",
    logo: "/chapter-logos/CL11.webp",
    color: "#78be20",
    links: {
      facebook: "https://web.facebook.com/ieeespsmoratuwa",
      linkedin: "https://www.linkedin.com/company/ieeesps-uom"
    }
  },
  {
    id: "npss",
    title: "IEEE Nuclear and Plasma Sciences Society",
    description: "The IEEE Nuclear and Plasma Sciences Society introduces students to advanced scientific fields including nuclear systems and plasma technologies. It explores applications in energy systems, radiation technology, and high-energy physics. Through seminars and technical discussions, members gain exposure to specialized and emerging research areas. The chapter builds a strong foundation in scientific principles and advanced engineering concepts.",
    logo: "/chapter-logos/CL12.webp",
    color: "#97022d",
    links: {
      facebook: "https://web.facebook.com/NPSSUOM?rdid=DzGQGBlDeTbQxw0s&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18EFDJ1nkf%2F%3F_rdc%3D1%26_rdr#",
      linkedin: "https://www.linkedin.com/company/ieee-npss-student-branch-chapter-of-university-of-moratuwa/posts/?feedView=all"
    }
  },
  {
    id: "pes",
    title: "IEEE Power and Energy Society",
    description: "The IEEE Power and Energy Society focuses on modern power systems and sustainable energy solutions. It covers smart grids, renewable energy integration, and efficient power distribution techniques. Through workshops, projects, and industry engagement, students gain practical exposure to real-world energy challenges. The chapter prepares members to contribute to the future of global energy systems.",
    logo: "/chapter-logos/CL13.webp",
    color: "#396831",
    links: {
      facebook: "https://m.facebook.com/story.php?story_fbid=pfbid026Ftz58FnNv9dDh75ce8qVRmBU676JGrm9DjjSqGT36WZ3WY5oDhDNSrc2xozZRmml&id=100064451601409&mibextid=Nif5oz",
      linkedin: "https://www.linkedin.com/company/ieee-pes-student-branch-chapter-of-university-of-moratuwa/"
    }
  },
  {
    id: "cas",
    title: "IEEE Circuits and Systems Society",
    description: "IEEE Circuits and Systems Society of the University of Moratuwa is dedicated to advancing knowledge in circuit design, system architecture, and intelligent electronic technologies. The chapter provides a platform for students to explore analog and digital circuits, embedded systems, VLSI technologies, and modern hardware innovations. Through technical programs, design-oriented workshops, and research initiatives, it develops the expertise required to engineer efficient, reliable, and future-ready electronic systems.",
    logo: "/chapter-logos/CL14.webp",
    color: "#00965e",
    links: {
      linkedin: "https://www.linkedin.com/company/ieee-cas-uom/",
      instagram: "https://www.instagram.com/ieeecasuom?igsh=bmFqeG95YWFzdnJ2"
    }
  },
  {
    id: "procom",
    title: "IEEE Professional Communication Society",
    description: "The IEEE Professional Communication Society enhances essential communication skills required for engineering and professional success. It focuses on technical writing, presentations, and effective interpersonal communication. Through workshops and training sessions, students learn to clearly articulate complex ideas. The chapter prepares members to excel in both academic and corporate environments.",
    logo: "/chapter-logos/CL15.webp",
    color: "#00579d",
    links: {
      facebook: "https://www.facebook.com/share/18FRSQAk7a/",
      linkedin: "https://www.linkedin.com/company/ieeeprocommuom/"
    }
  },
  {
    id: "ies",
    title: "IEEE Industrial Electronics Society",
    description: "The IEEE Industrial Electronics Society explores advanced electronic systems used in modern industries. It emphasizes automation, control systems, and smart industrial technologies. Students engage in hands-on learning and technical experimentation to understand system-level operations. The chapter strengthens practical skills in industrial electronics and automation.",
    logo: "/chapter-logos/CL16.webp",
    color: "#f59e0b",
    links: {
      facebook: "https://www.facebook.com/ieeeiesuom"
    }
  },
  {
    id: "pels",
    title: "IEEE Power Electronics Society",
    description: "The IEEE Power Electronics Society focuses on efficient energy conversion and power management technologies. It covers converters, motor drives, and renewable energy interfaces. Through simulations, circuit design, and applied projects, students gain practical expertise. The chapter equips members with the skills needed for modern power engineering applications.",
    logo: "/chapter-logos/CL17.webp",
    color: "#ee2229",
    links: {
      facebook: "https://www.facebook.com/ieeepelsuom"
    }
  }
];
