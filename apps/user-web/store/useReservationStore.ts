import create from 'zustand';
import { BookingQuery, Bookings } from '@app/interface/bookings/reservation';
import {
  apiRequest,
  ApiResponse,
  useApiData,
} from '@app/interface/ApiResponse';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Pagination {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface ReservationState {
  reservations: Bookings[];
  isLoading: boolean;
  error: { code: string; message: string } | null;
  pagination: Pagination | null;
  fetchReservations: (data: BookingQuery, userId: number) => Promise<void>;
}

interface BookingsResponseData {
  bookings: Bookings[];
  pagination: Pagination;
}

export const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],
  isLoading: false,
  error: null,
  pagination: null,
  fetchReservations: async (searchParams: BookingQuery, userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const url = `${apiUrl}/bookings/${userId}`;
      const response = await apiRequest<BookingsResponseData>(
        url,
        'GET',
        searchParams,
        true, // isAuth를 true로 설정, 필요에 따라 조정
      );
      const { success, data, error } = useApiData(response);

      if (success && data && data.bookings) {
        set({
          reservations: data.bookings,
          pagination: data.pagination,
          error: null,
        });
      } else {
        set({
          error: error || {
            code: 'UNKNOWN',
            message: '예약 정보를 불러오는 데 실패했습니다.',
          },
          pagination: null,
        });
      }
    } catch (err) {
      set({
        error: {
          code: 'UNEXPECTED',
          message: '예약 정보를 불러오는 중 예기치 못한 오류가 발생했습니다.',
        },
        pagination: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
