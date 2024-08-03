'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '../store/userStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
