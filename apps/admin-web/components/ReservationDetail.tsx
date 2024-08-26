import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';

interface ReservationDetailProps {
  roomNumber: string;
  date: string;
  bookingId: string | null;
  onClose: () => void;
}

export const ReservationDetail = ({
  roomNumber,
  date,
  bookingId,
  onClose,
}: ReservationDetailProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>예약 상세 정보</DialogTitle>
        <DialogDescription>
          {roomNumber}호 {date}의 예약 정보입니다.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm text-gray-500">객실: {roomNumber}</p>
        <p className="text-sm text-gray-500">날짜: {date}</p>
        <p className="text-sm text-gray-500">
          예약 ID: {bookingId || '예약 없음'}
        </p>
        {/* 여기에 추가적인 예약 정보를 표시할 수 있습니다 */}
      </div>
      <DialogFooter>
        <Button onClick={onClose}>닫기</Button>
      </DialogFooter>
    </DialogContent>
  );
};
