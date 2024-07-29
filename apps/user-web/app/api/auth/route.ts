import { NextRequest, NextResponse } from 'next/server';
import { useLogin } from '@app/app/lib/auth/auth';
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
      const { token, user } = await useLogin(body.data);

    // 쿠키 설정
    setAuthCookie(token);

    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 401 });
  }
}

const setAuthCookie = (token: string) => {
  const decodedToken: { exp: number } = jwtDecode(token);

  cookies().set('Authentication', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(decodedToken.exp * 1000),
    sameSite: 'strict',
    path: '/'
  });

};

