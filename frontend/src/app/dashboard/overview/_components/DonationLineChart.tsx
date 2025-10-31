'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, LineProps, Tooltip, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A linear line chart showing total per month';

const chartData = [
  { month: 'January', membership: 186, sadaqah: 120, zakat: 80, others: 60 },
  { month: 'February', membership: 305, sadaqah: 180, zakat: 200, others: 90 },
  { month: 'March', membership: 237, sadaqah: 150, zakat: 120, others: 70 },
  { month: 'April', membership: 73, sadaqah: 90, zakat: 190, others: 50 },
  { month: 'May', membership: 209, sadaqah: 140, zakat: 130, others: 85 },
  { month: 'June', membership: 214, sadaqah: 160, zakat: 140, others: 95 },
  { month: 'July', membership: 100, sadaqah: 50, zakat: 40, others: 30 },
  { month: 'August', membership: 280, sadaqah: 190, zakat: 170, others: 110 },
  { month: 'September', membership: 300, sadaqah: 200, zakat: 180, others: 120 },
  { month: 'October', membership: 320, sadaqah: 210, zakat: 200, others: 130 },
  { month: 'November', membership: 290, sadaqah: 180, zakat: 190, others: 100 },
  { month: 'December', membership: 310, sadaqah: 220, zakat: 210, others: 140 },
];

const totalChartData = chartData.map((item) => ({
  ...item,
  total: item.membership + item.sadaqah + item.zakat + item.others,
}));

const chartConfig = {
  total: { label: 'Total', color: 'var(--chart-1)' },
} satisfies ChartConfig;

export function DonationLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations - Total per Month</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <LineChart accessibilityLayer data={totalChartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              cursor={{ stroke: 'transparent' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;

                const data = payload[0]?.payload;
                if (!data) return null;

                const tooltipPayload = [
                  { name: 'Sadaqah', value: data.sadaqah },
                  { name: 'Zakat', value: data.zakat },
                  { name: 'Membership', value: data.membership },
                  { name: 'Others', value: data.others },
                  { name: 'Total', value: data.total },
                ] as LineProps['data'][];

                return (
                  <ChartTooltipContent
                    active={active}
                    payload={tooltipPayload}
                    label={label}
                    hideIndicator
                  />
                );
              }}
            />
            <Line
              dataKey="total"
              type="linear"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Realtime donation per month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing donations from each category with totals
        </div>
      </CardFooter>
    </Card>
  );
}
