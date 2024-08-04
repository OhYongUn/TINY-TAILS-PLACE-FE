import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
    return NextResponse.json(
      { success: true, data: response.data },
      { status: response.status }
    );
  } catch (error: any) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.response?.data?.message || 'An error occurred during sign up'
      },
      { status: error.response?.status || 500 }
    );
  }
}
