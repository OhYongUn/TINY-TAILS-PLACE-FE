export type RoomStatus = 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | string;

export interface RoomStatusDto {
  date: string;
  status: string;
}

export interface Room {
  id: number;
  roomNumber: string;
  name: string;
  bookingId: string;
  status: RoomStatusDto[];
}

export interface ReservationsResponseDto {
  success: boolean;
  statusCode: number;
  data: {
    year: number;
    month: number;
    rooms: Room[];
  };
  error: string | null;
}

export interface ReservationDetailResponseDto {
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    roomNumber: string;
    checkInDate: string;
    checkOutDate: string;
    guestName: string;
    status: string;
    // 필요한 다른 필드들...
  } | null;
  error: string | null;
}
