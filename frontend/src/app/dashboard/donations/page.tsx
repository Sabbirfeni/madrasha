'use client';

import { DonationListTable, donationListTableColumns } from './_components/DonationListTable';
import { allDonations } from './donations';

export default function DonationsPage() {
  return (
    <DonationListTable columns={donationListTableColumns} data={allDonations} title="Donations" />
  );
}
