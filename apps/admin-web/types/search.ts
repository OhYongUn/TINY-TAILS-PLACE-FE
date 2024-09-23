import { DateRange } from 'react-day-picker';

export interface SearchParams {
  searchQuery: string;
  searchOption: string;
  sortOption: string;
  pageSize: string;
  currentPage: number;
  dateRange: DateRange | undefined;
  isActive?: Boolean;
  departmentId?: string | null;
}

export interface SearchResponse<T> {
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
