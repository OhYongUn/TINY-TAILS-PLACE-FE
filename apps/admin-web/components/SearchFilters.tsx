'use client';

import React, { useEffect, useState } from 'react';
import { Search } from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Input } from '@repo/ui/components/ui/input';
import DateRangePicker from './DateRangePicker';
import { SearchParams } from '@app/types/search';
import { DateRange } from 'react-day-picker';
import DepartmentSelect from '@app/components/DepartmentSelect';
import { Department } from '@app/types/admins/type';

interface SearchOption {
  value: string;
  label: string;
}
interface sortOption {
  value: string;
  label: string;
}

interface SearchFiltersProps {
  searchOptions: SearchOption[];
  sortOptions: sortOption[];
  departments?: Department[];
  showDateRangePicker?: boolean;
  showSortOption?: boolean;
  StatusFilter?: React.ComponentType<any>;
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchFilters({
  departments,
  searchOptions,
  sortOptions,
  showDateRangePicker = true,
  showSortOption = true,
  StatusFilter,
  searchParams,
  updateSearchParams,
  onSearch,
  isLoading,
}: SearchFiltersProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(
    searchParams.searchQuery,
  );
  const [localSearchOption, setLocalSearchOption] = useState(
    searchParams.searchOption,
  );
  const [localDateRange, setLocalDateRange] = useState<DateRange | undefined>(
    searchParams.dateRange,
  );
  const [localDepartment, setLocalDepartment] = useState<string | null>(
    searchParams.departmentId || null,
  );
  const [localPageSize, setLocalPageSize] = useState(
    searchParams.pageSize || '10',
  );

  useEffect(() => {
    setLocalSearchQuery(searchParams.searchQuery);
    setLocalSearchOption(searchParams.searchOption);
    setLocalDateRange(searchParams.dateRange);
    setLocalDepartment(searchParams.departmentId || null);
    setLocalPageSize(searchParams.pageSize || '10');
  }, [searchParams]);

  const handleSearch = () => {
    updateSearchParams({
      searchQuery: localSearchQuery,
      searchOption: localSearchOption,
      dateRange: localDateRange,
      departmentId: localDepartment,
      pageSize: localPageSize,
      currentPage: 1,
    });
    onSearch();
  };

  const handleSortChange = (value: string) => {
    updateSearchParams({ sortOption: value });
    onSearch();
  };
  const handleDepartmentChange = (departmentId: string | null) => {
    setLocalDepartment(departmentId);
    updateSearchParams({ departmentId, currentPage: 1 });
    onSearch();
  };
  const handlePageSizeChange = (value: string) => {
    setLocalPageSize(value);
    updateSearchParams({ pageSize: value, currentPage: 1 });
    onSearch();
  };
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
        {showDateRangePicker && (
          <DateRangePicker
            dateRange={localDateRange ?? { from: new Date(), to: new Date() }}
            onDateChange={setLocalDateRange}
          />
        )}
        {departments && (
          <DepartmentSelect
            departments={departments}
            onDepartmentChange={handleDepartmentChange}
            selectedDepartmentId={localDepartment}
          />
        )}
        <Select value={localSearchOption} onValueChange={setLocalSearchOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="검색 옵션" />
          </SelectTrigger>
          <SelectContent>
            {searchOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="검색어 입력"
          className="w-[200px]"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          검색
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          {StatusFilter && <StatusFilter />}
        </div>
        <div className="flex space-x-2 w-full md:w-auto justify-end">
          {showSortOption && (
            <>
              <Select
                value={localPageSize}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="페이지" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={searchParams.sortOption}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
