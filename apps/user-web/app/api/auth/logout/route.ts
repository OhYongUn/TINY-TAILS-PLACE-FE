import { NextRequest, NextResponse } from 'next/server';
import { apiRequest } from '@app/interface/ApiResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required for logout' },
        { status: 400 },
      );
    }
    const response = await apiRequest<null>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      'POST',
      { email: body.email },
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    const errorData = error.response?.data || {};
    return NextResponse.json(errorData, {
      status: errorData.statusCode || 500,
    });
  }
}
