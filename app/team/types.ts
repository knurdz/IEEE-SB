export const COMMITTEE_ORDER = [
  'Executive Committee',
  'Leadership Body',
  'Logistics Management Committee',
  'Editorial Committee',
  'Design Committee',
  'Publicity Committee',
  'Volunteer Management Committee',
  'Events Committee',
  'Finance & IR Committee',
  'Membership Development Committee',
] as const;

export type CommitteeName = (typeof COMMITTEE_ORDER)[number];

export type RawCommitteeName = CommitteeName | 'ExCom';

export type PositionName =
  | 'CHAIRMAN'
  | 'VICE CHAIRMAN'
  | 'SECRETARY'
  | 'TREASURER'
  | 'ASSISTANT SECRETARY'
  | 'WEBMASTER'
  | 'CHAPTER & AFFINITY GROUP COORDINATOR'
  | 'Committee Lead'
  | 'Committee Member'
  | 'EVENTS COMMITTEE LEAD'
  | 'DESIGN COMMITTEE LEAD'
  | 'FINANCE & IR COMMITTEE LEAD'
  | 'LOGISTIC MANAGEMENT COMMITTEE CO-LEAD'
  | 'LOGISTICS MANAGEMENT COMMITTEE CO-LEAD'
  | 'PUBLICITY COMMITTEE LEAD'
  | 'EDITORIAL COMMITTEE LEAD'
  | 'VOLUNTEER MANAGEMENT COMMITTEE LEAD'
  | 'MEMBERSHIP DEVELOPMENT COMMITTEE LEAD'
  | 'RoboRoarZ 2025 CHAIRPERSON';

export interface MemberInput {
  name: string;
  committee: RawCommitteeName;
  position: PositionName;
  linkedin?: string;
  email?: string;
  image?: string;
}

export interface Member {
  name: string;
  committee: CommitteeName;
  position: PositionName;
  image: string;
  linkedin?: string;
  email?: string;
  priority: number;
  sourceIndex: number;
}

export interface TeamSectionData {
  title: CommitteeName;
  members: Member[];
}
