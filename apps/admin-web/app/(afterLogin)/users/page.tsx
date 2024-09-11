'use client';

import React from 'react';
import { SearchFilters } from '@app/components/SearchFilters';
import { PaginationComponent } from '@app/components/PaginationComponent';
import { User } from '@app/types/users/type';
import { useSearch } from '@app/hooks/useSearch';
import { searchUsers } from '@app/actions/users/users-service';
import UserListTable from '@app/components/UserListTable';

export default function UsersPage() {
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
  } = useSearch<User>('users', searchUsers);
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

  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="p-4 bg-white">
      <SearchFilters
        searchOptions={search_options}
        sortOptions={sort_options}
        searchParams={searchParams} // searchParams를 그대로 전달
        updateSearchParams={updateSearchParams}
        onSearch={performSearch}
        isLoading={isLoading}
        showDateRangePicker={false} // 날짜 선택기를 표시하지 않음
        showSortOption={true}
      />
      <UserListTable list={data} />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => updateSearchParams({ currentPage: page })}
      />
      <div>총 사용자 수: {totalCount}</div>
    </div>
  );
}
