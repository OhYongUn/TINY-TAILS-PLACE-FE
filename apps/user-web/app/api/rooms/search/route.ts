import { NextRequest, NextResponse } from 'next/server';
import {
  SearchRoomParams,
  SearchRoomResponse,
} from '@app/interface/rooms/roomType';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params: SearchRoomParams = {
    checkInDate: searchParams.get('checkIn') || '',
    checkOutDate: searchParams.get('checkOut') || '',
  };

  try {
    const response = await apiRequest<SearchRoomResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/available?checkInDate=${params.checkInDate}&checkOutDate=${params.checkOutDate}`,
      'GET',
    );
    console.log('sever', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error searching rooms:', error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        data: null,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        },
      } as ApiResponse<null>,
      { status: 500 },
    );
  }
}
