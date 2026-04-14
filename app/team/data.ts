export interface EventItem {
  id: number;
  slug: string;
  name: string;
  year: string;
  category: string;
  categoryColor: string;
  description: string;
  fullDescription?: string;
  images: string[];
  gallery: string[];
  groupedGallery?: { name: string; images: string[] }[];
  mainImage?: string;
  cardImage?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  whatsappUrl?: string;
}

export const EVENTS: EventItem[] = [
  {
    id: 1,
    slug: "moraforesight",
    name: " MoraForesight",
    year: "2025",
    category: "INNOVATION",
    categoryColor: "#7C3AED",
    description:
      "MoraForesight stands as one of the most pioneering initiatives organized by the IEEE Student Branch of the University of Moratuwa, proudly carrying a nation-wide impact with an award-winning legacy, along with a transformative influence that has reshaped the journeys and stories of an entire community.",
    fullDescription:
      "MoraForesight stands as one of the most pioneering initiatives organized by the IEEE Student Branch of the University of Moratuwa, proudly carrying a nation-wide impact with an award-winning legacy, along with a transformative influence that has reshaped the journeys and stories of an entire community.\n\nMoraForesight 3.0, the third and latest edition of the flagship initiative by the IEEE Student Branch of the University of Moratuwa, was designed for Sri Lankan students aged 16–20 who had completed their O/Ls and were preparing for their A/Ls (2025–2027). From a competitive pool of over 2,000 applicants, 80 outstanding students were selected to participate in a fully funded 3-day Residential Boot Camp, offering an intensive and immersive experience in technology, innovation, and leadership development.\n\nThe program not only nurtured technical skills and innovative mindsets but also fostered confidence, teamwork, and problem-solving abilities among Sri Lanka’s future leaders. MoraForesight continues to inspire and empower the next generation of innovators, reinforcing its legacy as a transformative force in the country’s educational and technological landscape.",

    images: [
      "/event/foresight/536270154_1171385821687726_248709497198309389_n.jpg",
    ],
    gallery: [
      "/event/foresight/536282916_1171311998361775_6505005724168856005_n.jpg",
      "/event/foresight/536268071_1171326115027030_8727465925243631384_n.jpg",
      "/event/foresight/536272921_1171397841686524_4088151614520576808_n.jpg",
      "/event/foresight/536284597_1171326218360353_4735229930471786078_n.jpg",
      "/event/foresight/536278330_1171327878360187_6910299510088131991_n.jpg",
      "/event/foresight/536607075_1171305445029097_7483174576492240572_n.jpg",
      "/event/foresight/536276099_1171326835026958_2720793342722060095_n.jpg",
      "/event/foresight/536272234_1171318715027770_3567652490879300473_n.jpg",
      "/event/foresight/536278308_1171386641687644_4295688111032567387_n.jpg",
      "/event/foresight/536783660_1171319795027662_111002905803843935_n.jpg",
      "/event/foresight/536624789_1171306185029023_788547278895044084_n.jpg",
      "/event/foresight/534416283_1167449328748042_4872983608574706446_n.jpg",
      "/event/foresight/536269566_1171312121695096_4842149710312679706_n.jpg",
      "/event/foresight/536284570_1171381905021451_7717257192959904845_n.jpg",
      "/event/foresight/536272844_1171307171695591_6977654641356151119_n.jpg",
      "/event/foresight/534383426_1167456778747297_3400259690500497815_n.jpg",
      "/event/foresight/536282847_1171314725028169_857266055469702116_n.jpg",
      "/event/foresight/536281252_1171383511687957_300310855361659967_n.jpg",
      "/event/foresight/536278718_1171319978360977_8365338932989956631_n.jpg",
      "/event/foresight/536267482_1171390525020589_2601251268077222378_n.jpg",
      "/event/foresight/536626963_1171382011688107_5134399220404081771_n.jpg",
      "/event/foresight/537560166_1171396411686667_5447120719815631624_n.jpg",
      "/event/foresight/536272253_1171314985028143_8267053949766711928_n.jpg",
      "/event/foresight/514269731_1167453365414305_6387581330595867284_n.jpg",
      "/event/foresight/536269475_1171393368353638_8931587739257587697_n.jpg",
      "/event/foresight/536275715_1171308508362124_8221457736681633784_n.jpg",
      "/event/foresight/536272296_1171381788354796_3033472838368975643_n.jpg",
      "/event/foresight/536284772_1171317498361225_4640356170112467475_n.jpg",
      "/event/foresight/536270154_1171385821687726_248709497198309389_n.jpg",
      "/event/foresight/533236976_1167449098748065_1874383996639538515_n.jpg",
      "/event/foresight/536272316_1171322338360741_8249903845057917835_n.jpg",
      "/event/foresight/536272083_1171317235027918_7921628870215197337_n.jpg",
      "/event/foresight/536277549_1171304588362516_1157512904310946451_n.jpg",
      "/event/foresight/536269974_1171304555029186_1232195879509163027_n.jpg",
      "/event/foresight/533060666_1167448998748075_7212911172760655903_n.jpg",
      "/event/foresight/536269592_1171389341687374_4781447601355860113_n.jpg",
      "/event/foresight/536273478_1171391118353863_296049353392202877_n.jpg",
    ],
    mainImage:
      "/event/foresight/536270154_1171385821687726_248709497198309389_n.jpg",
    cardImage:
      "/event/foresight/514269731_1167453365414305_6387581330595867284_n.jpg",
    facebookUrl: "https://facebook.com/moraforesight",
    websiteUrl: "https://moraforesight.lk/",
    linkedinUrl: "https://www.linkedin.com/company/moraforesight",
    instagramUrl: "https://www.instagram.com/moraforesight._",
    whatsappUrl: "https://whatsapp.com/channel/0029Vb82hWMEwEjowRgP0X0K",
  },
  {
    id: 2,
    slug: "rise-up-mora",
    name: "Rise Up Mora",
    year: "2025",
    category: "CAREER",
    categoryColor: "#84CC16",
    description:
      "Rise Up Mora is a premier career readiness initiative organized by the IEEE Student Branch of the University of Moratuwa, designed to equip undergraduates with the skills, knowledge, and confidence required to excel in internships and the corporate landscape.",
    fullDescription:
      "Rise Up Mora is a premier career readiness initiative organized by the IEEE Student Branch of the University of Moratuwa, designed to equip undergraduates with the skills, knowledge, and confidence required to excel in internships and the corporate landscape.\n\nRise Up Mora 2025 consisted of a series of workshops conducted both physically and virtually, covering topics such as CV writing, professional networking, workplace readiness, LinkedIn profile optimization, and interview preparation. The program culminated in an Internship and Mock Interview Fair, where participants applied their skills in real-time interviews and gained valuable feedback from industry professionals.\n\nRise Up Mora 2025 not only equipped students with practical knowledge and career-oriented skills but also strengthened the connection between academia and industry, earning recognition as the Best Industry Collaborative Project at the IEEE Sri Lanka Section Awards 2025 and establishing itself as a key platform for shaping Sri Lanka’s next generation of professionals.",

    images: ["/event/rum/538314147_1173265281499780_317201833541306729_n.jpg"],
    gallery: [
      "/event/rum/538314147_1173265281499780_317201833541306729_n.jpg",
      "/event/rum/537187906_1173265398166435_2200412588011600141_n.jpg",
      "/event/rum/537623955_1173267024832939_7732740451839265877_n.jpg",
      "/event/rum/538160734_1173274344832207_747260801027470595_n.jpg",
      "/event/rum/538275396_1173265924833049_6554632063067832610_n.jpg",
      "/event/rum/537709128_1173267084832933_571041891122928467_n.jpg",
      "/event/rum/538361855_1173270878165887_4000853490523879011_n.jpg",
      "/event/rum/539059751_1173279868164988_1922011451365664093_n.jpg",
      "/event/rum/537897733_1173268768166098_5843179048050724332_n.jpg",
      "/event/rum/538310523_1173270938165881_4096691680559228477_n.jpg",
      "/event/rum/537748319_1173274288165546_2091514994446013539_n.jpg",
      "/event/rum/537796602_1173266291499679_7737700061542828851_n.jpg",
      "/event/rum/537726319_1173265358166439_2392544797752253739_n.jpg",
      "/event/rum/538200853_1173274244832217_5613618503676413019_n.jpg",
      "/event/rum/538474584_1173274621498846_6397761173902952338_n.jpg",
      "/event/rum/539206651_1173265611499747_4497600437673307037_n.jpg",
      "/event/rum/537700902_1173265464833095_1273390993585438876_n.jpg",
      "/event/rum/538360935_1173269878165987_7039391497052785480_n.jpg",
    ],
    mainImage:
      "/event/rum/538314147_1173265281499780_317201833541306729_n.jpg",
    cardImage:
      "/event/rum/537187906_1173265398166435_2200412588011600141_n.jpg",
    websiteUrl: "https://riseupmora.lk/",
    linkedinUrl: "https://www.linkedin.com/company/rise-up-mora",
  },
  {
    id: 3,
    slug: "mercon",
    name: "MERCon",
    year: "2025",
    category: "CONFERENCE",
    categoryColor: "#6366F1",
    description:
      "MERCon, the Moratuwa Engineering Research Conference, was organized by the Engineering Research Unit (ERU) in collaboration with the IEEE Student Branch of the University of Moratuwa.",
    fullDescription:
      "MERCon, the Moratuwa Engineering Research Conference, was organized by the Engineering Research Unit (ERU) in collaboration with the IEEE Student Branch of the University of Moratuwa. The conference brought together researchers, academics, students, and industry professionals from across Sri Lanka to explore emerging technologies, share knowledge, and foster innovation in engineering.\n\nThe three-day program featured keynote sessions, technical research presentations, and hands-on workshops on topics including renewable energy integration, 5G connectivity, TinyML, signal processing, integrated circuit design, and advancements in artificial intelligence. MerCon. The conference provided participants with opportunities to discuss research challenges, exchange ideas, and gain insights into practical applications of modern engineering innovations.\n\nMERCon fosters meaningful connections between academia and industry, encourages the exchange of innovative ideas, and highlights the latest advancements in engineering research across Sri Lanka.",

    images: [
      "/event/Mercon/540598471_1176409737852001_6607515367642355102_n (1).jpg",
    ],
    gallery: [
      "/event/Mercon/538633922_1176462754513366_2832240042918389319_n.jpg",
      "/event/Mercon/539417173_1176415154518126_599953372835219097_n.jpg",
      "/event/Mercon/539763239_1176409914518650_5365479059605289844_n (1).jpg",
      "/event/Mercon/539056249_1176416494517992_3845654576259268519_n.jpg",
      "/event/Mercon/539487721_1176460544513587_2610555243626972381_n.jpg",
      "/event/Mercon/539807327_1176429937849981_7185413152893863904_n.jpg",
      "/event/Mercon/539199627_1176466224513019_4117824805928497508_n.jpg",
      "/event/Mercon/539555841_1176412251185083_688319115717562647_n.jpg",
      "/event/Mercon/539892961_1176430707849904_8759912719219064654_n.jpg",
      "/event/Mercon/539219321_1176460577846917_7604022537461407853_n.jpg",
      "/event/Mercon/539557196_1176463774513264_7583611349987959102_n.jpg",
      "/event/Mercon/539913669_1176465284513113_5329785176251615655_n.jpg",
      "/event/Mercon/539220958_1176461441180164_7549426965631285099_n.jpg",
      "/event/Mercon/539562001_1176461137846861_7582223971109615869_n.jpg",
      "/event/Mercon/539931588_1176416381184670_7423170771182026366_n.jpg",
      "/event/Mercon/539259094_1176429881183320_1579339402675419185_n.jpg",
      "/event/Mercon/539581750_1176412247851750_5062379401178715552_n.jpg",
      "/event/Mercon/540598471_1176409737852001_6607515367642355102_n (1).jpg",
      "/event/Mercon/539357569_1176462977846677_1418177879574439116_n.jpg",
      "/event/Mercon/539594870_1176414557851519_5124717790491952013_n.jpg",
      "/event/Mercon/540901442_1176430087849966_4956497940541633290_n.jpg",
      "/event/Mercon/539405135_1176429907849984_7081300230198000171_n.jpg",
      "/event/Mercon/539598566_1176416591184649_746345012621979578_n.jpg",
      "/event/Mercon/540948701_1176420441184264_1711436535524260998_n.jpg",
      "/event/Mercon/539414806_1176439994515642_36171394262379708_n.jpg",
      "/event/Mercon/539632214_1176417277851247_2303665440838680537_n.jpg",
    ],
    mainImage:
      "/event/Mercon/540598471_1176409737852001_6607515367642355102_n (1).jpg",
    cardImage:
      "/event/Mercon/539417173_1176415154518126_599953372835219097_n.jpg",
    facebookUrl: "https://facebook.com/erumercon",
    websiteUrl: "https://mercon.uom.lk/",
    linkedinUrl:
      "https://www.linkedin.com/company/mercon-moratuwa-engineering-research-conference",
  },
  {
    id: 4,
    slug: "innovate-with-ballerina",
    name: "Innovate with Ballerina",
    year: "2025",
    category: "COMPETITION",
    categoryColor: "#F472B6",
    description:
      "Innovate with Ballerina stands as a landmark initiative organized by the IEEE Student Branch of the University of Moratuwa in collaboration with WSO2, bringing together university students from across Sri Lanka to explore creative applications of the Ballerina programming language.",
    fullDescription:
      "Innovate with Ballerina stands as a landmark initiative organized by the IEEE Student Branch of the University of Moratuwa in collaboration with WSO2, bringing together university students from across Sri Lanka to explore creative applications of the Ballerina programming language. The event fosters a competitive and collaborative environment, empowering participants to enhance their technical expertise, problem-solving skills, and innovative thinking.\n\nThe hackathon commenced with an introductory session, followed by technical workshops on Data Handling and AI Capabilities in Ballerina, preparing participants to develop solutions for real-world challenges. Teams competed to design and implement their projects, culminating in a Grand Finale and Awards Ceremony at WSO2, where top teams were recognized for their innovative achievements and practical applications of Ballerina.\n\nThe event leaves a lasting impact on students, inspiring the next generation of software developers and innovators, and reinforcing its reputation as a transformative platform in Sri Lanka’s technological and educational landscape.",

    images: [
      "/event/Ballerina/557639154_1211833787642929_4546847834616922527_n.jpg",
    ],
    gallery: [
      "/event/Ballerina/558882943_1211858660973775_3321328697140575032_n.jpg",
      "/event/Ballerina/557713849_1211844457641862_4457227941353633119_n.jpg",
      "/event/Ballerina/558861988_1211833470976294_3901016158088029719_n.jpg",
      "/event/Ballerina/560669207_1211858114307163_1347907867128717438_n.jpg",
      "/event/Ballerina/557728961_1211840004308974_3372304697534469042_n.jpg",
      "/event/Ballerina/560703678_1211851040974537_2286723363861306533_n.jpg",
      "/event/Ballerina/557639154_1211833787642929_4546847834616922527_n.jpg",
      "/event/Ballerina/557724270_1211833620976279_4574214219297874901_n.jpg",
      "/event/Ballerina/557933461_1211837907642517_7787394980372421421_n.jpg",
      "/event/Ballerina/557634364_1211839957642312_1907764161105685583_n.jpg",
      "/event/Ballerina/559372403_1211834097642898_4894285484712871037_n.jpg",
      "/event/Ballerina/559017171_1211835534309421_5381435252352116755_n.jpg",
      "/event/Ballerina/557822357_1211849037641404_7907102675257494088_n.jpg",
    ],
    mainImage:
      "/event/Ballerina/557639154_1211833787642929_4546847834616922527_n.jpg",
    cardImage:
      "/event/Ballerina/557713849_1211844457641862_4457227941353633119_n.jpg",
    websiteUrl: "https://innovatewithballerina.com/",
  },
  {
    id: 5,
    slug: "openweek",
    name: "OpenWeek",
    year: "2026",
    category: "COMMUNITY",
    categoryColor: "#10B981",
    description:
      "IEEE OpenWeek is organized by the IEEE Student Branch of the University of Moratuwa, bringing together students, professionals, and industry partners for four days of interactive sessions, activities, and networking opportunities.The event welcomed 420 new members to the IEEE community, expanding its presence on campus.",
    fullDescription:
      "IEEE OpenWeek is organized by the IEEE Student Branch of the University of Moratuwa, bringing together students, professionals, and industry partners for four days of interactive sessions, activities, and networking opportunities.The event welcomed 420 new members to the IEEE community, expanding its presence on campus.\n\nThe IEEE OpenWeek 2025 featured a diverse range of activities: Day 1 focused on IEEE awareness with interactive games and a physical hackathon to encourage teamwork; Day 2 highlighted IEEE chapters, allowing undergraduates to explore technical fields and engage with specialized chapters; and Day 3 celebrated new members through the induction ceremony, a guest speaker session by Mr. Peshan Sampath, and the launch of the official newsletter and website, concluding with a vibrant DJ Night.\n\nIEEE Open Week successfully enhances engagement, expands outreach, and delivers a seamless experience for all participants. The event fostered collaboration and encourages innovation strengthening connections between students, professionals, and industry partners, leaving a lasting impact on the IEEE community at the University of Moratuwa",

    images: [
      "/event/OpenWeek/491974489_1072769378216038_6614258640913092672_n.jpg",
    ],
    gallery: [
      "/event/OpenWeek/490775784_1070628858430090_8669397192788408804_n.jpg",
      "/event/OpenWeek/490548038_1070622688430707_7495209506968855661_n.jpg",
      "/event/OpenWeek/491738205_1072774714882171_3527162206185045752_n.jpg",
      "/event/OpenWeek/491403887_1072266908266285_6922001982055160357_n.jpg",
      "/event/OpenWeek/491933533_1072775714882071_1377160089076719646_n.jpg",
      "/event/OpenWeek/491168232_1072271611599148_8691819334989874517_n.jpg",
      "/event/OpenWeek/491822725_1072268451599464_2237674188760635955_n.jpg",
      "/event/OpenWeek/490898565_1070629251763384_8915283978583510937_n.jpg",
      "/event/OpenWeek/491932368_1070626385097004_3475558488201519093_n.jpg",
      "/event/OpenWeek/491858913_1070623665097276_878205300563602178_n.jpg",
      "/event/OpenWeek/491937255_1070624081763901_2906894387404811004_n.jpg",
      "/event/OpenWeek/491718386_1072767868216189_7042294096737303903_n.jpg",
      "/event/OpenWeek/492032565_1072767648216211_467391325711210030_n.jpg",
      "/event/OpenWeek/491644999_1072771771549132_2810430464843841110_n.jpg",
      "/event/OpenWeek/490792586_1070625428430433_5470904285786262523_n.jpg",
      "/event/OpenWeek/490977419_1070620165097626_4119831989431523477_n.jpg",
      "/event/OpenWeek/491413038_1070628801763429_8747151772452971361_n.jpg",
      "/event/OpenWeek/490966013_1072268101599499_10819310994757897_n.jpg",
      "/event/OpenWeek/491974489_1072769378216038_6614258640913092672_n.jpg",
    ],
    mainImage:
      "/event/OpenWeek/491974489_1072769378216038_6614258640913092672_n.jpg",
    cardImage:
      "/event/OpenWeek/490775784_1070628858430090_8669397192788408804_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.1046768850816091&type=3",
  },
  {
    id: 6,
    slug: "moraxtreme",
    name: "MoraXtreme",
    year: "2025",
    category: "HACKATHON",
    categoryColor: "#F59E0B",
    description:
      "MoraXtreme stands as one of the most prominent competitive programming initiatives organized by the IEEE Student Branch of the University of Moratuwa, proudly contributing to Sri Lanka’s presence in global programming competitions and fostering a culture of problem-solving and innovation among university students.",
    fullDescription:
      "MoraXtreme stands as one of the most prominent competitive programming initiatives organized by the IEEE Student Branch of the University of Moratuwa, proudly contributing to Sri Lanka’s presence in global programming competitions and fostering a culture of problem-solving and innovation among university students.\n\nMoraXtreme 10.0, the tenth edition of this flagship initiative, saw participation from 1,152 students forming 467 teams from universities across Sri Lanka. The event featured a rigorous two-round format, including an online elimination round. Participants were engaged in challenging algorithmic and programming tasks, showcasing analytical thinking, coding skills, and teamwork.\n\nMoraXtreme 10.0 not only challenged participants to push the boundaries of their coding and problem-solving skills but also fostered a collaborative and competitive spirit, establishing itself as a landmark event in Sri Lanka’s journey toward excellence in competitive programming.",

    images: [
      "/event/MoraXtreme/617541107_1293606722798968_6063331189995054013_n.jpg",
    ],
    gallery: [
      "/event/MoraXtreme/615854920_1293603689465938_254720086095671295_n.jpg",
      "/event/MoraXtreme/615854840_1293602799466027_4213933293901733169_n.jpg",
      "/event/MoraXtreme/616124689_1293603019466005_9113727341021008682_n.jpg",
      "/event/MoraXtreme/617625892_1293603946132579_48974582634619715_n.jpg",
      "/event/MoraXtreme/616070860_1293598876133086_4239081627585565354_n.jpg",
      "/event/MoraXtreme/616501853_1293598966133077_2097972961760015277_n.jpg",
      "/event/MoraXtreme/617541107_1293606722798968_6063331189995054013_n.jpg",
      "/event/MoraXtreme/618330677_1293602622799378_7537267846512385473_n.jpg",
      "/event/MoraXtreme/616111877_1293600412799599_1585596267977142708_n.jpg",
    ],
    mainImage:
      "/event/MoraXtreme/617541107_1293606722798968_6063331189995054013_n.jpg",
    cardImage:
      "/event/MoraXtreme/615854840_1293602799466027_4213933293901733169_n.jpg",
    websiteUrl: "https://moraxtreme.lk/",
  },
  {
    id: 7,
    slug: "agm-award-ceremony",
    name: "AGM & Award Ceremony",
    year: "2025",
    category: "ANNUAL",
    categoryColor: "#00A3FF",
    description:
      "The Annual General Meeting (AGM) was held on the 15th of October 2025 at Rubert Peris Hall at University of Moratuwa. The event marked the official conclusion of the outgoing term and brought together members of the organization to reflect on a year of growth, commitment, and impactful initiatives.",
    fullDescription:
      "The Annual General Meeting (AGM) was held on the 15th of October 2025 at Rubert Peris Hall at University of Moratuwa. The event marked the official conclusion of the outgoing term and brought together members of the organization to reflect on a year of growth, commitment, and impactful initiatives.\n\nThe proceedings captured both reflection and transition, beginning with a structured overview of the previous term’s journey and continuing with the formal handover of responsibilities. The outgoing leadership was acknowledged for their dedication and service, celebrating their contributions toward strengthening the organization’s presence and activities throughout the year.\n\nThe AGM culminated in the election of the new Executive Committee, symbolizing a seamless transition into the upcoming term. The event stood as a testament to continuity, leadership, and shared vision, reinforcing the organization’s commitment to sustained excellence and future advancement.",

    images: [
      "/event/AGM & Award Ceremony/566320867_1222966146529693_6619199067605645621_n.jpg",
    ],
    gallery: [
      "/event/AGM & Award Ceremony/559853374_1222951646531143_2688869702501887411_n.jpg",
      "/event/AGM & Award Ceremony/561721627_1222959766530331_3533758272355910556_n.jpg",
      "/event/AGM & Award Ceremony/564601400_1222969443196030_3505470635764817182_n.jpg",
      "/event/AGM & Award Ceremony/565222029_1222956456530662_5610562533966293184_n.jpg",
      "/event/AGM & Award Ceremony/565359237_1222950906531217_5127405040144182170_n.jpg",
      "/event/AGM & Award Ceremony/565655973_1222954613197513_5327677940043709799_n.jpg",
      "/event/AGM & Award Ceremony/565668868_1222950339864607_6470411962233152375_n.jpg",
      "/event/AGM & Award Ceremony/565955903_1222970306529277_8813079187353550326_n.jpg",
      "/event/AGM & Award Ceremony/566205080_1222949513198023_9078499194761170463_n.jpg",
      "/event/AGM & Award Ceremony/566205729_1222953619864279_4407782954730297303_n.jpg",
      "/event/AGM & Award Ceremony/566217811_1222948076531500_5322138159370755182_n.jpg",
      "/event/AGM & Award Ceremony/566320867_1222966146529693_6619199067605645621_n.jpg",
      "/event/AGM & Award Ceremony/566323832_1222952533197721_3864781943042191800_n.jpg",
      "/event/AGM & Award Ceremony/566336307_1222948656531442_3602940183865285057_n.jpg",
      "/event/AGM & Award Ceremony/568337761_1222950079864633_789767403543572049_n.jpg",
      "/event/AGM & Award Ceremony/568388084_1222975036528804_6856625049684071124_n.jpg",
      "/event/AGM & Award Ceremony/568624078_1222956119864029_2371437841911901167_n.jpg",
      "/event/AGM & Award Ceremony/568708526_1222965406529767_4480867106999546070_n.jpg",
      "/event/AGM & Award Ceremony/568833701_1222975843195390_2988351440961654452_n.jpg",
    ],
    mainImage:
      "/event/AGM & Award Ceremony/566320867_1222966146529693_6619199067605645621_n.jpg",
    cardImage:
      "/event/AGM & Award Ceremony/561721627_1222959766530331_3533758272355910556_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.953390813487229&type=3",
  },
  {
    id: 8,
    slug: "ieeextreme",
    name: "IEEEXtreme",
    year: "2025",
    category: "Hackathon",
    categoryColor: "#FF6B35",
    description:
      "IEEEXtreme 19.0 is a 24-hour global programming competition organized by IEEE, where university students from around the world compete in teams to solve complex algorithmic challenges under strict time constraints.",
    fullDescription:
      "IEEEXtreme 19.0 is a 24-hour global programming competition organized by IEEE, where university students from around the world compete in teams to solve complex algorithmic challenges under strict time constraints. The 19th edition continued its tradition of bringing together thousands of participants globally, providing a platform that tests endurance, teamwork, and advanced problem-solving skills.\n\nAs a worldwide initiative, IEEEXtreme 19.0 promotes collaboration and computational thinking across borders, enabling students to engage in high-pressure competitive programming while connecting with a global community of problem solvers.",

    images: [
      "/event/IEEEXtreme/594962004_1263594422466865_8735085998910189412_n.jpg",
    ],
    gallery: [
      "/event/IEEEXtreme/594961516_1263594819133492_8317781972009123551_n.jpg",
      "/event/IEEEXtreme/594965118_1263622389130735_7463960053348444917_n.jpg",
      "/event/IEEEXtreme/596504208_1263602079132766_4589208568788544070_n.jpg",
      "/event/IEEEXtreme/594962004_1263594422466865_8735085998910189412_n.jpg",
      "/event/IEEEXtreme/594968399_1263594482466859_3064400369289053188_n.jpg",
      "/event/IEEEXtreme/597303469_1263595349133439_5196367804135448614_n.jpg",
      "/event/IEEEXtreme/594963075_1263596179133356_6548345293121081946_n.jpg",
      "/event/IEEEXtreme/594972773_1263617262464581_2691592322258414722_n.jpg",
      "/event/IEEEXtreme/597572767_1263619262464381_4038665259802609461_n.jpg",
      "/event/IEEEXtreme/594963167_1263617765797864_7882244259867078976_n.jpg",
      "/event/IEEEXtreme/594974179_1263600052466302_7932778597452630050_n.jpg",
      "/event/IEEEXtreme/594964387_1263594965800144_5872589232680750969_n.jpg",
      "/event/IEEEXtreme/596314411_1263595729133401_1307120687459112949_n.jpg",
    ],
    mainImage:
      "/event/IEEEXtreme/594962004_1263594422466865_8735085998910189412_n.jpg",
    cardImage:
      "/event/IEEEXtreme/594963075_1263596179133356_6548345293121081946_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.964019195757724&type=3",
  },
  {
    id: 9,
    slug: "robotics-day",
    name: "Robotics Day",
    year: "2025",
    category: "TECHNICAL",
    categoryColor: "#14B8A6",
    description:
      "Robotics Day was an innovation-driven robotics event organized by the IEEE Student Branch of the University of Moratuwa, in collaboration with the IEEE Robotics and Automation Society Student Branch Chapter.",
    fullDescription:
      "Robotics Day was an innovation-driven robotics event organized by the IEEE Student Branch of the University of Moratuwa, in collaboration with the IEEE Robotics and Automation Society Student Branch Chapter. The event brought together students, robotics enthusiasts, and industry professionals to explore the latest advancements in robotics and automation.\n\nThe program featured robotics exhibitions, live demonstrations, and expert-led sessions, offering participants hands-on exposure to emerging technologies and real-world applications. Attendees experienced humanoid and quadruped robot demonstrations, interacted with innovative projects, and received expert feedback to enhance their own developments. The exhibition provided a platform for students to showcase their robotics innovations, followed by keynote sessions that highlighted trends and future directions in robotics.\n\nRobotics Day not only fosters technical skills and creativity but also encourages collaboration, networking, and innovation among participants. The event inspires the next generation of engineers and innovators, reinforcing its role as a transformative platform in Sri Lanka’s robotics and technological landscape.",
    images: ["/event/Robotics Day/Robotics Day.jpeg"],
    gallery: [
      "/event/Robotics Day/495301494_1090880113071631_3068262929101572922_n.jpg",
      "/event/Robotics Day/495377340_1090887113070931_3714688918436566927_n.jpg",
      "/event/Robotics Day/497551145_1090906389735670_7212334735574111085_n.jpg",
      "/event/Robotics Day/495305103_1090883489737960_3754766612587149385_n.jpg",
      "/event/Robotics Day/495381717_1090879646405011_49126414987450060_n.jpg",
      "/event/Robotics Day/495338512_1090908216402154_2831894373492437051_n.jpg",
      "/event/Robotics Day/495384881_1090905556402420_1166140834360117448_n.jpg",
      "/event/Robotics Day/495375690_1090885933071049_8908086758718771207_n.jpg",
      "/event/Robotics Day/497444705_1090881616404814_1269796916803844776_n.jpg",
    ],
    mainImage:
      "/event/Robotics Day/495377340_1090887113070931_3714688918436566927_n.jpg",
    cardImage:
      "/event/Robotics Day/495301494_1090880113071631_3068262929101572922_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.1090920843067558&type=3",
  },
  {
    id: 10,
    slug: "finnc",
    name: "Future Innovators Challenge",
    year: "2025",
    category: "COMPETITION",
    categoryColor: "#7C3AED",
    description:
      "FInnC (Future Innovators Challenge) is an innovative electronics design competition organized by the IEEE Student Branch of the University of Moratuwa in collaboration with the IEEE Industrial Electronics Society (IES).",
    fullDescription:
      "FInnC (Future Innovators Challenge) is an innovative electronics design competition organized by the IEEE Student Branch of the University of Moratuwa in collaboration with the IEEE Industrial Electronics Society (IES). The competition brings together undergraduate students from universities across Sri Lanka to develop creative electronic solutions, enhancing their technical expertise, problem-solving skills, and innovative thinking.\n\nFinnC’25 featured a series of knowledge-sharing sessions and workshops, including an introductory session, a workshop on Product Design and Development, and hands-on prototyping sessions led by the RoboticGen team. Participants submitted innovation proposals and demonstration videos throughout the competition, culminating in a Grand Finale, where finalists showcased their projects to a panel of industry experts.\n\nFFinnC’25 provides a dynamic platform for creativity and innovation, awarding champions and top performers while offering participants valuable industry exposure and expert feedback. The competition successfully inspires young innovators to transform their ideas into impactful technological solutions, reinforcing its role as a key platform for fostering Sri Lanka’s future electronics and engineering leaders.",

    images: [
      "/event/Finnc/524163752_1149907193835589_1666494559508167772_n.jpg",
    ],
    gallery: [
      "/event/Finnc/503686137_1107726958053613_4286845553822979762_n.jpg",
      "/event/Finnc/503750593_1107726241387018_310280000847073540_n.jpg",
      "/event/Finnc/503984917_1107727501386892_7166364539683278321_n.jpg",
      "/event/Finnc/523934549_1149906137169028_8450230538551712763_n.jpg",
      "/event/Finnc/524138297_1149903233835985_417840518888923735_n.jpg",
      "/event/Finnc/524163752_1149907193835589_1666494559508167772_n.jpg",
      "/event/Finnc/524374949_1149901283836180_1465204607473100205_n.jpg",
      "/event/Finnc/524426322_1149901920502783_2288821748845296099_n.jpg",
    ],
    mainImage:
      "/event/Finnc/524163752_1149907193835589_1666494559508167772_n.jpg",
    cardImage:
      "/event/Finnc/503686137_1107726958053613_4286845553822979762_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.1107733941386248&type=3",
  },
  {
    id: 11,
    slug: "jamborieee",
    name: "JamborIEEE",
    year: "2025",
    category: "COMMUNITY",
    categoryColor: "#EC4899",
    description:
      "Jamboriee 2025, hosted at the University of Rajarata, brought together six IEEE student branches from across Sri Lanka for a vibrant day filled with engaging activities and collaborative experiences.",
    fullDescription:
      "Jamboriee 2025, hosted at the University of Rajarata, brought together six IEEE student branches from across Sri Lanka for a vibrant day filled with engaging activities and collaborative experiences. The participating institutions included the IEEE Student Branch of SLIIT, IEEE Student Branch of the University of Rajarata, IEEE Student Branch of the Vocational Training Institute, IEEE Student Branch of the University of Moratuwa, IEEE Student Branch of the University of Jaffna, and IEEE Student Branch of the University of Ruhuna.\n\nThe event created a lively environment where students from diverse backgrounds came together to interact, participate, and build meaningful connections. Throughout the day, participants engaged in a variety of fun and interactive activities that encouraged teamwork, communication, and camaraderie beyond their individual institutions.\n\nJamboriee 2025 stood out as a memorable experience that fostered friendship, networking, and a strong sense of unity among IEEE student branches across the country.",
    images: [
      "/event/jamborIEEE/541794185_748018911451847_6234089389239009766_n.jpg",
    ],
    gallery: [
      "/event/jamborIEEE/541423110_749931634593908_4172302328836472502_n.jpg",
      "/event/jamborIEEE/541623742_749932784593793_6249507404548374793_n.jpg",
      "/event/jamborIEEE/541625891_748023738118031_6974941148976964897_n.jpg",
      "/event/jamborIEEE/541794185_748018911451847_6234089389239009766_n.jpg",
      "/event/jamborIEEE/542188835_748022801451458_4377998341717009414_n.jpg",
      "/event/jamborIEEE/542591163_748022531451485_5546966912589689399_n.jpg",
      "/event/jamborIEEE/542759764_748023014784770_3126087325785667217_n.jpg",
    ],
    mainImage:
      "/event/jamborIEEE/541794185_748018911451847_6234089389239009766_n.jpg",
    cardImage:
      "/event/jamborIEEE/541423110_749931634593908_4172302328836472502_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.912029977623313&type=3",
  },
  {
    id: 12,
    slug: "roboroaz",
    name: "Roboroaz",
    year: "2025",
    category: "COMPETITION",
    categoryColor: "#8B5CF6",
    description:
      "RoboRoarZ Sri Lanka 2025 is a founding initiative organized by the IEEE Student Branch of the University of Moratuwa, bringing the globally recognized RoboRoarZ competition to Sri Lanka for the very first time.",
    fullDescription:
      "RoboRoarZ Sri Lanka 2025 is a founding initiative organized by the IEEE Student Branch of the University of Moratuwa, bringing the globally recognized RoboRoarZ competition to Sri Lanka for the very first time. Targeted at university students across the island and beyond, it aims to ignite interest in robotics and STEM while bridging the gap between emerging talent and the rapidly advancing world of technology.\n\nThe competition unfolds across multiple rounds, starting with an online elimination round followed by a two-day on-site grand finale. The final stage features two core challenges: Smorphi Imaginary (simulation-based design) and Smorphi Autonomous (real-world execution), where teams apply engineering and design-thinking skills using the Smorphi robotic platform.\n\nParticipants also gain practical experience in robot design and development through expert-led workshops, mentorship from industry professionals and academics, and access to the international RoboRoarZ network and resources.",
    images: ["/event/Roboroaz/APU-2-(Roboroarz-Malaysia-2025) (1).jpg"],
    gallery: [],
    groupedGallery: [
      {
        name: "India",
        images: [
          "/event/Roboroaz/India/3b4e14_aebc2a5aaa364660ab6833349e53103e~mv2.avif",
          "/event/Roboroaz/India/3b4e14_c4de0210c04f4d43b0db20d27d6213a4~mv2.avif",
          "/event/Roboroaz/India/3b4e14_da5ebbda36764f689b50a4adf35de982~mv2.avif",
        ],
      },
      {
        name: "Indonesia",
        images: [
          "/event/Roboroaz/indonesia/3b4e14_7af9bf595d9547a7a996637aabb1ff63~mv2.avif",
          "/event/Roboroaz/indonesia/3b4e14_876a9b0c9c7b4e3bb98b9a2f19e48cb5~mv2.avif",
          "/event/Roboroaz/indonesia/3b4e14_a8673b7bcf714eccada0a09d361e6ddf~mv2.avif",
        ],
      },
      {
        name: "Malaysia",
        images: [
          "/event/Roboroaz/malaysia/3b4e14_098217b80c2b4910b0ce77dd3cde5795~mv2.avif",
          "/event/Roboroaz/malaysia/3b4e14_d4596451a40c460aa615fd1ff5785957~mv2.avif",
          "/event/Roboroaz/malaysia/3b4e14_f1e59ecf22b14acdb1a7c180f131e804~mv2.avif",
        ],
      },
      {
        name: "Singapore",
        images: [
          "/event/Roboroaz/singapore/3b4e14_2587899552044ff9bdbd4d892b8979f2~mv2.avif",
          "/event/Roboroaz/singapore/3b4e14_6fde984a0d4144a2a3d5769859bc13b9~mv2.avif",
          "/event/Roboroaz/singapore/3b4e14_d4e680a342ae40828a1e2d8f4a48881f~mv2.avif",
          "/event/Roboroaz/singapore/3b4e14_fc30b984add841aaa1ba3511c7820d6c~mv2.avif",
        ],
      },
    ],
    mainImage: "/event/Roboroaz/APU-2-(Roboroarz-Malaysia-2025) (1).jpg",
    cardImage:
      "/event/Roboroaz/indonesia/3b4e14_7af9bf595d9547a7a996637aabb1ff63~mv2.avif",
    websiteUrl: "https://www.roboroarzsrilanka.lk/",
  },
  {
    id: 13,
    slug: "ictir",
    name: "ICTIR",
    year: "2025",
    category: "CONFERENCE",
    categoryColor: "#3B82F6",
    description:
      "ICTIR, the International Conference on Information Technology Research, is organized by the Information Technology Research Unit (ITRU) in collaboration with the Faculty of Information Technology and the IEEE Student Branch of the University of Moratuwa.",
    fullDescription:
      "ICTIR, the International Conference on Information Technology Research, is organized by the Information Technology Research Unit (ITRU) in collaboration with the Faculty of Information Technology and the IEEE Student Branch of the University of Moratuwa. The conference serves as a platform for researchers, academics, and industry professionals to share knowledge and explore emerging advancements in information technology and related disciplines.\n\nThe conference features keynote addresses, technical paper presentations, and research discussions across diverse areas such as artificial intelligence, data science, cybersecurity, software engineering, and intelligent systems. It promotes scientific exchange and provides opportunities for participants to present novel research contributions and engage in meaningful academic dialogue.\n\nICTIR fosters collaboration between academia and industry while highlighting innovative research that drives the advancement of information technology both locally and globally.",
    images: [
      "/event/ICTIR/600479028_1267669762059331_4503430071750942877_n.jpg",
    ],
    gallery: [
      "/event/ICTIR/597258275_1267674338725540_1778343347160699941_n.jpg",
      "/event/ICTIR/597316989_1267684812057826_2972413746360932107_n.jpg",
      "/event/ICTIR/597663097_1267673318725642_5006020798267700864_n.jpg",
      "/event/ICTIR/597664357_1267670178725956_8326768395980497527_n.jpg",
      "/event/ICTIR/598052973_1267670738725900_2025134237329919025_n.jpg",
      "/event/ICTIR/598110693_1267691965390444_4947488376914076445_n.jpg",
      "/event/ICTIR/599486461_1267674085392232_4967884445839911913_n.jpg",
      "/event/ICTIR/599528954_1267691842057123_4179746980209577009_n.jpg",
      "/event/ICTIR/600229221_1267691605390480_2503303115055002601_n (1).jpg",
      "/event/ICTIR/600479028_1267669762059331_4503430071750942877_n.jpg",
    ],
    mainImage:
      "/event/ICTIR/600479028_1267669762059331_4503430071750942877_n.jpg",
    cardImage:
      "/event/ICTIR/597258275_1267674338725540_1778343347160699941_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.1267700392056268&type=3",
  },
  {
    id: 14,
    slug: "morauxplore",
    name: "MoraUxplore",
    year: "2025",
    category: "COMPETITION",
    categoryColor: "#F59E0B",
    description:
      "MoraUxplore stands as one of the most prominent competitive programming initiatives organized by the IEEE Student Branch of the University of Moratuwa.",
    fullDescription:
      "MoraUxplore stands as one of the most prominent competitive programming initiatives organized by the IEEE Student Branch of the University of Moratuwa, proudly contributing to Sri Lanka’s presence in global programming competitions and fostering a culture of problem-solving and innovation among university students.",
    images: [
      "/event/MoraUxplore/486360176_1054648060028170_4764194240728831850_n.jpg",
    ],
    gallery: [
      "/event/MoraUxplore/486190563_1054549363371373_865845245182204826_n.jpg",
      "/event/MoraUxplore/486287658_1054648893361420_4994882715247962926_n.jpg",
      "/event/MoraUxplore/486360176_1054648060028170_4764194240728831850_n.jpg",
      "/event/MoraUxplore/486454054_1054649153361394_3768168395657757073_n.jpg",
      "/event/MoraUxplore/486507659_1054648996694743_2852044224853729141_n.jpg",
      "/event/MoraUxplore/486508037_1054550540037922_8893811677253898458_n.jpg",
      "/event/MoraUxplore/486554969_1054648020028174_7286329591169980418_n.jpg",
      "/event/MoraUxplore/486605024_1054647973361512_1436357605641104567_n.jpg",
      "/event/MoraUxplore/486630379_1054648916694751_307291691245798899_n.jpg",
      "/event/MoraUxplore/486632047_1054648923361417_4322883218803699278_n.jpg",
      "/event/MoraUxplore/486653610_1054648820028094_8122357806799091917_n.jpg",
      "/event/MoraUxplore/486677115_1054549353371374_1431334053400051781_n.jpg",
      "/event/MoraUxplore/486761635_1054549586704684_6745582083363428002_n.jpg",
      "/event/MoraUxplore/486768983_1054647996694843_3564848040649766722_n.jpg",
      "/event/MoraUxplore/486951461_1054648676694775_876386906523009962_n.jpg",
      "/event/MoraUxplore/487114209_1054649023361407_199870124990414019_n.jpg",
      "/event/MoraUxplore/487241761_1054649026694740_8214488359126833679_n.jpg",
    ],
    mainImage:
      "/event/MoraUxplore/486605024_1054647973361512_1436357605641104567_n.jpg",
    cardImage:
      "/event/MoraUxplore/486190563_1054549363371373_865845245182204826_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set/?set=a.912029977623313&type=3",
  },
  {
    id: 15,
    slug: "nfb-championship",
    name: "NFB Championship",
    year: "2025",
    category: "E-SPORTS",
    categoryColor: "#EAB308",
    description:
      "NFB Championship is a competitive event designed to challenge participants in new frontiers of technology and engineering.",
    images: [
      "/event/NFB Championship/481252349_1033836118776031_472465518764129267_n.jpg",
    ],
    gallery: [
      "/event/NFB Championship/480836742_1033834842109492_8551140352823286849_n.jpg",
      "/event/NFB Championship/480931817_1033834865442823_7268405779627401676_n.jpg",
      "/event/NFB Championship/480983913_1033835792109397_7858902922809836028_n.jpg",
      "/event/NFB Championship/481069211_1033834652109511_299246510168752567_n.jpg",
      "/event/NFB Championship/481149836_1033835732109403_1655845870321506352_n.jpg",
      "/event/NFB Championship/481190925_1033834875442822_8620728556875998783_n.jpg",
      "/event/NFB Championship/481196376_1033837135442596_1656232314589717041_n.jpg",
      "/event/NFB Championship/481231863_1033836165442693_9216739019214905027_n.jpg",
      "/event/NFB Championship/481252349_1033836118776031_472465518764129267_n.jpg",
      "/event/NFB Championship/482001557_1033836872109289_5304005323481615888_n.jpg",
      "/event/NFB Championship/482004349_1033835712109405_7155580846501703875_n.jpg",
      "/event/NFB Championship/482005900_1033835948776048_2438648459899287747_n.jpg",
    ],
    mainImage:
      "/event/NFB Championship/481252349_1033836118776031_472465518764129267_n.jpg",
    cardImage:
      "/event/NFB Championship/480836742_1033834842109492_8551140352823286849_n.jpg",
    facebookUrl:
      "https://web.facebook.com/media/set?vanity=ieeesbuom&set=a.626383876187926",
  },
];