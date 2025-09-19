import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './_components/AppSidebar';
import { DonationLineChart } from './_components/DonationLineChart';
import { IncomeExpenseChartBar } from './_components/IncomeExpenseChartBar';
import { SectionCards } from './_components/SectionCards';
import { SiteHeader } from './_components/SiteHeader';

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 60)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <IncomeExpenseChartBar />
              </div>
              <div className="px-4 lg:px-6">
                <DonationLineChart />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
