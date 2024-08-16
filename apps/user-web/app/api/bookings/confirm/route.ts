import { NextRequest, NextResponse } from 'next/server';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';
import { ConfirmBookingResponseDto } from '@app/interface/payment/paymentInterface';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await apiRequest<ConfirmBookingResponseDto>(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/confirm`,
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
      } as ApiResponse<ConfirmBookingResponseDto>,
      { status: 500 },
    );
  }
}
