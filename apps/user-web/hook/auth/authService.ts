import { useState } from 'react';
import { User } from '@app/interface/user/user';
import { apiRequest, useApiData } from '@app/interface/ApiResponse';
import useUserStore from '@app/store/userStore';
import { LogoutResponseData } from '@app/interface/auth/authTypes';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}
interface logoutData {
  email: string;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<LoginResponseData>(
        '/api/auth/login',
        'POST',
        data,
      );
      const { data: loginData, error: apiError } = useApiData(response);

      if (loginData) {
        const { user, accessToken, refreshToken } = loginData;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(user);
        return { success: true, user };
      } else {
        setError(apiError?.message || '로그인에 실패했습니다.');
        return { success: false, error: apiError?.message };
      }
    } catch (err) {
      setError('로그인 중 예기치 못한 오류가 발생했습니다.');
      return {
        success: false,
        error: '로그인 중 예기치 못한 오류가 발생했습니다.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export function useLogout() {
  const { clearUser } = useUserStore();

  const logout = async (data: logoutData) => {
    try {
      const response = await apiRequest<null>('/api/auth/logout', 'POST', data);
      const { data: responseData, error: apiError } = useApiData(response);

      if (apiError) {
        return {
          success: false,
          error: apiError.message,
        };
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearUser();
      return {
        success: true,
      };
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearUser(); // 유저 정보를 클리어
      return {
        success: false,
        error: '',
      };
    }
  };

  return { logout };
}
