import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { HomeIcon } from '@repo/ui/components/ui/lucide-react';
import {
  ReservationDetailDto,
  BookingStatusMap,
} from '@app/types/reservation/type';
import { formatDate, formatPhoneNumber, isEmptyObject } from '@app/utils/utils';

interface BookingDetailsProps {
  reservationDetail: ReservationDetailDto;
}

export function BookingDetails({ reservationDetail }: BookingDetailsProps) {
  const { base, bookingDetails, user, roomDetail } = reservationDetail;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5" />
          예약 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex justify-between">
          <span className="font-semibold">예약 번호:</span>
          <span>{base.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">상태:</span>
          <span>{BookingStatusMap[base.status] || base.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">체크인:</span>
          <span>{formatDate(base.checkInDate, 'short')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">체크아웃:</span>
          <span>{formatDate(base.checkOutDate, 'short')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">객실:</span>
          <span>
            {roomDetail.roomNumber} ({roomDetail.roomName})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">예약자:</span>
          <span>
            {user.name}
            {user.phone ? `(${formatPhoneNumber(user.phone)})` : ''}
          </span>
        </div>
        {bookingDetails && !isEmptyObject(bookingDetails) && (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">반려동물 수:</span>
              <span>{bookingDetails.petCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">요청사항:</span>
              <span>{bookingDetails.request || '없음'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">레이트 체크아웃 요청:</span>
              <Badge
                variant={
                  bookingDetails.requestedLateCheckout ? 'default' : 'secondary'
                }
              >
                {bookingDetails.requestedLateCheckout ? '예' : '아니오'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">얼리 체크인 요청:</span>
              <Badge
                variant={
                  bookingDetails.requestedEarlyCheckin ? 'default' : 'secondary'
                }
              >
                {bookingDetails.requestedEarlyCheckin ? '예' : '아니오'}
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
