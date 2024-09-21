import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { SearchResponse, SearchParams } from '@app/types/search';

interface UseSearchResult<T> {
  data: T[];
  isLoading: boolean;
  error: unknown;
  searchParams: SearchParams;
  updateSearchParams: (newParams: Partial<SearchParams>) => void;
  performSearch: () => void;
  refreshList: () => void;
  totalPages: number;
  currentPage: number;
  totalCount: number;
  resetSearchParams: () => void;
}

export function useSearch<T>(
  queryKey: string,
  queryFn: (params: SearchParams) => Promise<SearchResponse<T>>,
): UseSearchResult<T> {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchQuery: '',
    searchOption: '',
    sortOption: '',
    pageSize: '10',
    currentPage: 1,
    dateRange: {
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    },
    departmentId: '',
    isActive: true,
  });

  const { data, isLoading, error } = useQuery<SearchResponse<T>>({
    queryKey: [queryKey, searchParams],
    queryFn: () => queryFn(searchParams),
    staleTime: 5 * 60 * 1000, // 5분
  });

  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const performSearch = useCallback(() => {
    updateSearchParams({ currentPage: 1 });
  }, [updateSearchParams]);

  const refreshList = useCallback(() => {
    queryClient.invalidateQueries([queryKey]);
  }, [queryClient, queryKey]);
  const resetSearchParams = useCallback(() => {
    setSearchParams({
      searchQuery: '',
      searchOption: '',
      sortOption: '',
      pageSize: '10',
      currentPage: 1,
      dateRange: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
      departmentId: '',
      isActive: true,
    });
  }, []);
  return {
    data: data?.data.list || [], // 안전하게 기본값 설정
    totalPages: data?.data.totalPages || 1,
    currentPage: data?.data.currentPage || 1,
    totalCount: data?.data.totalCount || 0,
    isLoading,
    error: data?.error || error,
    searchParams,
    updateSearchParams,
    performSearch,
    refreshList,
    resetSearchParams,
  };
}
