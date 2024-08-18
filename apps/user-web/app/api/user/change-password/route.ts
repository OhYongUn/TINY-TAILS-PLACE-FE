import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';
import { UpdateUserResponse } from '@app/interface/user/user';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const clientToken = request.headers.get('Client-Authorization');

    if (!clientToken) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          data: null,
          error: {
            code: 'UNAUTHORIZED',
            message: '인증 토큰이 필요합니다.',
          },
        } as ApiResponse<null>,
        { status: 401 },
      );
    }

    const response = await apiRequest<UpdateUserResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
      'PUT',
      body,
      true,
      { headers: { Authorization: `Bearer ${clientToken}` } },
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        data: null,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '회원정보 수정 중 서버 내부 오류가 발생했습니다.',
        },
      } as ApiResponse<null>,
      { status: 500 },
    );
  }
}
