'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUserStore from '@app/store/userStore';
import LoginModal from '@app/app/(home)/(auth)/loginModal';

interface AuthContextType {
  showLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 인증이 필요한 경로 목록
const protectedRoutes = [
  '/profile',
  '/profile/pets',
  '/profile/reservations',
  '/profile/settings',
];

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, isLoggedIn, clearUser } = useUserStore();

  const showLoginModal = () => {
    setIsLoginOpen(true);
  };

  useEffect(() => {
    if (!isLoggedIn && protectedRoutes.includes(pathname)) {
      router.push('/'); // 메인 페이지로 리다이렉트
      showLoginModal(); // 로그인 모달 표시
    }
  }, [isLoggedIn, pathname, router]);

  return (
    <AuthContext.Provider value={{ showLoginModal }}>
      {children}
      <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
    </AuthContext.Provider>
  );
};
