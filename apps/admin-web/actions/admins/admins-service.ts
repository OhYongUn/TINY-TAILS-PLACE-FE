'use server';

import { SearchParams, SearchResponse } from '@app/types/search';
import api from '@app/utils/api';
import { Admin, AdminRegistrationData } from '@app/types/admins/type';

export async function searchAdmins(
  params: SearchParams,
): Promise<SearchResponse<Admin>> {
  const {
    searchQuery,
    searchOption,
    sortOption,
    pageSize,
    currentPage,
    dateRange,
    isActive,
    departmentId,
  } = params;

  const queryParams = new URLSearchParams();

  if (searchQuery) {
    queryParams.set('searchQuery', searchQuery);
  }
  if (searchOption) {
    queryParams.set('searchOption', searchOption);
  }
  if (sortOption) {
    queryParams.set('sortOption', sortOption || 'createdAt_desc');
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
  if (isActive !== undefined) {
    queryParams.set('isActive', isActive.toString());
  }
  if (departmentId) {
    queryParams.set('departmentId', departmentId);
  }

  try {
    const response = await api.get<SearchResponse<Admin>>(
      `admins?${queryParams}`,
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch admins');
    }
  } catch (err: any) {
    throw new Error(err.message || 'An unexpected error occurred');
  }
}

export async function registerAdmin(data: AdminRegistrationData) {
  console.log('data', data);
  try {
    const response = await api.post('/auth/admin/register', data);
    return response.data;
  } catch (error) {
    //console.error('Error registering admin:', error);
    throw new Error('Failed to register admin');
  }
}
