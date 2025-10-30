import { AuthSessionProvider } from '@/domain/auth/AuthSessionProvider';
import { SessionTokenBridge } from '@/domain/auth/SessionTokenBridge';
import { StoreProvider } from '@/store/providers/StoreProvider';
import '@/style/index.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import type React from 'react';

import { Geist, Geist_Mono } from 'next/font/google';

import { ToasterProvider } from '@/components/ToasterProvider';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Habrul Ummah',
  description: 'A trusted institution for Islamic (religious) education.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <AuthSessionProvider>
              <SessionTokenBridge />
              {children}
            </AuthSessionProvider>
          </StoreProvider>
        </ThemeProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
