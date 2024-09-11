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
  showDateRangePicker?: boolean;
  showSortOption?: boolean;
  StatusFilter?: React.ComponentType<any>;
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchFilters({
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

  useEffect(() => {
    setLocalSearchQuery(searchParams.searchQuery);
    setLocalSearchOption(searchParams.searchOption);
    setLocalDateRange(searchParams.dateRange);
  }, [searchParams]);

  const handleSearch = () => {
    updateSearchParams({
      searchQuery: localSearchQuery,
      searchOption: localSearchOption,
      dateRange: localDateRange,
      currentPage: 1,
    });
    onSearch();
  };

  const handleSortChange = (value: string) => {
    updateSearchParams({ sortOption: value });
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

      {StatusFilter && <StatusFilter />}

      {showSortOption && (
        <div className="flex justify-end">
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
        </div>
      )}
    </div>
  );
}
