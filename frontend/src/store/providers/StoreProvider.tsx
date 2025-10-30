'use client';

import { makeStore } from '@/store';
import { Provider } from 'react-redux';

import type React from 'react';

type Props = {
  children: React.ReactNode;
};

const store = makeStore();

export function StoreProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
