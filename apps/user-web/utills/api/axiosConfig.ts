import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import useUserStore from '@app/store/userStore';

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

$axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useUserStore.getState().getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    console.log('interceptors.response');
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useUserStore.getState().getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        useUserStore.getState().setTokens(accessToken, newRefreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return $axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().clearUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default $axios;
