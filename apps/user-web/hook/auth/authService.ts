import { useState } from 'react';
import {
  UpdateUserData,
  UpdateUserResponse,
  User,
} from '@app/interface/user/user';
import { apiRequest, useApiData } from '@app/interface/ApiResponse';
import useUserStore from '@app/store/userStore';
import { SignUpData, SignUpResponseData } from '@app/interface/auth/authTypes';

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
export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (data: SignUpData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<SignUpResponseData>(
        '/api/auth/signup',
        'POST',
        data,
      );
      const { data: SignUpResponseData, error: apiError } =
        useApiData(response);
      if (response.success) {
        return {
          success: true,
          message: '회원가입에 성공하셧습니다.',
        };
      } else {
        setError(response.error?.message || '회원가입에 실패했습니다.');
        return { success: false, error: response.error?.message };
      }
    } catch (err) {
      const errorMessage = '회원가입 중 예기치 못한 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser: updateStoreUser, getAccessToken } = useUserStore();

  const updateUser = async (data: UpdateUserData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      const response = await apiRequest<UpdateUserResponse>(
        '/api/user/update',
        'PUT',
        data,
        true,
        { headers: { 'Client-Authorization': token } },
      );
      const { data: updateData, error: apiError } = useApiData(response);

      if (updateData) {
        console.log('updateData', updateData);

        //updateStoreUser(updateData);
        return {
          success: true,
          message: '사용자 정보가 성공적으로 업데이트되었습니다.',
        };
      } else {
        const errorMessage =
          response.error?.message || '사용자 정보 업데이트에 실패했습니다.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage =
        '사용자 정보 업데이트 중 예기치 못한 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
}
