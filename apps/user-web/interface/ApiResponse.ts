export interface ApiErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  path: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
