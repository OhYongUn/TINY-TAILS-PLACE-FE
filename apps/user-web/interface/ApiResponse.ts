export interface ApiErrorResponse {
  success: false; // success 프로퍼티 추가
  statusCode: number;
  timestamp: string;
  message: string;
  path: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  statusCode: number; // statusCode 추가
}
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
