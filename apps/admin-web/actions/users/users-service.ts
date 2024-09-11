'use server';

import { SearchParams, searchResponse } from '@app/types/search';
import { User } from '@app/types/users/type';
import { format } from 'date-fns';
import api from '@app/utils/api';

export async function searchUsers(
  params: SearchParams,
): Promise<searchResponse<User>> {
  const {
    searchQuery,
    searchOption,
    sortOption,
    pageSize,
    currentPage,
    dateRange,
  } = params;
  const queryParams = new URLSearchParams();
  if (searchQuery) {
    queryParams.set('searchQuery', searchQuery);
  }
  if (searchOption) {
    queryParams.set('searchOption', searchOption);
  }
  if (sortOption) {
    queryParams.set('sortOption', sortOption || 'name_asc');
  }
  if (dateRange) {
    if (dateRange.to) {
      queryParams.set('toDate', dateRange.to.toString());
    }
    if (dateRange.from) {
      queryParams.set('fromDate', dateRange.from.toString());
    }
  }
  if (pageSize) {
    queryParams.set('pageSize', pageSize.toString());
  }
  if (currentPage) {
    queryParams.set('page', currentPage.toString());
  }
  try {
    const response = await api.get<searchResponse<User>>(
      `admin-users?${queryParams}`,
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch reservations');
    }
  } catch (err: any) {
    throw new Error(err.message || 'An unexpected error occurred');
  }
}
