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
import { format, subDays, subMonths, subYears } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
  disabledDays?: any;
  fromDate?: Date;
  toDate?: Date;
  baseDate?: Date;
}
const quickSelectOptions = [
  { label: '직접 선택', value: 'custom' },
  { label: '최근 1주일', value: '7,days' },
  { label: '최근 1개월', value: '1,months' },
  { label: '최근 3개월', value: '3,months' },
  { label: '최근 6개월', value: '6,months' },
  { label: '최근 1년', value: '1,years' },
];
const DateRangePicker = ({
  dateRange,
  onDateChange,
  disabledDays,
  fromDate,
  toDate,
  baseDate = new Date(),
}: DateRangePickerProps) => {
  const handleQuickSelect = (value: string) => {
    if (value === 'custom') return;
    const [period, unit] = value.split(',');
    if (!period || !unit) return;

    const endDate = baseDate;
    let startDate: Date;

    switch (unit) {
      case 'days':
        startDate = subDays(endDate, parseInt(period));
        break;
      case 'months':
        startDate = subMonths(endDate, parseInt(period));
        break;
      case 'years':
        startDate = subYears(endDate, parseInt(period));
        break;
      default:
        return;
    }

    onDateChange({ from: startDate, to: endDate });
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarDaysIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  <span>{format(dateRange.from, 'PPP', { locale: ko })}</span>
                  <span className="mx-2">-</span>
                  <span>{format(dateRange.to, 'PPP', { locale: ko })}</span>
                </>
              ) : (
                format(dateRange.from, 'PPP', { locale: ko })
              )
            ) : (
              <span className="text-muted-foreground">날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col space-y-4 p-4">
            <Select onValueChange={handleQuickSelect}>
              <SelectTrigger>
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent>
                {quickSelectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Calendar
                selected={dateRange}
                onDateChange={onDateChange}
                disabled={disabledDays}
                fromDate={fromDate}
                toDate={toDate}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
