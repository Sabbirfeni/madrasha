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
  { month: 'January', membership: 186, sadka: 120, jakat: 80 },
  { month: 'February', membership: 305, sadka: 180, jakat: 200 },
  { month: 'March', membership: 237, sadka: 150, jakat: 120 },
  { month: 'April', membership: 73, sadka: 90, jakat: 190 },
  { month: 'May', membership: 209, sadka: 140, jakat: 130 },
  { month: 'June', membership: 214, sadka: 160, jakat: 140 },
  { month: 'July', membership: 100, sadka: 50, jakat: 40 },
  { month: 'August', membership: 280, sadka: 190, jakat: 170 },
  { month: 'September', membership: 300, sadka: 200, jakat: 180 },
  { month: 'October', membership: 320, sadka: 210, jakat: 200 },
  { month: 'November', membership: 290, sadka: 180, jakat: 190 },
  { month: 'December', membership: 310, sadka: 220, jakat: 210 },
];

const totalChartData = chartData.map((item) => ({
  ...item,
  total: item.membership + item.sadka + item.jakat,
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
                  { name: 'Membership', value: data.membership },
                  { name: 'Sadka', value: data.sadka },
                  { name: 'Jakat', value: data.jakat },
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
