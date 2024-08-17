'use client';

import { ReactNode } from 'react';
import ProfileSideBar from '@app/components/profileSideBar';
import MobileProfileSideBar from '@app/components/mobileProfileSideBar';

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-1">
      <ProfileSideBar />
      <MobileProfileSideBar />
      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}
