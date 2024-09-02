import { create } from 'zustand';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import {
  fetchReservations,
  getReservationDetail,
  updateReservationStatus,
} from '@app/actions/reservations/reservations-service';
import {
  ReservationDetailDto,
  ReservationDetailType,
} from '@app/types/reservation/type';

interface ReservationState {
  reservations: any[];
  totalPages: number;
  loading: boolean;
  dateRange: DateRange | undefined;
  searchOption: string;
  searchQuery: string;
  sortOption: string;
  status: string;
  pageSize: string;
  currentPage: number;
  setDateRange: (range: DateRange | undefined) => void;
  setSearchOption: (option: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: string) => void;
  setStatus: (status: string) => void;
  setPageSize: (size: string) => void;
  setCurrentPage: (page: number) => void;
  fetchReservationList: () => Promise<void>;
  isDialogOpen: boolean;
  selectedReservationId: string | null;
  reservationDetail: ReservationDetailDto | null;
  selectedDetailType: ReservationDetailType | null;
  updateStatus: (
    action: string,
    id: string,
  ) => Promise<{ success: boolean; message?: string }>;
  updateFilters: () => void;
  openDialog: (id: string, detailType: ReservationDetailType) => void;
  closeDialog: () => void;
  fetchReservationDetail: (id: string) => Promise<void>;
}

export const useReservationStore = create<ReservationState>((set, get) => ({
  reservations: [],
  totalPages: 1,
  loading: false,
  dateRange: {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  },
  searchOption: '',
  searchQuery: '',
  sortOption: 'createdAt_desc',
  status: '',
  pageSize: '10',
  currentPage: 1,
  isDialogOpen: false,
  selectedReservationId: null,
  reservationDetail: null,
  selectedDetailType: null,
  setDateRange: (range) => set({ dateRange: range }),
  setSearchOption: (option) => set({ searchOption: option }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortOption: (option) => set({ sortOption: option }),
  setStatus: (status) => set({ status }),
  setPageSize: (size) => set({ pageSize: size }),
  setCurrentPage: (page) => set({ currentPage: page }),
  fetchReservationList: async () => {
    const {
      dateRange,
      searchOption,
      searchQuery,
      sortOption,
      status,
      pageSize,
      currentPage,
    } = get();
    set({ loading: true });
    try {
      const data = await fetchReservations({
        fromDate: dateRange?.from
          ? format(dateRange.from, 'yyyy-MM-dd')
          : undefined,
        toDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
        searchOption: searchOption || undefined,
        searchQuery: searchQuery || undefined,
        sortOption: sortOption || 'createdAt_desc',
        page: currentPage,
        pageSize: parseInt(pageSize),
        status: status || undefined,
      });
      set({ reservations: data.bookings, totalPages: data.totalPages });
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      set({ loading: false });
    }
  },
  updateStatus: async (action, id) => {
    try {
      const result = await updateReservationStatus(action, id);
      if (result.success) {
        get().fetchReservationList();
      }
      return result;
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },
  updateFilters: () => {
    get().fetchReservationList();
  },
  openDialog: (id, detailType) => {
    set({
      isDialogOpen: true,
      selectedReservationId: id,
      selectedDetailType: detailType,
    });
    get().fetchReservationDetail(id);
  },
  closeDialog: () =>
    set({
      isDialogOpen: false,
      selectedReservationId: null,
      reservationDetail: null,
      selectedDetailType: null,
    }),
  fetchReservationDetail: async (id: string) => {
    try {
      const { selectedDetailType } = get();
      let types: Array<'all' | ReservationDetailType> | undefined;

      if (selectedDetailType) {
        if (selectedDetailType === 'payments') {
          types = ['payments', 'bookingDetails'];
        } else if (selectedDetailType === 'bookingDetails') {
          types = ['bookingDetails', 'user', 'roomDetail'];
        } else if (selectedDetailType == 'statusHistories') {
          types = ['bookingDetails', 'statusHistories'];
        }
      } else {
        types = ['all'];
      }

      const response = await getReservationDetail(id, types);
      if (response.success) {
        set({ reservationDetail: response.data });
      } else {
        console.error('Failed to fetch reservation detail:', response.error);
      }
    } catch (error) {
      console.error('Failed to fetch reservation detail:', error);
    }
  },
}));
