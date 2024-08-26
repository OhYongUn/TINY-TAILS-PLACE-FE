'use server';
import api from '@app/utils/api';
import {
  ReservationDetailResponseDto,
  ReservationsResponseDto,
} from '@app/types/reservation/type';

export async function getRoomStatus(
  year: number,
  month: number,
): Promise<ReservationsResponseDto> {
  try {
    const response = await api.get<ReservationsResponseDto>(
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

export async function getReservationDetail(
  bookingId: string,
): Promise<ReservationDetailResponseDto> {
  try {
    const response = await api.get<ReservationDetailResponseDto>(
      `admin-bookings/reservation-detail/${bookingId}`,
    );

    return response.data;
  } catch (err: any) {
    console.error('Error fetching reservation detail:', err);
    return {
      success: false,
      statusCode: err.response?.status || 500,
      data: null,
      error: err.message || 'An unexpected error occurred',
    };
  }
}
