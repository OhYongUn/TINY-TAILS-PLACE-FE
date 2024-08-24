'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUserStore from '@app/store/userStore';
import LoginModal from '@app/app/(home)/(auth)/loginModal';

interface AuthContextType {
  showLoginModal: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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
  const { user, isLoggedIn, getAccessToken, initializeAuth } = useUserStore();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  const showLoginModal = () => {
    setIsLoginOpen(true);
  };

  useEffect(() => {
    const checkAuth = () => {
      if (!user && protectedRoutes.includes(pathname)) {
        router.push('/');
        showLoginModal();
      }
    };

    checkAuth();
  }, [pathname, router]);

  return (
    <AuthContext.Provider
      value={{ showLoginModal, isAuthenticated: isLoggedIn }}
    >
      {children}
      <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
    </AuthContext.Provider>
  );
};
