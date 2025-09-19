'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A multiple bar chart';

const chartData = [
  { month: 'January', income: 186, expense: 80 },
  { month: 'February', income: 205, expense: 200 },
  { month: 'March', income: 237, expense: 120 },
  { month: 'April', income: 73, expense: 190 },
  { month: 'May', income: 209, expense: 130 },
  { month: 'June', income: 214, expense: 140 },
  { month: 'July', income: 250, expense: 150 },
  { month: 'August', income: 100, expense: 170 },
  { month: 'September', income: 230, expense: 180 },
  { month: 'October', income: 220, expense: 200 },
  { month: 'November', income: 250, expense: 190 },
  { month: 'December', income: 310, expense: 210 },
];

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--chart-2)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function IncomeExpenseChartBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income & Expense - Comparison per Month</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="income" fill="var(--chart-2)" radius={4} />
            <Bar dataKey="expense" fill="var(--chart-1)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Realtime income and expense comparison <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Income and Expense comparison until this month
        </div>
      </CardFooter>
    </Card>
  );
}
