import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Bookings } from '@app/interface/bookings/reservation';
import { getStatusInfo } from '@app/utills/utils';

interface ReservationDetailDialogProps {
  reservation: Bookings;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ReservationDetailDialog({
  reservation,
  open,
  setIsOpen,
}: ReservationDetailDialogProps) {
  const statusInfo = getStatusInfo(reservation.status);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>예약 상세 정보</DialogTitle>
          <DialogDescription>예약 번호: {reservation.id}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-bold">방:</span>
            <span className="col-span-3">
              {reservation.roomDetail.room.name}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-bold">체크인:</span>
            <span className="col-span-3">
              {format(new Date(reservation.checkInDate), 'yyyy-MM-dd HH:mm')}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-bold">체크아웃:</span>
            <span className="col-span-3">
              {format(new Date(reservation.checkOutDate), 'yyyy-MM-dd HH:mm')}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-bold">상태:</span>
            <span className="col-span-3">
              <Badge variant="secondary">{statusInfo.text}</Badge>
            </span>
          </div>

          {reservation.bookingDetails && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 font-bold">반려동물:</span>
                <span className="col-span-3">
                  {reservation.bookingDetails.petCount}마리
                </span>
              </div>
              {reservation.bookingDetails.request && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="col-span-1 font-bold">특별 요청:</span>
                  <span className="col-span-3">
                    {reservation.bookingDetails.request}
                  </span>
                </div>
              )}
            </>
          )}
          {reservation.additionalFees > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="col-span-1 font-bold">추가 요금:</span>
              <span className="col-span-3">
                {reservation.additionalFees.toLocaleString()}원
              </span>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-bold">기본 가격:</span>
            <span className="col-span-3">
              {reservation.basePrice.toLocaleString()}원
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-bold">총 가격:</span>
            <span className="col-span-3">
              {reservation.totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>
        <DialogFooter>
          {reservation.status === 'PENDING' && (
            <Button
              variant="destructive"
              onClick={() => console.log('예약 취소')}
            >
              예약 취소
            </Button>
          )}
          <Button onClick={() => setIsOpen(false)}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
