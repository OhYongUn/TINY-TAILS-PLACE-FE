// ReservationListSearchFilters.tsx
'use client';

import React, { useState } from 'react';
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
import { DateRange } from 'react-day-picker';

export default function ReservationListSearchFilters({
  dateRange,
  searchOption,
  searchQuery,
  sortOption,
  onUpdateFilters,
}) {
  const [localDateRange, setLocalDateRange] = useState<DateRange | undefined>(
    dateRange,
  );
  const [localSearchOption, setLocalSearchOption] = useState(
    searchOption || '',
  );
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  const [localSortOption, setLocalSortOption] = useState(sortOption || '');

  const handleSearch = () => {
    onUpdateFilters({
      dateRange: localDateRange,
      searchOption: localSearchOption,
      searchQuery: localSearchQuery,
      sortOption: localSortOption,
    });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setLocalDateRange(range);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
      <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
        <DateRangePicker
          dateRange={localDateRange}
          onDateChange={handleDateChange}
        />

        <Select value={localSearchOption} onValueChange={setLocalSearchOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="검색 옵션" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="guest">예약자</SelectItem>
            <SelectItem value="room">객실 번호</SelectItem>
            <SelectItem value="status">상태</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="검색어 입력"
          className="w-[200px]"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
        />

        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          검색
        </Button>
      </div>

      <Select value={localSortOption} onValueChange={setLocalSortOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 옵션" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">날짜순</SelectItem>
          <SelectItem value="room">객실 번호순</SelectItem>
          <SelectItem value="status">상태순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
