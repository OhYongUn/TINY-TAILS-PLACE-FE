// roomTypes.ts

import { ApiResponse } from '@app/interface/ApiResponse';

export interface SearchRoomParams {
  checkInDate: string; // ISO 8601 형식의 날짜 문자열
  checkOutDate: string; // ISO 8601 형식의 날짜 문자열
}

export interface Room {
  id: number;
  name: string;
  class: 'STANDARD' | 'DELUXE' | 'SUITE';
  description: string;
  capacity: number;
  size: number;
  imageUrls: string[];
  availableCount: number;
  availableRoomDetails: RoomDetail[];
  price: number;
}

export interface RoomDetail {
  id: number;
  roomNumber: string;
}
export type SearchRoomResponse = ApiResponse<Room[]>;
