import axios from 'axios';
import {  LoginData, LoginResponse, SignUpData, SignUpResponse } from "@app/interface/auth/auth";
import {ApiResponse} from "@app/interface/ApiResponse";

async function apiRequest<T>(url: string, data: any): Promise<T> {
  try {
    const response = await axios.post<ApiResponse<T>>(url, data);
    if (response.data.success) {
      return response.data.data!;
    } else {
      throw new Error(response.data.error || 'Request failed');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Request failed');
    }
    throw error;
  }
}

export async function useLogin(data: LoginData): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/api/auth/login', data);
}

export async function useSignUp(data: SignUpData): Promise<SignUpResponse> {
  return apiRequest<SignUpResponse>('/api/auth/signUp', data);
}
