import axios from 'axios';
import {
  LoginData,
  LoginResponseData,
  LogoutResponseData,
  SignUpData,
  SignUpResponseData,
} from '@app/interface/auth/auth';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
} from '@app/interface/ApiResponse';

export async function useLogin(
  data: LoginData,
): Promise<ApiResponse<LoginResponseData>> {
  return apiRequest<LoginResponseData>('/api/auth/login', data);
}

export async function useSignUp(
  data: SignUpData,
): Promise<ApiResponse<SignUpResponseData>> {
  return apiRequest<SignUpResponseData>('/api/auth/signup', data);
}

export async function useLogout(
  email: string,
): Promise<ApiResponse<LogoutResponseData>> {
  if (!email) {
    throw new Error('Email is required for logout');
  }
  return apiRequest<LogoutResponseData>('/api/auth/logout', { email });
}

async function apiRequest<T>(url: string, data: any): Promise<ApiResponse<T>> {
  try {
    const response = await axios.post<ApiSuccessResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
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
