import axios from 'axios';
import {LoginData, LoginResponse, LoginResponseData, SignUpData, SignUpResponse} from "@app/interface/auth/auth";
import {ApiErrorResponse, ApiResponse, ApiSuccessResponse} from "@app/interface/ApiResponse";

async function apiRequest<T>(url: string, data: any): Promise<ApiResponse<T>> {
  try {
    const response = await axios.post<ApiSuccessResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiErrorResponse;
    }
    return {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      message: 'An unexpected error occurred',
      path: url
    };
  }
}

export async function useLogin(data: LoginData): Promise<ApiResponse<LoginResponseData>> {
  return apiRequest<LoginResponseData>('/api/auth/login', data);
}

export async function useSignUp(data: SignUpData): Promise<ApiResponse<SignUpResponse>> {
  return apiRequest<SignUpResponse>('/api/auth/signUp', data);
}
