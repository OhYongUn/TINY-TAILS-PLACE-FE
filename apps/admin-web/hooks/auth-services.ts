import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@app/store/auth-store';
import api from '@app/utils/api';
import { SuccessResponse } from '@app/types/api';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  admin: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAdmin, clearAdmin } = useAuthStore();
  const router = useRouter();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<SuccessResponse<LoginResponse>>(
        '/auth/admin/login',
        { email, password },
      );
      if (response.data.success) {
        const { accessToken, refreshToken, admin } = response.data.data;
        setAdmin(admin, accessToken, refreshToken);
        router.push('/');
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    clearAdmin();
    router.push('/login');
  };

  return { loginUser, logoutUser, loading, error };
};
