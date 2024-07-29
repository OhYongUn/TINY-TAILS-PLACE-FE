import {NextApiRequest, NextApiResponse} from "next";
import apiClient from "@app/app/lib/apiClient";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// TypeScript에서 API 응답을 위한 타입 정의
interface LoginResponse {
  token: string;
  user: any;  // 구체적인 유저 타입이 정의되어 있다면 그 타입을 사용하세요.
}

// useLogin 함수에 반환 타입 적용
export async function useLogin(data: { email: string; password: string }): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, data);
    if (response.data) {
      return {
        token: response.data.token,
        user: response.data.user
      };
    } else {
      throw new Error('No data received');
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Login failed: ${error.response.data.message}`);
    } else {
      throw new Error('Internal Server Error');
    }
  }
}
