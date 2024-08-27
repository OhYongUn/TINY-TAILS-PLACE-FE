import React, { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Separator } from '@repo/ui/components/ui/separator';
import {
  BookingStatus,
  BookingStatusMap,
  paymentMethodMap,
  paymentStatusMap,
  ReservationDetailDto,
} from '@app/types/reservation/type';
import {
  CreditCardIcon,
  UserIcon,
  HomeIcon,
  BanknoteIcon,
} from '@repo/ui/components/ui/lucide-react';

interface ReservationDetailProps {
  reservationDetail: ReservationDetailDto;
  onClose: () => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onPayment: () => void;
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isEmptyObject = (obj: any): boolean => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default function ReservationDetail({
  reservationDetail,
  onClose,
  onCheckIn,
  onCheckOut,
  onPayment,
}: ReservationDetailProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(
    reservationDetail.status === '체크인',
  );
  const getBadgeVariant = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CHECKED_IN:
        return 'default';
      case BookingStatus.CHECKED_OUT:
        return 'secondary';
      case BookingStatus.CONFIRMED:
      default:
        return 'outline';
    }
  };
  const getBookingStatus = (status: string): BookingStatus => {
    switch (status) {
      case '예약확정':
        return BookingStatus.CONFIRMED;
      case '입실 완료':
        return BookingStatus.CHECKED_IN;
      case '퇴실완료':
        return BookingStatus.CHECKED_OUT;
      default:
        return BookingStatus.CONFIRMED;
    }
  };
  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>예약 상세 정보</DialogTitle>
        <DialogDescription>
          {reservationDetail.roomNumber}호 ({reservationDetail.roomName}) 예약
          정보
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              예약자 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">이름:</span>
              <span>{reservationDetail.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">이메일:</span>
              <span>{reservationDetail.user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">전화번호 :</span>
              <span>{reservationDetail.user.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5" />
              예약 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">예약 번호:</span>
              <span>{reservationDetail.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">상태:</span>
              <span>
                {BookingStatusMap[reservationDetail.status] ||
                  reservationDetail.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">체크인:</span>
              <span>{formatDate(reservationDetail.checkInDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">체크아웃:</span>
              <span>{formatDate(reservationDetail.checkOutDate)}</span>
            </div>
            {!isEmptyObject(reservationDetail.bookingDetails) && (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold">반려동물 수:</span>
                  <span>{reservationDetail.bookingDetails?.petCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">요청사항:</span>
                  <span>
                    {reservationDetail.bookingDetails?.request || '없음'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">레이트 체크아웃 요청 :</span>
                  <Badge
                    variant={
                      reservationDetail.bookingDetails?.requestedLateCheckout
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {reservationDetail.bookingDetails?.requestedEarlyCheckin
                      ? '예'
                      : '아니오'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">얼리 체크인 요청 :</span>
                  <Badge
                    variant={
                      reservationDetail.bookingDetails?.actualEarlyCheckin
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {reservationDetail.bookingDetails?.actualEarlyCheckin
                      ? '예'
                      : '아니오'}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {reservationDetail.payments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5" />
                결제 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {reservationDetail.payments
                .filter((payment) => payment.type === 'INITIAL')
                .map((payment, index) => (
                  <div key={index} className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">금액:</span>
                      <span>{payment.amount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">결제 상태:</span>
                      <span>
                        {paymentStatusMap[payment.status] || payment.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">결제 방법 :</span>
                      <span>
                        {paymentMethodMap[payment.method] || payment.method}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">결제 일시:</span>
                      <span>{formatDate(payment.createdAt)}</span>
                    </div>
                    {index <
                      reservationDetail.payments.filter(
                        (p) => p.type === 'INITIAL',
                      ).length -
                        1 && <Separator />}
                  </div>
                ))}
            </CardContent>

            {reservationDetail.payments
              .filter((payment) => payment.type === 'ADDITIONAL')
              .map((additionalPayment, index) => (
                <CardContent key={index}>
                  <div className="font-semibold mb-2">추가 결제 정보</div>
                  <div className="flex justify-between">
                    <span className="font-semibold">금액:</span>
                    <span>{additionalPayment.amount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">결제 상태:</span>
                    <span>
                      {paymentStatusMap[additionalPayment.status] ||
                        additionalPayment.status}
                    </span>
                  </div>
                </CardContent>
              ))}
          </Card>
        )}

        {reservationDetail.additionalFees.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BanknoteIcon className="h-5 w-5" />
                추가 요금
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {reservationDetail.additionalFees.map((fee, index) => (
                <div key={index} className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">유형:</span>
                    <span>{fee.feeType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">금액:</span>
                    <span>{fee.amount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">상태:</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">설명:</span>
                    <span>
                      {!isEmptyObject(fee.description)
                        ? fee.description
                        : '없음'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">일시:</span>
                    <span>{formatDate(fee.createdAt)}</span>
                  </div>
                  {index < reservationDetail.additionalFees.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <DialogFooter className="flex justify-between">
        <div>
          {reservationDetail.status === '확정' && !isCheckedIn && (
            <Button
              onClick={() => {
                onCheckIn();
                setIsCheckedIn(true);
              }}
            >
              체크인
            </Button>
          )}
          {isCheckedIn && <Button onClick={onCheckOut}>체크아웃</Button>}
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
