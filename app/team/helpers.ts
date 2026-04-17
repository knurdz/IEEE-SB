import {
  COMMITTEE_ORDER,
  CommitteeName,
  Member,
  MemberInput,
  PositionName,
  TeamSectionData,
} from './types';


const POSITION_PRIORITY: Record<PositionName, number> = {
  CHAIRMAN: 1,
  'VICE CHAIRMAN': 2,
  SECRETARY: 3,
  TREASURER: 5,
  'ASSISTANT SECRETARY': 4,
  WEBMASTER: 6,
  'CHAPTER & AFFINITY GROUP COORDINATOR': 7,
  'Committee Lead': 8,
  'EVENTS COMMITTEE LEAD': 8,
  'DESIGN COMMITTEE LEAD': 8,
  'FINANCE & IR COMMITTEE LEAD': 8,
  'LOGISTIC MANAGEMENT COMMITTEE CO-LEAD': 8,
  'LOGISTICS MANAGEMENT COMMITTEE CO-LEAD': 8,
  'PUBLICITY COMMITTEE LEAD': 8,
  'EDITORIAL COMMITTEE LEAD': 8,
  'VOLUNTEER MANAGEMENT COMMITTEE LEAD': 8,
  'MEMBERSHIP DEVELOPMENT COMMITTEE LEAD': 8,
  'RoboRoarZ 2025 CHAIRPERSON': 8,
  'MoraForesight 4.0 CHAIRPERSON': 8,
  'Committee Member': 9,
};

export function normalizeCommitteeName(committee: MemberInput['committee']): CommitteeName {
  return committee === 'ExCom' ? 'Executive Committee' : committee;
}

export function getPositionPriority(position: PositionName): number {
  return POSITION_PRIORITY[position];
}

export function getPriorityTone(
  priority: number,
): 'featured' | 'elevated' | 'supporting' | 'standard' {
  if (priority <= 2) return 'featured';
  if (priority <= 7) return 'elevated';
  if (priority === 8) return 'supporting';
  return 'standard';
}

export function withMemberMetadata(member: MemberInput, sourceIndex: number): Member {
  return {
    ...member,
    committee: normalizeCommitteeName(member.committee),
    image: member.image || "/member.webp",
    priority: getPositionPriority(member.position),
    sourceIndex,
    imageScale: member.imageScale ?? 1.0,
    imageTranslateY: member.imageTranslateY ?? '0%',
    imageTranslateX: member.imageTranslateX ?? '0%',
  };
}

export function sortMembersByPriority(members: Member[]): Member[] {
  return [...members].sort((left, right) => {
    if (left.priority !== right.priority) {
      return left.priority - right.priority;
    }

    return left.sourceIndex - right.sourceIndex;
  });
}



export function groupMembersByCommittee(members: Member[]): TeamSectionData[] {
  return COMMITTEE_ORDER.map((title) => ({
    title,
    members: sortMembersByPriority(members.filter((member) => member.committee === title)),
  })).filter((section) => section.members.length > 0);
}
