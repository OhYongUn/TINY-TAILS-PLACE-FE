'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { PawPrintIcon, SearchIcon } from '@repo/ui/components/ui/icons';
import LoginModal from '../../../user-web/app/(home)/(auth)/loginModal';
import SighUpModal from '../../../user-web/app/(home)/(auth)/sighUpModal';
import AuthSection from '@app/components/authSection';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

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
          {/*<div className="relative w-64">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="w-full pl-8" />
          </div>*/}
          <Link href="/booking">
            <Button variant="secondary">예약하기</Button>
          </Link>
          <AuthSection setIsLoginOpen={setIsLoginOpen} />
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
