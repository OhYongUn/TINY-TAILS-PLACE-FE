// 예약 상태를 위한 열거형
import { Room } from '@app/interface/rooms/roomType';

// RoomDetail 인터페이스
export interface RoomDetail {
  id: number;
  roomId: number;
  roomNumber: string;
  currentCheckIn: string | null;
  currentCheckOut: string | null;
  status: RoomStatus;
  lastCleaned: string;
  nextCleaning: string;
  createdAt: string;
  updatedAt: string;
  room: PartialRoom;
}

export interface BookingQuery {
  page?: number;
  pageSize?: number;
  status?: BookingStatus;
  dateFrom?: string;
  dateTo?: string;
  dateType?: 'checkIn' | 'checkOut';
  orderBy?: 'checkInDate' | 'checkOutDate' | 'createdAt';
  order?: 'asc' | 'desc';
}

export interface PartialRoom extends Partial<Room> {
  id: number; // 필수 필드
  name: string; // 필수 필드
  class: 'STANDARD' | 'DELUXE' | 'SUITE'; // 필수 필드
  createdAt: string;
  updatedAt: string;
}
// BookingDetails 인터페이스
export interface BookingDetails {
  id: number;
  bookingId: string;
  petCount: number;
  request: string | null;
  requestedLateCheckout: boolean;
  requestedEarlyCheckin: boolean;
  actualLateCheckout: boolean;
  actualEarlyCheckin: boolean;
}

// Reservation (Booking) 인터페이스
export interface Bookings {
  id: string;
  userId: number;
  roomDetailId: number;
  checkInDate: string;
  checkOutDate: string;
  basePrice: number;
  totalPrice: number;
  status: BookingStatus;
  cancellationDate: string | null;
  cancellationFee: number | null;
  createdAt: string;
  updatedAt: string;
  additionalFees: number;
  roomDetail: RoomDetail;
  bookingDetails: BookingDetails;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// 방 상태를 위한 열거형
export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
}
