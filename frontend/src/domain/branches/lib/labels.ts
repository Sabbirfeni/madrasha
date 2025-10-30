import { Branch } from '@/domain/branches/enums';

export const BRANCH_LABELS: Record<Branch, string> = {
  [Branch.BOYS]: 'Boys',
  [Branch.GIRLS]: 'Girls',
};

export const toBranchLabel = (branch: Branch): string => BRANCH_LABELS[branch];

export const parseBranchLabel = (label: string): Branch | null => {
  const normalized = label.trim().toLowerCase();
  if (normalized === 'boys') return Branch.BOYS;
  if (normalized === 'girls') return Branch.GIRLS;
  return null;
};
