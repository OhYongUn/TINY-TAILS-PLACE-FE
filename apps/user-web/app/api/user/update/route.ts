import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';
import { UpdateUserData } from '@app/interface/user/user';
import { SignUpResponseData } from '@app/interface/auth/authTypes'; // UpdateUserData 인터페이스 정의 필요

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('server request: ' + JSON.stringify(body));

    // 클라이언트에서 전송한 토큰 추출
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

    const response = await apiRequest<SignUpResponseData>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      'PUT',
      body,
      true,
      { headers: { Authorization: clientToken } },
    );
    console.log('server response: ' + JSON.stringify(response));
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating user:', error);
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
