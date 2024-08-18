'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@repo/ui/components/ui/sheet';
import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import {
  UserIcon,
  PawPrintIcon,
  CalendarIcon,
  SettingsIcon,
  MenuIcon,
} from '@repo/ui/components/ui/icons';
import { usePathname } from 'next/navigation';

const MobileProfileSideBar = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:hidden">
        <nav className="grid gap-2 p-4">
          <Link
            href="/profile"
            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
              pathname === '/profile'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <UserIcon className="h-5 w-5" />
            <span>회 정보</span>
          </Link>
          <Link
            href="/profile/pets"
            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
              pathname === '/profile/pets'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <PawPrintIcon className="h-5 w-5" />
            <span>애완동물</span>
          </Link>
          <Link
            href="/profile/reservations"
            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
              pathname === '/profile/reservations'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <CalendarIcon className="h-5 w-5" />
            <span>예약 현황</span>
          </Link>
          <Link
            href="/profile/settings"
            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
              pathname === '/profile/settings'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <SettingsIcon className="h-5 w-5" />
            <span>환경설정</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default MobileProfileSideBar;
