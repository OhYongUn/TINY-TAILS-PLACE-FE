// DateRangePicker.tsx
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { Button } from '@repo/ui/components/ui/button';
import { Calendar } from '@repo/ui/components/ui/calendar';
import { CalendarDaysIcon } from '@repo/ui/components/ui/icons';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
  disabledDates?: Date[];
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateChange,
  disabledDates = [],
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정

  const disabledDays = [
    { before: today }, // 오늘 이전 날짜 비활성화
    ...disabledDates, // API에서 받아온 비활성화할 날짜들
  ];

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) =>
        date.getDate() === disabledDate.getDate() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getFullYear() === disabledDate.getFullYear(),
    );
  };

  // 1년 후의 날짜 계산
  const oneYearLater = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate(),
  );

  return (
    <div>
      <label
        htmlFor="check-in"
        className="block text-sm font-medium text-foreground mb-2"
      >
        Choose your dates
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            <CalendarDaysIcon className="mr-2" />
            {dateRange?.from
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString() || 'Select end date'}`
              : 'Select Dates'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            selected={dateRange}
            onDateChange={onDateChange}
            disabled={disabledDays}
            modifiers={{
              disabled: isDateDisabled,
            }}
            modifiersStyles={{
              disabled: { textDecoration: 'line-through', color: 'gray' },
            }}
            fromDate={today}
            toDate={oneYearLater}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
