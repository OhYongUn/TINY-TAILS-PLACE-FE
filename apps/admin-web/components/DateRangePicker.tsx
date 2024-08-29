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
  disabledDays?: any;
  fromDate?: Date;
  toDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateChange,
  disabledDays,
  fromDate,
  toDate,
}) => {
  return (
    <div>
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
            fromDate={fromDate}
            toDate={toDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
