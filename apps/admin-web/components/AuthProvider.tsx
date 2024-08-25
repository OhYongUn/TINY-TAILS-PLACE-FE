'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@app/store/auth-store';

type AuthProviderProps = {
  children: React.ReactNode;
};

const publicRoutes = ['/login', '/register', '/forgot-password'];
const roleBasedRoutes: Record<string, string[]> = {
  admin: ['/admin', '/management'],
  user: ['/dashboard', '/bookings'],
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
      router.push('/login');
    }

    if (isAuthenticated && user) {
      const allowedRoutes = roleBasedRoutes[user.role] || [];
      if (
        !allowedRoutes.some((route) => currentPath.startsWith(route)) &&
        !publicRoutes.includes(currentPath)
      ) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  return <>{children}</>;
}
