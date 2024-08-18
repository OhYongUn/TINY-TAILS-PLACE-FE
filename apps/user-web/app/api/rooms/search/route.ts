import { NextRequest, NextResponse } from 'next/server';
import {
  SearchRoomParams,
  SearchRoomResponse,
} from '@app/interface/rooms/roomType';
import { apiRequest, ApiResponse } from '@app/interface/ApiResponse';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params: SearchRoomParams = {
    checkInDate: searchParams.get('checkInDate') || '',
    checkOutDate: searchParams.get('checkOutDate') || '',
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await apiRequest<SearchRoomResponse>(
      `${apiUrl}/rooms/available`,
      'GET',
      params,
      false,
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
          message: 'An unexpected error occurred while searching for rooms',
        },
      } as ApiResponse<null>,
      { status: 500 },
    );
  }
}
