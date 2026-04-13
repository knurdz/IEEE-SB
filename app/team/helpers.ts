import {
  COMMITTEE_ORDER,
  CommitteeName,
  Member,
  MemberInput,
  PositionName,
  TeamSectionData,
} from './types';

const PLACEHOLDER_IMAGES = ['/member6.png', '/member7.png', '/member8.png'] as const;

const POSITION_PRIORITY: Record<PositionName, number> = {
  CHAIRMAN: 1,
  'VICE CHAIRMAN': 2,
  SECRETARY: 3,
  TREASURER: 4,
  'ASSISTANT SECRETARY': 5,
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
    image: member.image || PLACEHOLDER_IMAGES[sourceIndex % PLACEHOLDER_IMAGES.length],
    priority: getPositionPriority(member.position),
    sourceIndex,
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

function getTopRowSize(memberCount: number, topPriorityCount: number): number {
  if (memberCount === 10) return 5;
  if (memberCount <= 3) return memberCount;
  if (memberCount <= 6) return topPriorityCount >= 2 ? 4 : 3;
  if (memberCount === 7) return topPriorityCount >= 2 ? 4 : 3;
  if (memberCount === 8) return topPriorityCount >= 2 ? 4 : 5;
  return topPriorityCount >= 2 ? 4 : 5;
}

function getProminenceSlots(count: number): number[] {
  if (count <= 0) return [];

  if (count % 2 === 1) {
    const center = Math.floor(count / 2);
    const slots = [center];

    for (let offset = 1; slots.length < count; offset += 1) {
      if (center - offset >= 0) {
        slots.push(center - offset);
      }

      if (center + offset < count) {
        slots.push(center + offset);
      }
    }

    return slots;
  }

  const leftCenter = count / 2 - 1;
  const rightCenter = leftCenter + 1;
  const slots = [leftCenter, rightCenter];

  for (let offset = 1; slots.length < count; offset += 1) {
    if (leftCenter - offset >= 0) {
      slots.push(leftCenter - offset);
    }

    if (rightCenter + offset < count) {
      slots.push(rightCenter + offset);
    }
  }

  return slots;
}

function arrangeTopRow(members: Member[], topPriorityCount: number): Member[] {
  if (members.length <= 2) {
    return members;
  }

  const slots = new Array<Member | undefined>(members.length);
  const prominenceSlots = getProminenceSlots(members.length);
  const priorityMembers = members.slice(0, topPriorityCount);
  const remainingMembers = members.slice(topPriorityCount);

  priorityMembers.forEach((member, index) => {
    slots[prominenceSlots[index]] = member;
  });

  remainingMembers.forEach((member, index) => {
    slots[prominenceSlots[topPriorityCount + index]] = member;
  });

  return slots.filter((member): member is Member => Boolean(member));
}

export function splitMembersIntoRows(members: Member[]): { topRow: Member[]; bottomRow: Member[] } {
  const sortedMembers = sortMembersByPriority(members);

  if (sortedMembers.length <= 3) {
    return {
      topRow: arrangeTopRow(sortedMembers, 1),
      bottomRow: [],
    };
  }

  const highestPriority = sortedMembers[0]?.priority ?? 9;
  const topPriorityCount = sortedMembers.filter(
    (member) => member.priority === highestPriority,
  ).length;
  const topRowSize = Math.min(
    getTopRowSize(sortedMembers.length, topPriorityCount),
    sortedMembers.length,
  );

  return {
    topRow: arrangeTopRow(sortedMembers.slice(0, topRowSize), topPriorityCount),
    bottomRow: sortedMembers.slice(topRowSize),
  };
}

export function groupMembersByCommittee(members: Member[]): TeamSectionData[] {
  return COMMITTEE_ORDER.map((title) => ({
    title,
    members: sortMembersByPriority(members.filter((member) => member.committee === title)),
  })).filter((section) => section.members.length > 0);
}
