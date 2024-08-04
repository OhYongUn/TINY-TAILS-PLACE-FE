import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {ApiResponse, LogoutResponseData} from "@app/interface/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required for logout' }, { status: 400 });
    }
    const response = await axios.post<ApiResponse<LogoutResponseData>>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      { email: body.email }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    const errorData = error.response?.data || {};
    return NextResponse.json(errorData, { status: errorData.statusCode || 500 });
  }
}
