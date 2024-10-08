import { User } from '@app/interface/user/user';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface SignUpResponseData {
  user: User;
  message: string;
}

export type SignUpResponse = ApiResponse<SignUpResponseData>;

export interface LogoutResponseData {
  message: string;
}

export type LogoutResponse = ApiResponse<LogoutResponseData>;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
