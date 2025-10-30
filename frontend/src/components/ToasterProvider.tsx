'use client';

import { Toaster } from 'sonner';

export function ToasterProvider() {
  return <Toaster richColors closeButton position="bottom-right" theme="dark" />;
}
