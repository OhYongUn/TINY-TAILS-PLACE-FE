'use server';
import api from '@app/utils/api';

interface RoomStatusDto {
  date: string;
  status: string;
}

interface Room {
  id: number;
  roomNumber: string;
  name: string;
  status: RoomStatusDto[];
}

export interface RoomStatusResponseDto {
  success: boolean;
  statusCode: number;
  data: {
    year: number;
    month: number;
    rooms: Room[];
  };
  error: string | null;
}

export async function getRoomStatus(
  year: number,
  month: number,
): Promise<RoomStatusResponseDto> {
  try {
    const response = await api.get<RoomStatusResponseDto>(
      `admin-bookings/reservation-status?year=${year}&month=${month}`,
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch room status');
    }
  } catch (err: any) {
    console.error('Error fetching room status:', err);
    return {
      success: false,
      statusCode: err.response?.status || 500,
      data: { year, month, rooms: [] },
      error: err.message || 'An unexpected error occurred',
    };
  }
}
