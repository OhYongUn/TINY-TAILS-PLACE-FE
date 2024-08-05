import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ApiResponse } from '@app/interface/ApiResponse';
import { LoginResponseData } from '@app/interface/auth/authTypes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axios.post<ApiResponse<LoginResponseData>>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      body,
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    const errorData = error.response?.data || {};
    return NextResponse.json(errorData, {
      status: errorData.statusCode || 500,
    });
  }
}
