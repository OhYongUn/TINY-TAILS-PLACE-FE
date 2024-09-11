import { DateRange } from 'react-day-picker';

export interface SearchParams {
  searchQuery: string;
  searchOption: string;
  sortOption: string;
  pageSize: number;
  currentPage: number;
  dateRange: DateRange | undefined;
}

export interface searchResponse<T> {
  success: boolean;
  statusCode: number;
  data: {
    list: T[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
  error: string | null;
}
