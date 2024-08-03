import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, body);
    return NextResponse.json(
      { success: true, data: response.data },
      { status: response.status }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || 'An error occurred during login'
      },
      { status: error.response?.status || 500 }
    );
  }
}
