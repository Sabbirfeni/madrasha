import { DonationLineChart } from './_components/DonationLineChart';
import { IncomeExpenseChartBar } from './_components/IncomeExpenseChartBar';
import { SectionCards } from './_components/SectionCards';

const OverviewPage = () => {
  return (
    <>
      <SectionCards />
      <IncomeExpenseChartBar />
      <DonationLineChart />
    </>
  );
};

export default OverviewPage;
