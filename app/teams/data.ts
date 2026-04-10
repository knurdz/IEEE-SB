import { groupMembersByCommittee, withMemberMetadata } from './helpers';
import { Member, MemberInput, TeamSectionData } from './types';

const rawMembers: MemberInput[] = [
  {
    name: 'Chanuka Anjana',
    committee: 'ExCom',
    position: 'CHAIRMAN',
    email: 'chanukaanjana01@gmail.com',
    linkedin: 'https://www.linkedin.com/in/chanukaanjana',
  },
  {
    name: 'Uthsara Manul',
    committee: 'ExCom',
    position: 'VICE CHAIRMAN',
    email: 'uthzaaawim@gmail.com',
    linkedin: 'https://www.linkedin.com/in/uthsara-manul-wimalarathne-b3b91121b',
  },
  {
    name: 'Praveesha De Silva',
    committee: 'ExCom',
    position: 'SECRETARY',
    email: 'praveeshadesilva@gmail.com',
    linkedin: 'https://www.linkedin.com/in/praveesha-de-silva-2a43a9277',
  },
  {
    name: 'Oshadha Kandamby',
    committee: 'ExCom',
    position: 'TREASURER',
    email: 'kandambyoshadha@gmail.com',
    linkedin: 'https://www.linkedin.com/in/oshadha-kandamby-8a78872a4',
  },
  {
    name: 'Yasiru Nilupul',
    committee: 'ExCom',
    position: 'ASSISTANT SECRETARY',
    email: 'yasiru0254321@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yasiru-wickramage-2b6789387',
  },
  {
    name: 'Ishan Hansaka',
    committee: 'ExCom',
    position: 'WEBMASTER',
    email: 'ishanhansakasilva@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ishanhansakasilva',
  },
  {
    name: 'Vindhya Kulasinghe',
    committee: 'ExCom',
    position: 'CHAPTER & AFFINITY GROUP COORDINATOR',
    email: 'vindhyakulasingheieeesb25@gmail.com',
    linkedin: 'https://www.linkedin.com/in/vindhya-kumari-kulasinghe-4a828925b',
  },
  {
    name: 'Chanuka Dissanayaka',
    committee: 'Logistics Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Imesh Yasindu',
    committee: 'Editorial Committee',
    position: 'Committee Lead',
    email: 'imesh7lk@gmail.com',
    linkedin: 'https://www.linkedin.com/in/imeshmunasinghe/',
  },
  {
    name: 'Seniya Amarakoon',
    committee: 'Design Committee',
    position: 'Committee Member',
  },
  {
    name: 'Buddhima Gayashan',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sahas Samuditha',
    committee: 'Design Committee',
    position: 'Committee Lead',
    email: 'sahas.samuditha@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sahas-samuditha',
  },
  {
    name: 'Randi Kaweesha',
    committee: 'Volunteer Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Dulmi Jayasooriya',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Gayangi Devindi',
    committee: 'Volunteer Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Hiruna Malavipathirana',
    committee: 'Events Committee',
    position: 'Committee Lead',
    email: 'hirunamalavipathirana.333@gmail.com',
    linkedin: 'https://www.linkedin.com/in/hiruna-malavipathirana-b0904916a',
  },
  {
    name: 'Inuka Jithmal',
    committee: 'Finance & IR Committee',
    position: 'Committee Member',
  },
  {
    name: 'Kushani Umanda',
    committee: 'Logistics Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Manjari Manesha',
    committee: 'Membership Development Committee',
    position: 'Committee Member',
  },
  {
    name: 'Ranudi Namarathna',
    committee: 'Editorial Committee',
    position: 'Committee Member',
  },
  {
    name: 'Gishan Chamith',
    committee: 'Volunteer Management Committee',
    position: 'Committee Lead',
    email: 'gishanchamith77@gmail.com',
    linkedin: 'https://www.linkedin.com/in/gishan-chamith-66b49b340',
  },
  {
    name: 'Sandali Kadawedduwa',
    committee: 'Events Committee',
    position: 'Committee Member',
  },
  {
    name: 'Oshini Ravintha',
    committee: 'Membership Development Committee',
    position: 'Committee Member',
  },
  {
    name: 'Adeesha Surawiman',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Ishakya Gamage',
    committee: 'Logistics Management Committee',
    position: 'Committee Lead',
    email: 'ishakyaranhiru@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ishakya-gamage-71765b349',
  },
  {
    name: 'Thamalu Bambaravanage',
    committee: 'Publicity Committee',
    position: 'Committee Lead',
    email: 'thamaludinu@gmail.com',
    linkedin: 'https://www.linkedin.com/in/thamalu',
  },
  {
    name: 'Sandakelum Dissanayake',
    committee: 'Volunteer Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Kusal Nirukshan Amantha',
    committee: 'Editorial Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sasmini Wanniarachchi',
    committee: 'Finance & IR Committee',
    position: 'Committee Member',
  },
  {
    name: 'Dulmini Aththanayaka',
    committee: 'Events Committee',
    position: 'Committee Member',
  },
  {
    name: 'Hasaruvi Kodithuwakku',
    committee: 'Membership Development Committee',
    position: 'Committee Member',
  },
  {
    name: 'Yashini Gunasekara',
    committee: 'Finance & IR Committee',
    position: 'Committee Lead',
    email: 'yjgunasekara@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yashini-gunasekara-773b59313',
  },
  {
    name: 'Kevin Ambrose',
    committee: 'Membership Development Committee',
    position: 'Committee Member',
  },
  {
    name: 'Rashmika Dilshan',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sanduni Gamage',
    committee: 'Finance & IR Committee',
    position: 'Committee Member',
  },
  {
    name: 'Kalana Abeysundara',
    committee: 'Membership Development Committee',
    position: 'Committee Lead',
    email: 'knbabeysundara@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kalana-abeysundara',
  },
  {
    name: 'Senuja Jayaweera',
    committee: 'Logistics Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sineth Wickramaratna',
    committee: 'Design Committee',
    position: 'Committee Member',
  },
  {
    name: 'Lasan Perera',
    committee: 'Logistics Management Committee',
    position: 'Committee Lead',
    email: 'lasanperera.lsp@gmail.com',
    linkedin: 'https://www.linkedin.com/in/lasan-perera-0881a3280',
  },
  {
    name: 'Nimindu Prishmika',
    committee: 'Events Committee',
    position: 'Committee Member',
  },
  {
    name: 'Thisandi Rajapaksha',
    committee: 'Volunteer Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sadil Ephraims',
    committee: 'Logistics Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sadeepa Herath',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Suvindu Ranchigoda',
    committee: 'Finance & IR Committee',
    position: 'Committee Member',
  },
  {
    name: 'Induru Adeesha',
    committee: 'Events Committee',
    position: 'Committee Member',
  },
  {
    name: 'Sandali Sathsarani',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Janiru Dewanmith',
    committee: 'Volunteer Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Umesh Bandara',
    committee: 'Membership Development Committee',
    position: 'Committee Member',
  },
  {
    name: 'Devindi Wickramarathna',
    committee: 'Logistics Management Committee',
    position: 'Committee Member',
  },
  {
    name: 'Mindiya Karunasinghe',
    committee: 'Events Committee',
    position: 'Committee Member',
  },
  {
    name: 'Kamitha Akash',
    committee: 'Editorial Committee',
    position: 'Committee Member',
  },
  {
    name: 'Kumudya Gnanaweera',
    committee: 'Finance & IR Committee',
    position: 'Committee Member',
  },
  {
    name: 'Jithmini Munasinghe',
    committee: 'Editorial Committee',
    position: 'Committee Member',
  },
  {
    name: 'Asheni Bandara',
    committee: 'Editorial Committee',
    position: 'Committee Member',
  },
  {
    name: 'Senaya Bandara',
    committee: 'Editorial Committee',
    position: 'Committee Member',
  },
  {
    name: 'Janidu Janadara',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Chamoth Sandeepa',
    committee: 'Publicity Committee',
    position: 'Committee Member',
  },
  {
    name: 'Minuka De Silva',
    committee: 'Design Committee',
    position: 'Committee Member',
  },
  {
    name: 'Thisul Dulneth',
    committee: 'Design Committee',
    position: 'Committee Member',
  },
];

export const teamMembers: Member[] = rawMembers.map(withMemberMetadata);

export const teamSections: TeamSectionData[] = groupMembersByCommittee(teamMembers);
