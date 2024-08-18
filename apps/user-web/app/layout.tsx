import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@repo/ui/lib/utils';
import React, { ReactNode } from 'react';
import ConditionalHeaderFooter from '@app/components/ConditionalHeaderFooter';
import { AuthProvider } from '@app/app/authProvider';

const inter = Inter({ subsets: ['latin'] });
const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});
export const metadata: Metadata = {
  title: 'Tiny Tails Place',
  description: 'Tiny Tails Place',
};
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased', fontHeading.variable, fontBody.variable)}
      >
        <AuthProvider>
          <ConditionalHeaderFooter>{children}</ConditionalHeaderFooter>
        </AuthProvider>
      </body>
    </html>
  );
}
