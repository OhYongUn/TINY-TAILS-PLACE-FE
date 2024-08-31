'use client';

import React from 'react';
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
import { Label } from '@repo/ui/components/ui/label';
import {
  CalendarCheck,
  UserCheck,
  LogOut,
  LayoutGrid,
} from '@repo/ui/components/ui/lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/ui/tooltip';
import { useReservationStore } from '@app/store/reservation-store';

export default function ReservationListSearchFilters({
  onUpdateFilters,
}: {
  onUpdateFilters: () => void;
}) {
  const {
    dateRange,
    searchOption,
    searchQuery,
    sortOption,
    status,
    pageSize,
    setDateRange,
    setSearchOption,
    setSearchQuery,
    setSortOption,
    setStatus,
    setPageSize,
  } = useReservationStore();

  const handleSearch = () => {
    onUpdateFilters();
  };

  const handleStatusChange = (value: string) => {
    setStatus(status === value ? '' : value);
    onUpdateFilters();
  };

  const statusOptions = [
    { value: '', label: '전체', icon: LayoutGrid },
    { value: 'CONFIRMED', label: '예약확정', icon: CalendarCheck },
    { value: 'CHECKED_IN', label: '체크인', icon: UserCheck },
    { value: 'CHECKED_OUT', label: '체크아웃', icon: LogOut },
  ];

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
          <DateRangePicker
            dateRange={dateRange}
            onDateChange={(range) => {
              setDateRange(range);
              onUpdateFilters();
            }}
          />

          <Select
            value={searchOption}
            onValueChange={(value) => {
              setSearchOption(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="검색 옵션" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="userName">이름</SelectItem>
              <SelectItem value="phone">전화 번호</SelectItem>
              <SelectItem value="bookinNumber">예약 번호</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="검색어 입력"
            className="w-[200px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            검색
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="py-2">
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              {statusOptions.map((option) => (
                <Tooltip key={option.value}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center">
                      <Label
                        htmlFor={option.value}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all ${
                          status === option.value
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted bg-background text-muted-foreground hover:border-primary/50 hover:text-primary'
                        }`}
                        onClick={() => handleStatusChange(option.value)}
                      >
                        <option.icon className="h-5 w-5" />
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{option.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
        <div className="flex space-x-2">
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(value);
              onUpdateFilters();
            }}
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
            value={sortOption}
            onValueChange={(value) => {
              setSortOption(value);
              onUpdateFilters();
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt_desc">최신순</SelectItem>
              <SelectItem value="createdAt_asc">오래된 순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
