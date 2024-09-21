'use client';

import { useSearch } from '@app/hooks/useSearch';
import { Admin } from '@app/types/admins/type';
import { searchAdmins } from '@app/actions/admins/admins-service';
import { SearchFilters } from '@app/components/SearchFilters';
import React, { useState } from 'react';
import { PaginationComponent } from '@app/components/PaginationComponent';
import AdminsListTable from '@app/components/AdminsListTable';
import { useDepartments } from '@app/hooks/useDepartments';
import { Button } from '@repo/ui/components/ui/button';
import { AdminRegistrationDialog } from '@app/components/AdminRegistrationDialog';

export default function AdminsPage() {
  const { data: departments, isLoading: isDepartmentsLoading } =
    useDepartments();
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>신규 등록</Button>
      </div>
      <AdminsListTable list={data} />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => updateSearchParams({ currentPage: page })}
      />
      <AdminRegistrationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
