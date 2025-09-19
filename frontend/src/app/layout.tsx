import '@/style/index.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import type React from 'react';

import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'হাবরুল উম্মাহ মডেল মাদ্রাসা',
  description: 'ইলমে দ্বীন শিক্ষার নির্ভরযোগ্য প্রতিষ্ঠান',
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
        <div className="min-h-screen bg-background flex items-center justify-center">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
