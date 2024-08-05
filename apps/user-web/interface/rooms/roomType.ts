// roomTypes.ts

import { ApiResponse } from '@app/interface/ApiResponse';

export interface SearchRoomParams {
  checkIn: string; // ISO 8601 형식의 날짜 문자열
  checkOut: string; // ISO 8601 형식의 날짜 문자열
  numPets: number;
}

export interface Room {
  id: number;
  name: string;
  type: string;
  description: string;
  capacity: number;
  price: number;
  size: number;
  imageUrls: string[];
  available: boolean;
}
export type SearchRoomResponse = ApiResponse<Room[]>;
