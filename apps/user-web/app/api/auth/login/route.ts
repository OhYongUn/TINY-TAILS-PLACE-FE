import { NextRequest, NextResponse } from 'next/server';
import { LoginResponseData } from '@app/interface/auth/authTypes';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';

export async function POST(request: NextRequest) {
  try {
    console.log('server!!!!!!!!!!!!!!!');
    const body = await request.json();
    const response = await apiRequest<LoginResponseData>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
          message: '서버 내부 오류가 발생했습니다.',
        },
      } as ApiResponse<LoginResponseData>,
      { status: 500 },
    );
  }
}
