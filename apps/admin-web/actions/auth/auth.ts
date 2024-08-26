'use server';

import { cookies } from 'next/headers';
import api from '@app/utils/api';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  // 필요한 다른 필드들 추가
}

function setSecureCookie(name: string, value: string, expirationTime: number) {
  cookies().set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(expirationTime * 1000),
    path: name === 'refreshToken' ? '/auth/refresh-token' : '/', // refreshToken의 경우 경로 제한
  });
}

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { success: false, error: 'Invalid email or password' };
  }

  try {
    const response = await api.post('/auth/admin/login', { email, password });

    const { data } = response;
    if (data.success) {
      const accessTokenPayload = jwtDecode<JwtPayload>(data.data.accessToken);
      const refreshTokenPayload = jwtDecode<JwtPayload>(data.data.refreshToken);

      setSecureCookie(
        'accessToken',
        data.data.accessToken,
        accessTokenPayload.exp,
      );
      setSecureCookie(
        'refreshToken',
        data.data.refreshToken,
        refreshTokenPayload.exp,
      );

      return {
        success: true,
        user: data.data.user,
        roles: data.data.roles,
      };
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function logout() {
  try {
    await api.post('/auth/admin/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  return { success: true };
}

export async function getCurrentUser() {
  try {
    const accessToken = cookies().get('accessToken');
    if (!accessToken) {
      return null; // 토큰이 없으면 사용자 정보를 가져올 수 없음
    }

    const response = await api.get('/auth/admin');
    const { data } = response;
    return { user: data.data.user, roles: data.data.roles };
  } catch (error: any) {
    console.error('Get user error:', error);
    if (error.response && error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우
      cookies().delete('accessToken');
      return null;
    }
    throw error; // 다른 에러는 상위로 전파
  }
}

export async function refreshAccessToken() {
  try {
    const refreshToken = cookies().get('refreshToken');
    if (!refreshToken) {
      return { success: false, error: 'No refresh token available' };
    }

    const response = await api.post('/auth/refresh', {
      refreshToken: refreshToken.value,
    });
    const { data } = response;

    if (data.success) {
      const accessTokenPayload = jwtDecode<JwtPayload>(data.data.accessToken);
      setSecureCookie(
        'accessToken',
        data.data.accessToken,
        accessTokenPayload.exp,
      );

      return { success: true };
    } else {
      return { success: false, error: data.error || 'Token refresh failed' };
    }
  } catch (error) {
    console.error('Token refresh error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during token refresh',
    };
  }
}
