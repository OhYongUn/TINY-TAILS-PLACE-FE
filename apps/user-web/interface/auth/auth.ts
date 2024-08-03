import { User } from "@app/interface/user/user";
import {ApiResponse} from "@app/interface/ApiResponse";

// 기본 API 응답 인터페이스


// 로그인 관련 인터페이스
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

// 회원가입 관련 인터페이스
export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignUpResponseData {
  user: User;
  message: string;
}

export type SignUpResponse = ApiResponse<SignUpResponseData>;
