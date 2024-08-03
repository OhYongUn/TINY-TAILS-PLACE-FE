import {NextApiRequest, NextApiResponse} from "next";
import apiClient from "@app/app/lib/apiClient";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// TypeScript에서 API 응답을 위한 타입 정의
interface LoginResponse {
  accessToken: string;
  refreshToken  : string;
  user: any;  // 구체적인 유저 타입이 정의되어 있다면 그 타입을 사용하세요.
}
interface SignUpData {
  email: string;
  password: string;
  name: string;
  // 필요한 다른 필드들...
}
interface  loginData{
  email: string;
  password: string;
}

interface SignUpResponse {
  user: any;  // 구체적인 유저 타입이 정의되어 있다면 그 타입을 사용하세요.
  message: string;
}

export async function useSignUp(data: SignUpData): Promise<SignUpResponse> {
  try {
    console.log('2apiUrl',apiUrl);
    const response = await axios.post(`${apiUrl}/auth/register`, data);
    if (response.data) {
      return {
        user: response.data.user,
        message: 'Sign up successful'
      };
    } else {
      throw new Error('No data received');
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Sign up failed: ${error.response.data.message}`);
    } else {
      throw new Error('Internal Server Error');
    }
  }
}

// useLogin 함수에 반환 타입 적용
export async function useLogin(data: loginData): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, data);
    if (response.data) {
      return {
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } else {
      throw new Error('No data received from login');
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Login failed: ${error.response.data.message}`);
    } else {
      throw new Error('Internal Server Error');
    }
  }
}
