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
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const isServer = typeof window === 'undefined';
  const baseURL = isServer ? process.env.NEXT_PUBLIC_API_URL : '';

  try {
    const response = await axios({
      url: `${baseURL}${url}`,
      method,
      data,
      ...config,
    });

    return response.data as ApiResponse<T>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<T>>;
      if (axiosError.response) {
        // 서버에서 에러 응답을 보낸 경우
        return axiosError.response.data;
      }
    }

    // 네트워크 오류 등 예상치 못한 에러
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
