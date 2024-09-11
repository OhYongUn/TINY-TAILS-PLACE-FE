// searchStore.ts
import { create } from 'zustand';
import { DateRange } from 'react-day-picker';

interface SearchState {
  loading: boolean;
  setLoading: (option: boolean) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  searchOption: string;
  setSearchOption: (option: string) => void;

  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;

  status: string;
  setStatus: (status: string) => void;

  sortOption: string;
  setSortOption: (option: string) => void;

  totalPages: number;
  setTotalPages: (pages: number) => void;

  pageSize: string;
  setPageSize: (size: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  searchOption: '',
  setSearchOption: (option) => set({ searchOption: option }),

  dateRange: {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  },
  setDateRange: (range) => set({ dateRange: range }),

  status: '',
  setStatus: (status) => set({ status: status }),

  sortOption: '',
  setSortOption: (option) => set({ sortOption: option }),

  totalPages: 1,
  setTotalPages: (pages) => set({ totalPages: pages }),

  pageSize: '10',
  setPageSize: (size) => set({ pageSize: size }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));
