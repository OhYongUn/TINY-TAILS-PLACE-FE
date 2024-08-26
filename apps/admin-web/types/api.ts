export interface CustomResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface SuccessResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message?: string;
  error: null;
}
