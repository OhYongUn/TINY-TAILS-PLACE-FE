'use client';

import { useSearch } from '@app/hooks/useSearch';
import { Admin } from '@app/types/admins/type';
import { searchAdmins } from '@app/actions/admins/admins-service';
import { SearchFilters } from '@app/components/SearchFilters';
import React, { useMemo } from 'react';
import { PaginationComponent } from '@app/components/PaginationComponent';
import AdminsListTable from '@app/components/AdminsListTable';
import { useDepartments } from '@app/hooks/useDepartments';

export default function AdminsPage() {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useDepartments();
  console.log('departments', departments);
  const {
    data,
    isLoading,
    error,
    searchParams,
    updateSearchParams,
    performSearch,
    totalPages,
    currentPage,
    totalCount,
  } = useSearch<Admin>('admins', searchAdmins);

  const search_options = [
    { value: 'name', label: '이름' },
    { value: 'email', label: '이메일' },
    { value: 'phone', label: '전화 번호' },
  ];
  const sort_options = [
    { value: 'name_asc', label: '이름 오름차순' },
    { value: 'name_desc', label: '이름 내림차순' },
    { value: 'createdAt_desc', label: '최신 가입순' },
    { value: 'createdAt_asc', label: '오래된 가입순' },
  ];

  return (
    <div className="p-4 bg-white">
      <SearchFilters
        searchOptions={search_options}
        sortOptions={sort_options}
        searchParams={searchParams} // searchParams를 그대로 전달
        departments={departments}
        updateSearchParams={updateSearchParams}
        onSearch={performSearch}
        isLoading={isLoading}
        showDateRangePicker={false} // 날짜 선택기를 표시하지 않음
        showSortOption={true}
      />
      <AdminsListTable list={data} />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => updateSearchParams({ currentPage: page })}
      />
    </div>
  );
}
