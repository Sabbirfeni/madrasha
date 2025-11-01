import { authOptions } from '@/lib/auth';
import { getDonationsByMonth, getIncomeExpenseComparison } from '@/services/analytics';
import { getServerSession } from 'next-auth';

import { DonationLineChart } from './_components/DonationLineChart';
import { IncomeExpenseChartBar } from './_components/IncomeExpenseChartBar';
import { SectionCards } from './_components/SectionCards';

const OverviewPage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;

  const [incomeExpenseData, donationsData] = await Promise.all([
    getIncomeExpenseComparison({ accessToken }),
    getDonationsByMonth({ accessToken }),
  ]);

  return (
    <>
      <SectionCards accessToken={accessToken} />
      <IncomeExpenseChartBar data={incomeExpenseData || []} />
      <DonationLineChart data={donationsData || []} />
    </>
  );
};

export default OverviewPage;
