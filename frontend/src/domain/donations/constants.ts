export const DONATION_TYPE_MAP = {
  1: 'Sadaqah',
  2: 'Zakat',
  3: 'Membership',
  4: 'Others',
} as const;

export const DONATION_TYPE_REVERSE_MAP = {
  Sadaqah: 1,
  Zakat: 2,
  Membership: 3,
  Others: 4,
} as const;

export type DonationTypeLabel = (typeof DONATION_TYPE_MAP)[keyof typeof DONATION_TYPE_MAP];
export type DonationTypeValue = keyof typeof DONATION_TYPE_MAP;
