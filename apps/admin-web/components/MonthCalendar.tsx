import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';

interface MonthCalendarProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthCalendar({
  currentDate,
  onMonthChange,
}: MonthCalendarProps) {
  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(currentDate.getFullYear(), i, 1),
  );

  const goToPreviousYear = () => onMonthChange(subMonths(currentDate, 12));
  const goToNextYear = () => onMonthChange(addMonths(currentDate, 12));

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={goToPreviousYear} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium">
          {currentDate.getFullYear()}년
        </span>
        <Button onClick={goToNextYear} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month) => (
          <Button
            key={month.getTime()}
            onClick={() => onMonthChange(month)}
            variant={
              month.getMonth() === currentDate.getMonth()
                ? 'default'
                : 'outline'
            }
            className="w-full"
          >
            {format(month, 'M월', { locale: ko })}
          </Button>
        ))}
      </div>
    </div>
  );
}
