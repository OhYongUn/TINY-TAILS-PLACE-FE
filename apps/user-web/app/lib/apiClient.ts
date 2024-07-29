import axios from 'axios';

// 외부 API의 기본 URL과 기타 설정을 포함한 axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청 전에 실행되어 요청 헤더에 토큰을 추가
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // 더 안전한 스토리지 방법 고려 필요
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 응답 인터셉터: 응답 받기 전에 실행되어 특정 응답에 대해 사전 조치
apiClient.interceptors.response.use(response => {
  return response;  // 응답 데이터 가공 로직이 필요하면 여기에 추가
}, error => {
  if (error.response && error.response.status === 401) {
    console.log("Authentication error, redirecting to login.");
    // 예: 로그인 페이지로 리디렉트 또는 토큰 갱신 로직 추가
  }
  return Promise.reject(error);
});

export default apiClient;
