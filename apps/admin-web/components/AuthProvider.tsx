'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@app/store/auth-store';
import { getCurrentUser } from '@app/actions/auth/auth';

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
  const pathname = usePathname();
  const { isAuthenticated, user, roles, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await getCurrentUser();
      if (result) {
        setAuth(result.user, result.roles);
      } else {
        clearAuth();
      }
    };

    checkAuth();
  }, [setAuth, clearAuth]);

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/login');
    } else if (isAuthenticated) {
      router.push('/');
    }
    /*else if (isAuthenticated) {
      const userRoles = Object.keys(roles);
      const allowedRoutes = userRoles.flatMap(
        (role) => roleBasedRoutes[role] || [],
      );
      if (
        !allowedRoutes.some((route) => pathname.startsWith(route)) &&
        !publicRoutes.includes(pathname)
      ) {
        router.push('/'); // Default route after login
      }
    }*/
    /* }, [isAuthenticated, user, roles, router, pathname]);*/
  }, [isAuthenticated, user, router, pathname]);

  return <>{children}</>;
}
