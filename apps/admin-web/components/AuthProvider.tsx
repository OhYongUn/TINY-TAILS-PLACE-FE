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
      // 인증되지 않은 사용자가 비공개 경로에 접근하려 할 때만 리다이렉트
      router.push('/login');
    } else if (isAuthenticated && publicRoutes.includes(pathname)) {
      // 인증된 사용자가 공개 경로(예: 로그인 페이지)에 접근하려 할 때 홈으로 리다이렉트
      router.push('/');
    }
    // 역할 기반 접근 제어는 주석 처리된 상태로 유지
    /*
    else if (isAuthenticated) {
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
    }
    */
  }, [isAuthenticated, user, roles, router, pathname]);

  return <>{children}</>;
}
