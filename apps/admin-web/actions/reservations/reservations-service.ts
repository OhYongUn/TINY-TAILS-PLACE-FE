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
export async function fetchReservations(params: {
  fromDate?: string;
  toDate?: string;
  searchOption?: string;
  searchQuery?: string;
  sortOption?: string;
  page: number;
  pageSize: number;
  status?: string;
}) {
  const queryParams = new URLSearchParams({
    ...(params.fromDate && { fromDate: params.fromDate }),
    ...(params.toDate && { toDate: params.toDate }),
    ...(params.searchOption && { searchOption: params.searchOption }),
    ...(params.searchQuery && { searchQuery: params.searchQuery }),
    ...(params.sortOption && { sortOption: params.sortOption }),
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
  });
  if (params.status) {
    queryParams.set('status', params.status);
  }
  console.log('queryParams', queryParams);
  try {
    const response = await api.get<any>(`admin-bookings?${queryParams}`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch reservations');
    }
  } catch (err: any) {
    console.error('Error fetching reservations:', err);
    throw new Error(err.message || 'An unexpected error occurred');
  }
}
