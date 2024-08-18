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
        console.log('Running on server side');
        if (config?.headers?.['Authorization']) {
          token = config.headers['Authorization'].replace('Bearer ', '');
          console.log('Token from config headers:', token);
        }
      } else {
        // 클라이언트 사이드에서 실행 중
        console.log('Running on client side');
        token = localStorage.getItem('accessToken');
        console.log('Token from localStorage:', token);
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set:', headers['Authorization']);
      } else {
        console.warn('Token not found');
        throw new Error('Authentication required but token not found');
      }
    }

    console.log('Final headers:', headers);

    const response = await axios({
      url: url,
      method,
      data,
      ...config,
      headers,
    });

    console.log('API Response:', response.data);
    return response.data as ApiResponse<T>;
  } catch (error) {
    console.error('API Request Error:', error);

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

    if (
      error instanceof Error &&
      error.message === 'Authentication required but token not found'
    ) {
      console.error('Auth Error: Token not found');
      return {
        success: false,
        statusCode: 401,
        data: null,
        error: {
          code: 'AUTH_REQUIRED',
          message: 'Authentication is required for this request',
        },
      };
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
    return { data: apiResponse.data, error: null };
  } else {
    return { data: null, error: apiResponse.error };
  }
}
