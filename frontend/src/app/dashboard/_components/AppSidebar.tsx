'use client';

import { BarChart3, Folder, LayoutDashboard, List, Users } from 'lucide-react';
import MadrasaLogo from '~/public/images/habrul ummah model madrasa logo.svg';

import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import NavMain from './NavMain';
import { NavUser } from './NavUser';

const data = {
  user: {
    name: 'Admin',
    phone: '+880 1843 676171',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Overview',
      url: '/dashboard/overview',
      icon: LayoutDashboard,
    },
    {
      title: 'Admins',
      url: '/admins',
      icon: List,
    },
    {
      title: 'Students',
      url: '/students',
      icon: BarChart3,
    },
    {
      title: 'Employees',
      url: '/employess',
      icon: Folder,
    },
    {
      title: 'Donations',
      url: '/donations',
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <Image
                  src={MadrasaLogo}
                  alt="Habrul Ummah Madrasa Logo"
                  width={36}
                  height={36}
                  className="rounded-full object-contain"
                />
                <span className="text-base font-semibold">Habrul Ummah</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
