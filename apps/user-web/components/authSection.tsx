import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import {
  UserIcon,
  CalendarIcon,
  LogOutIcon,
} from '@repo/ui/components/ui/icons';

import Link from 'next/link';
import { useLogout } from '@app/hook/auth/authService';
import useUserStore from '@app/store/userStore';
import { ModalInterface } from '@app/interface/compontes/interface';
interface AuthSectionProps {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
}
const AuthSection = ({ setIsLoginOpen }: AuthSectionProps) => {
  const { user, isLoggedIn, clearUser } = useUserStore();

  const { logout } = useLogout(); // useLogout 훅을 호출하여 logout 함수를 가져옴
  const handleLogout = async () => {
    try {
      if (!user?.email) {
        throw new Error('User email not found');
      }
      await logout({ email: user.email }); // logout 함수에 email을 전달
    } catch (error: any) {}
  };
  if (!isLoggedIn) {
    return (
      <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
        Login
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4 ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.avatarUrl || '/placeholder-user.jpg'}
                alt={user?.name || 'User'}
              />
              <AvatarFallback>{user?.initials || 'U'}</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Link
              href="/my-info"
              className="flex items-center gap-2"
              prefetch={false}
            >
              <UserIcon className="h-4 w-4" />
              <span>나의 정보</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/reservations"
              className="flex items-center gap-2"
              prefetch={false}
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Reservation List</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onSelect={handleLogout}
          >
            <div className="flex items-center gap-2">
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthSection;
