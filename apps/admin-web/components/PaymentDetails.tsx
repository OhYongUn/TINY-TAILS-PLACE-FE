import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Separator } from '@repo/ui/components/ui/separator';
import { CreditCardIcon } from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import {
  ReservationDetailDto,
  paymentMethodMap,
  paymentStatusMap,
} from '@app/types/reservation/type';
import { formatDate } from '@app/utils/utils';

interface PaymentDetailsProps {
  reservationDetail: ReservationDetailDto;
}

export function PaymentDetails({ reservationDetail }: PaymentDetailsProps) {
  const { payments, bookingDetails } = reservationDetail;

  const calculateAdditionalFeeAmount = () => {
    if (!bookingDetails) return 0;

    const additionalPayment = payments.find((p) => p.type === 'ADDITIONAL');
    if (!additionalPayment) return 0;

    const { actualEarlyCheckin, actualLateCheckout } = bookingDetails;
    const approvedOptionsCount =
      (actualEarlyCheckin ? 1 : 0) + (actualLateCheckout ? 1 : 0);

    return approvedOptionsCount === 2
      ? additionalPayment.amount
      : additionalPayment.amount / 2;
  };

  const additionalFeeAmount = calculateAdditionalFeeAmount();
  const hasAdditionalServices =
    bookingDetails?.actualEarlyCheckin || bookingDetails?.actualLateCheckout;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5" />
          결제 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {payments
          .filter((payment) => payment.type === 'INITIAL')
          .map((payment, index) => (
            <div key={payment.id} className="grid gap-2">
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
                <span className="font-semibold">결제 방법:</span>
                <span>
                  {paymentMethodMap[payment.method] || payment.method}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">결제 일시:</span>
                <span>{formatDate(payment.createdAt)}</span>
              </div>
              {index <
                payments.filter((p) => p.type === 'INITIAL').length - 1 && (
                <Separator />
              )}
            </div>
          ))}
      </CardContent>

      {hasAdditionalServices && additionalFeeAmount > 0 && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5" />
                추가 서비스 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-5">
              {bookingDetails?.actualEarlyCheckin && (
                <div className="flex justify-between">
                  <span>얼리 체크인:</span>
                  <span>승인됨</span>
                </div>
              )}
              {bookingDetails?.actualLateCheckout && (
                <div className="flex justify-between">
                  <span>레이트 체크아웃:</span>
                  <span>승인됨</span>
                </div>
              )}
              <div className="flex justify-between mt-2">
                <span className="font-semibold">추가 요금:</span>
                <span>{additionalFeeAmount.toLocaleString()}원</span>
              </div>
              {payments.filter((payment) => payment.type === 'ADDITIONAL')
                .length === 0 && (
                <div className="py-5 mb-2">
                  <Button className="float-end">추가 결제 하기</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Card>
  );
}
