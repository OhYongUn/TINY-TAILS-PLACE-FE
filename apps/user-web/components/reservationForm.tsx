import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';
import { Input } from '@repo/ui/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { Button } from '@repo/ui/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { CalendarDaysIcon } from '@repo/ui/components/ui/icons';
import DateRangePicker from '@app/components/DateRangePicker';
import { useBookingStore } from '@app/store/bookingStore';
import { DateRange } from 'react-day-picker';

const ReservationForm = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { showReservationForm, closeReservationForm, selectedRoom } =
    useBookingStore();

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <Dialog open={showReservationForm} onOpenChange={closeReservationForm}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>예약하기</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check-in">체크인 날짜</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <CalendarDaysIcon className="mr-2" />
                      <span>
                        {dateRange?.from
                          ? dateRange.from.toLocaleDateString()
                          : '날짜 선택'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <DateRangePicker
                      dateRange={dateRange}
                      onDateChange={handleDateSelect}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="check-out">체크아웃 날짜</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <CalendarDaysIcon className="mr-2" />
                      <span>
                        {dateRange?.to
                          ? dateRange.to.toLocaleDateString()
                          : '날짜 선택'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <DateRangePicker
                      dateRange={dateRange}
                      onDateChange={handleDateSelect}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="pet-count">반려동물 수</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="반려동물 수 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}마리
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="requestedLateCheckout" />
                <Label htmlFor="requestedLateCheckout">
                  늦은 체크아웃 요청
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="requestedEarlyCheckin" />
                <Label htmlFor="requestedEarlyCheckin">이른 체크인 요청</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="specialRequests">특별 요청사항</Label>
              <Textarea
                id="specialRequests"
                placeholder="특별 요청사항이 있다면 입력해주세요."
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">요금 정보</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>기본 요금:</span>
                  <span>{selectedRoom?.price.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>추가 요금:</span>
                  <span>계산 중...</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>총 요금:</span>
                  <span>계산 중...</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={closeReservationForm}>예약 완료</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationForm;
