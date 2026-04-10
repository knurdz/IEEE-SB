export const COMMITTEE_ORDER = [
  'Executive Committee',
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
  | 'Committee Member';

export interface MemberInput {
  name: string;
  committee: RawCommitteeName;
  position: PositionName;
  linkedin?: string;
  email?: string;
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
