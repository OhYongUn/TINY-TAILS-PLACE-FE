'use client';
import Link from 'next/link';
import {
  UserIcon,
  CalendarIcon,
  SettingsIcon,
  PawPrintIcon,
} from '@repo/ui/components/ui/icons';
import { usePathname } from 'next/navigation';

const ProfileSideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 flex-col border-r bg-background p-4 sm:flex">
      <nav className="flex flex-col gap-2">
        <Link
          href="/profile"
          className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
            pathname === '/profile'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          <UserIcon className="h-5 w-5" />
          <span>회원 정보</span>
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
          <span>나의 애완 동물</span>
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
    </aside>
  );
};

export default ProfileSideBar;
