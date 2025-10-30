import { NextResponse } from 'next/server';

type ProtectedRoute = {
  base: string;
  defaultRedirect?: string;
};

// Central list of protected areas and their default post-login destinations
export const PROTECTED_ROUTES: ProtectedRoute[] = [
  { base: '/dashboard', defaultRedirect: '/dashboard/overview' },
  // Add more: { base: '/admin', defaultRedirect: '/admin/home' }
];

const AUTH_PAGES = ['/login'];

export const isProtectedPath = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((r) => pathname.startsWith(r.base));
};

export const isAuthPage = (pathname: string): boolean => {
  return AUTH_PAGES.includes(pathname);
};

export const buildRedirect = (reqUrl: string, target: string): NextResponse => {
  const url = new URL(target, reqUrl);
  const current = new URL(reqUrl);
  if (!isAuthPage(target)) {
    url.searchParams.set('callbackUrl', encodeURIComponent(current.pathname + current.search));
  }
  return NextResponse.redirect(url);
};

// Optional role guard mapping (extend when needed)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const requiredRolesForPath = (_pathname: string): number[] | undefined => {
  return undefined;
};

export const getDefaultAuthedRedirect = (): string => {
  const first = PROTECTED_ROUTES[0];
  return first?.defaultRedirect ?? first?.base ?? '/';
};
