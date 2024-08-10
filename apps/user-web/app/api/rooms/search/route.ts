import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import {
  SearchRoomParams,
  SearchRoomResponse,
} from '@app/interface/rooms/roomType';
import { authenticatedApiRequest } from '@app/utills/api/apiService';
import { ApiResponse } from '@app/interface/ApiResponse';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params: SearchRoomParams = {
      checkInDate: searchParams.get('checkIn') || '',
      checkOutDate: searchParams.get('checkOut') || '',
    };
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/rooms/available`;
    const response = await axios.get<ApiResponse<SearchRoomResponse>>(fullUrl, {
      params,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error searching rooms:', error.responseㄴ);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    const statusCode = error.response?.status || 500;

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode },
    );
  }
}
