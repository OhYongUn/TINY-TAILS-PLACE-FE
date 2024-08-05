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
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      numPets: parseInt(searchParams.get('numPets') || '0', 10),
    };
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/rooms/search`;
    const response = await axios.get<ApiResponse<SearchRoomResponse>>(fullUrl, {
      params,
    });
    // const response = await authenticatedApiRequest<SearchRoomResponse>(
    //   'get',
    //   `${process.env.NEXT_PUBLIC_API_URL}/rooms/search`,
    //   { params },
    // );
    console.log('response', response);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error searching rooms:', error.response);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    const statusCode = error.response?.status || 500;

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode },
    );
  }
}
