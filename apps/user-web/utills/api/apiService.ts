import { isAxiosError } from 'axios';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  ApiResponse,
} from '@app/interface/ApiResponse';
import $axios from '@app/utills/api/axiosConfig';

async function authenticatedApiRequest<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
): Promise<ApiResponse<T>> {
  try {
    let response;
    switch (method) {
      case 'get':
        response = await $axios.get<ApiSuccessResponse<T>>(url, {
          params: data,
        });
        break;
      case 'post':
        response = await $axios.post<ApiSuccessResponse<T>>(url, data);
        break;
      case 'put':
        response = await $axios.put<ApiSuccessResponse<T>>(url, data);
        break;
      case 'delete':
        response = await $axios.delete<ApiSuccessResponse<T>>(url, { data });
        break;
    }
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      return error.response.data as ApiErrorResponse;
    }
    return {
      success: false,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      message: 'An unexpected error occurred',
      path: url,
    };
  }
}
