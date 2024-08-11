import { NextRequest, NextResponse } from 'next/server';
import { SignUpResponseData } from '@app/interface/auth/authTypes';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiRequest<SignUpResponseData>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      'POST',
      body,
    );
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        data: null,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '회원가입 중 서버 내부 오류가 발생했습니다.',
        },
      } as ApiResponse<SignUpResponseData>,
      { status: 500 },
    );
  }
}
