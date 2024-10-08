import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@repo/ui/globals.css';
import React, { ReactNode } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { AuthProvider } from '@app/components/AuthProvider';
import { AlertDialogProvider } from '@app/components/AlertDialogProvider';
import { QueryClient } from '@tanstack/react-query';
import QueryClientWrapper from '@app/components/QueryClientWrapper';

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
  title: '호텔 관리 시스템',
  description: '호텔 예약 및 관리를 위한 대시보드',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn('antialiased', fontHeading.variable, fontBody.variable)}
      >
        <QueryClientWrapper>
          <AlertDialogProvider>
            <AuthProvider>{children}</AuthProvider>
          </AlertDialogProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
