import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { ReservationDetailDto } from '@app/types/reservation/type';

interface ReservationDetailProps {
  reservationDetail: ReservationDetailDto;
  onClose: () => void;
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  return dateString; // API에서 이미 포맷된 문자열로 온다고 가정
};

const isEmptyObject = (obj: any): boolean => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const ReservationDetail: React.FC<ReservationDetailProps> = ({
  reservationDetail,
  onClose,
}) => {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>예약 상세 정보</DialogTitle>
        <DialogDescription>
          {reservationDetail.roomNumber}호 ({reservationDetail.roomName}) 예약
          정보
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">기본 정보</h3>
          <p>예약 ID: {reservationDetail.id}</p>
          <p>체크인: {formatDate(reservationDetail.checkInDate)}</p>
          <p>체크아웃: {formatDate(reservationDetail.checkOutDate)}</p>
          <p>상태: {reservationDetail.status}</p>
          <p>기본 가격: {reservationDetail.basePrice.toLocaleString()}원</p>
          <p>총 가격: {reservationDetail.totalPrice.toLocaleString()}원</p>
          {!isEmptyObject(reservationDetail.cancellationDate) && (
            <p>
              취소 일자:{' '}
              {formatDate(reservationDetail.cancellationDate as string)}
            </p>
          )}
          {!isEmptyObject(reservationDetail.cancellationFee) && (
            <p>취소 수수료: {reservationDetail.cancellationFee as number}원</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">고객 정보</h3>
          <p>이름: {reservationDetail.user.name}</p>
          <p>이메일: {reservationDetail.user.email}</p>
        </div>
        {!isEmptyObject(reservationDetail.bookingDetails) && (
          <div>
            <h3 className="text-lg font-semibold mb-2">예약 상세</h3>
            <p>반려동물 수: {reservationDetail?.bookingDetails?.petCount}</p>
            <p>
              요청사항: {reservationDetail?.bookingDetails?.request || '없음'}
            </p>
            <p>
              레이트 체크아웃 요청:{' '}
              {reservationDetail?.bookingDetails?.requestedLateCheckout
                ? '예'
                : '아니오'}
            </p>
            <p>
              얼리 체크인 요청:{' '}
              {reservationDetail?.bookingDetails?.requestedEarlyCheckin
                ? '예'
                : '아니오'}
            </p>
            <p>
              실제 레이트 체크아웃:{' '}
              {reservationDetail?.bookingDetails?.actualLateCheckout
                ? '예'
                : '아니오'}
            </p>
            <p>
              실제 얼리 체크인:{' '}
              {reservationDetail?.bookingDetails?.actualEarlyCheckin
                ? '예'
                : '아니오'}
            </p>
          </div>
        )}
        {reservationDetail.payments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">결제 정보</h3>
            {reservationDetail.payments.map((payment, index) => (
              <div key={index} className="mb-2">
                <p>금액: {payment.amount.toLocaleString()}원</p>
                <p>상태: {payment.status}</p>
                <p>방법: {payment.method}</p>
                <p>유형: {payment.type}</p>
                <p>
                  거래 ID:{' '}
                  {!isEmptyObject(payment.transactionId)
                    ? payment.transactionId
                    : '없음'}
                </p>
                <p>일시: {formatDate(payment.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
        {reservationDetail.additionalFees.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">추가 요금</h3>
            {reservationDetail.additionalFees.map((fee, index) => (
              <div key={index} className="mb-2">
                <p>유형: {fee.feeType}</p>
                <p>금액: {fee.amount.toLocaleString()}원</p>
                <p>
                  설명:{' '}
                  {!isEmptyObject(fee.description) ? fee.description : '없음'}
                </p>
                <p>일시: {formatDate(fee.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <DialogFooter>
        <Button onClick={onClose}>닫기</Button>
      </DialogFooter>
    </DialogContent>
  );
};
