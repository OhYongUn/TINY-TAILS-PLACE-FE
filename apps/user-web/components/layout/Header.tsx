'use client';

import React, { useState } from 'react';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import Link from 'next/link';
import { PawPrintIcon, SearchIcon } from '@repo/ui/components/ui/icons';
import LoginModal from '../../../user-web/app/(home)/(auth)/loginModal';
import SighUpModal from '../../../user-web/app/(home)/(auth)/sighUpModal';
import useUserStore from '@app/store/userStore';
import { useLogout } from '@app/hook/auth/authService';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);
  const { user, isLoggedIn, clearUser } = useUserStore();
  const { logout } = useLogout(); // useLogout 훅을 호출하여 logout 함수를 가져옴
  const handleLogout = async () => {
    try {
      if (!user?.email) {
        throw new Error('User email not found');
      }

      const response = await logout({ email: user.email }); // logout 함수에 email을 전달

      if (response.success) {
        clearUser(); // 유저 정보를 클리어
      }
    } catch (error: any) {}
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Link href="#" prefetch={false}>
            <PawPrintIcon className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold">Tiny Tails Place</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="w-full pl-8" />
          </div>
          <Link href="/booking">
            <Button variant="secondary">Book Now</Button>
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user?.avatarUrl || '/placeholder-user.jpg'} />
                <AvatarFallback>{user?.initials || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
              Login
            </Button>
          )}
        </div>
      </header>
      <LoginModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <SighUpModal
        isSignUpOpen={isSignUpOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
    </>
  );
};

export default Header;
