'use client';
import Link from 'next/link';
import {
  UserIcon,
  CalendarIcon,
  SettingsIcon,
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
          <span>Profile</span>
        </Link>
        <Link
          href="/profile/pets"
          className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
            pathname === '/profile/pets'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          <SettingsIcon className="h-5 w-5" />
          <span>pets</span>
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
          <span>Reservations</span>
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
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default ProfileSideBar;
