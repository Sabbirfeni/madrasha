export const BRANCH_MAP = {
  1: 'All',
  2: 'Boys',
  3: 'Girls',
  4: 'Hostels',
} as const;

export const BRANCH_REVERSE_MAP = {
  All: 1,
  Boys: 2,
  Girls: 3,
  Hostels: 4,
} as const;

export type BranchLabel = (typeof BRANCH_MAP)[keyof typeof BRANCH_MAP];
export type BranchValue = keyof typeof BRANCH_MAP;
