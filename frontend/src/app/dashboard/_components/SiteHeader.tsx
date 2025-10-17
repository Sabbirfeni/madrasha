'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  const pathname = usePathname();
  const isOverviewPage = pathname === '/dashboard/overview';

  // Generate year options (current year and previous 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);

  // State for selected year (default to current year)
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(currentYear);

  const handleYearChange = (year: number | 'all') => {
    setSelectedYear(year);
    console.log('Selected year:', year);
  };

  const getDisplayText = () => {
    return selectedYear === 'all' ? 'All Years' : selectedYear.toString();
  };

  return (
    <header className="sticky top-0 z-10 bg-background rounded-t-xl flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Overview</h1>
        <div className="ml-auto flex items-center gap-2">
          {isOverviewPage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8 px-3 bg-transparent">
                  {getDisplayText()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedYear === 'all'}
                  onCheckedChange={() => handleYearChange('all')}
                >
                  All Years
                </DropdownMenuCheckboxItem>
                {yearOptions.map((year) => (
                  <DropdownMenuCheckboxItem
                    key={year}
                    checked={selectedYear === year}
                    onCheckedChange={() => handleYearChange(year)}
                  >
                    {year}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
