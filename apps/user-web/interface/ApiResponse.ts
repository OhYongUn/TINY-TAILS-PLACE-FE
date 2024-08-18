import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T | null;
  error: { code: string; message: string } | null;
}

export async function apiRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  isAuth: boolean = false,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((config?.headers as Record<string, string>) || {}),
    };

    if (isAuth) {
      let token: string | null = null;
      if (typeof window === 'undefined') {
        // 서버 사이드에서 실행 중
        if (config?.headers?.['Authorization']) {
          token = config.headers['Authorization'].replace('Bearer ', '');
        }
      } else {
        // 클라이언트 사이드에서 실행 중
        token = localStorage.getItem('accessToken');
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('Token not found for authenticated request');
      }
    }

    let axiosConfig: AxiosRequestConfig = {
      url,
      method,
      headers,
      ...config,
    };

    // GET 요청의 경우 data를 params로 전달
    if (method === 'GET' && data) {
      axiosConfig.params = data;
    } else if (method !== 'GET' && data) {
      // POST, PUT, DELETE 요청의 경우 data를 요청 본문으로 전달
      axiosConfig.data = data;
    }

    const response = await axios(axiosConfig);

    return response.data as ApiResponse<T>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<T>>;

      if (axiosError.response) {
        console.error('Response Error:', axiosError.response.data);
        return axiosError.response.data;
      } else if (axiosError.request) {
        console.error('Request Error: No response received');
        return {
          success: false,
          statusCode: 0,
          data: null,
          error: {
            code: 'NO_RESPONSE',
            message: 'No response was received from the server',
          },
        };
      }
    }

    console.error('Unknown Error:', error);
    return {
      success: false,
      statusCode: 500,
      data: null,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
      },
    };
  }
}

export function useApiData<T>(apiResponse: ApiResponse<T>) {
  if (apiResponse.success) {
    return { success: true, data: apiResponse.data, error: null };
  } else {
    return { success: false, data: null, error: apiResponse.error };
  }
}
