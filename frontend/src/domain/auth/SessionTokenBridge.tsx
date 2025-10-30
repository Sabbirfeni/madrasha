'use client';

import { setAccessToken } from '@/services/rtk/authToken';
import { useSession } from 'next-auth/react';

import { useEffect } from 'react';

export function SessionTokenBridge() {
  const { data } = useSession();

  useEffect(() => {
    // next-auth session augmented to include accessToken
    const token = (data as typeof data & { accessToken?: string })?.accessToken ?? null;
    setAccessToken(token ?? null);
    return () => {
      // clear on unmount
      setAccessToken(null);
    };
  }, [data]);

  return null;
}
