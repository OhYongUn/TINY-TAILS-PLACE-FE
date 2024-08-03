import axios from 'axios';
import Cookies from 'js-cookie';

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

$axios.interceptors.request.use(config => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, { refreshToken });
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken);
        $axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        return $axios(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우, 로그아웃 처리
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        // 로그인 페이지로 리다이렉트 또는 다른 처리
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default $axios;
