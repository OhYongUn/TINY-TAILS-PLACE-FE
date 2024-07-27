"use server";

import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";
import { AUTHENTICATION_COOKIE } from "./auth-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // 환경 변수에서 API_URL을 가져옵니다.

export default async function login(formData: any) {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        setAuthCookie(res);
        redirect("/");
    } catch (error) {
        return { error: getErrorMessage(error.response.data) };
    }
}

const setAuthCookie = (response: any) => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
        const token = setCookieHeader[0].split(";")[0].split("=")[1];
        const decodedToken: { exp: number } = jwtDecode(token);
        cookies().set({
            name: AUTHENTICATION_COOKIE,
            value: token,
            secure: true,
            httpOnly: true,
            expires: new Date(decodedToken.exp * 1000),
        } as any); // 타입 강제 변환
    }
};
