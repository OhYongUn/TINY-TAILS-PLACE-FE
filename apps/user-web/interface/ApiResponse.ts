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
  try {
    const response = await axios({
      url: url,
      method,
      data,
      ...config,
    });

    return response.data as ApiResponse<T>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<T>>;

      if (axiosError.response) {
        return axiosError.response.data;
      } else if (axiosError.request) {
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
