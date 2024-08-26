import React from 'react';
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
import { ReservationDetailDto } from '@app/types/reservation/type';
import {
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  HomeIcon,
  PawPrintIcon,
  ClockIcon,
  BanknoteIcon,
} from '@repo/ui/components/ui/lucide-react';

interface ReservationDetailProps {
  reservationDetail: ReservationDetailDto;
  onClose: () => void;
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
}: ReservationDetailProps) {
  return (
    <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>예약 상세 정보</DialogTitle>
        <DialogDescription>
          {reservationDetail.roomNumber}호 ({reservationDetail.roomName}) 예약
          정보
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5" />
              기본 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">예약 ID:</span>
              <span>{reservationDetail.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">상태:</span>
              <Badge
                variant={
                  reservationDetail.status === '확정' ? 'default' : 'secondary'
                }
              >
                {reservationDetail.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">체크인:</span>
              <span>{formatDate(reservationDetail.checkInDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">체크아웃:</span>
              <span>{formatDate(reservationDetail.checkOutDate)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold">기본 가격:</span>
              <span>{reservationDetail.basePrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">총 가격:</span>
              <span className="text-lg font-bold">
                {reservationDetail.totalPrice.toLocaleString()}원
              </span>
            </div>
            {!isEmptyObject(reservationDetail.cancellationDate) && (
              <div className="flex justify-between text-destructive">
                <span className="font-semibold">취소 일자:</span>
                <span>
                  {formatDate(reservationDetail.cancellationDate as string)}
                </span>
              </div>
            )}
            {!isEmptyObject(reservationDetail.cancellationFee) && (
              <div className="flex justify-between text-destructive">
                <span className="font-semibold">취소 수수료:</span>
                <span>{reservationDetail.cancellationFee as number}원</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              고객 정보
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
          </CardContent>
        </Card>

        {!isEmptyObject(reservationDetail.bookingDetails) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PawPrintIcon className="h-5 w-5" />
                예약 상세
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
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
                <span className="font-semibold">레이트 체크아웃 요청:</span>
                <Badge
                  variant={
                    reservationDetail.bookingDetails?.requestedLateCheckout
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {reservationDetail.bookingDetails?.requestedLateCheckout
                    ? '예'
                    : '아니오'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">얼리 체크인 요청:</span>
                <Badge
                  variant={
                    reservationDetail.bookingDetails?.requestedEarlyCheckin
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
                <span className="font-semibold">실제 레이트 체크아웃:</span>
                <Badge
                  variant={
                    reservationDetail.bookingDetails?.actualLateCheckout
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {reservationDetail.bookingDetails?.actualLateCheckout
                    ? '예'
                    : '아니오'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">실제 얼리 체크인:</span>
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
            </CardContent>
          </Card>
        )}

        {reservationDetail.payments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5" />
                결제 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {reservationDetail.payments.map((payment, index) => (
                <div key={index} className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">금액:</span>
                    <span>{payment.amount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">상태:</span>
                    <Badge
                      variant={
                        payment.status === '완료' ? 'default' : 'secondary'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">방법:</span>
                    <span>{payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">유형:</span>
                    <span>{payment.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">거래 ID:</span>
                    <span>
                      {!isEmptyObject(payment.transactionId)
                        ? payment.transactionId
                        : '없음'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">일시:</span>
                    <span>{formatDate(payment.createdAt)}</span>
                  </div>
                  {index < reservationDetail.payments.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </CardContent>
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
      <DialogFooter>
        <Button onClick={onClose}>닫기</Button>
      </DialogFooter>
    </DialogContent>
  );
}
