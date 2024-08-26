// MonthSelector.tsx
import React, { useCallback } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { MonthCalendar } from './MonthCalendar';

interface MonthSelectorProps {
  currentDate: Date;
  onDateChange: (newDate: Date) => void;
}

export function MonthSelector({
  currentDate,
  onDateChange,
}: MonthSelectorProps) {
  const goToPreviousMonth = useCallback(() => {
    onDateChange(subMonths(currentDate, 1));
  }, [currentDate, onDateChange]);

  const goToNextMonth = useCallback(() => {
    onDateChange(addMonths(currentDate, 1));
  }, [currentDate, onDateChange]);

  const handleMonthChange = useCallback(
    (newDate: Date) => {
      onDateChange(newDate);
    },
    [onDateChange],
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <Button onClick={goToPreviousMonth} variant="outline" size="icon">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(currentDate, 'yyyy년 MM월')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthCalendar
            currentDate={currentDate}
            onMonthChange={handleMonthChange}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={goToNextMonth} variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
