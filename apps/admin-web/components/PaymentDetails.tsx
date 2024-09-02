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
import { postPaidPayment } from '@app/actions/payments/payments-services';
import { useReservationStore } from '@app/store/reservation-store';
import { useAlert } from '@app/components/AlertDialogProvider';

interface PaymentDetailsProps {
  reservationDetail: ReservationDetailDto;
}

export function PaymentDetails({ reservationDetail }: PaymentDetailsProps) {
  const { payments, bookingDetails } = reservationDetail;
  const { selectedReservationId, setLoading, fetchReservationDetail } =
    useReservationStore();
  const { showAlert } = useAlert();

  const initialPayments = payments.filter(
    (payment) => payment.type === 'INITIAL',
  );
  const additionalPayment = payments.find(
    (payment) => payment.type === 'ADDITIONAL',
  );

  const hasAdditionalServices =
    bookingDetails?.actualEarlyCheckin || bookingDetails?.actualLateCheckout;

  const calculateAdditionalFeeAmount = () => {
    if (!bookingDetails) return 0;
    if (!additionalPayment) return 0;

    const { actualEarlyCheckin, actualLateCheckout } = bookingDetails;
    const approvedOptionsCount =
      (actualEarlyCheckin ? 1 : 0) + (actualLateCheckout ? 1 : 0);

    return approvedOptionsCount === 2
      ? additionalPayment.amount
      : additionalPayment.amount / 2;
  };

  const additionalFeeAmount = calculateAdditionalFeeAmount();

  const handlePostPaidPayment = async (paymentId: string) => {
    try {
      setLoading(true);
      const result = await postPaidPayment(
        paymentId,
        parseInt(String(additionalFeeAmount)),
      );

      if ('success' in result && result.success) {
        showAlert('성공', result.message, 'success');
        if (selectedReservationId) {
          await fetchReservationDetail(selectedReservationId);
        }
      } else {
        showAlert(
          '실패',
          result.message || '알 수 없는 오류가 발생했습니다.',
          'error',
        );
      }
    } catch (error: any) {
      console.error('Failed to update payment:', error);
      showAlert(
        '오류',
        error.message || '알 수 없는 오류가 발생했습니다.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5" />
          결제 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {initialPayments.map((payment, index) => (
          <div key={payment.id} className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">금액:</span>
              <span>{payment.amount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">결제 상태:</span>
              <span>{paymentStatusMap[payment.status] || payment.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">결제 방법:</span>
              <span>{paymentMethodMap[payment.method] || payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">결제 일시:</span>
              <span>{formatDate(payment.createdAt)}</span>
            </div>
            {index < initialPayments.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>

      {hasAdditionalServices && additionalPayment && (
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
              <div className="flex justify-between">
                <span className="font-semibold">추가 결제 상태:</span>
                <span>
                  {paymentStatusMap[additionalPayment.status] ||
                    additionalPayment.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">추가 결제 방법:</span>
                <span>
                  {paymentMethodMap[additionalPayment.method] ||
                    additionalPayment.method}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold">추가 요금:</span>
                <span>{additionalFeeAmount.toLocaleString()}원</span>
              </div>
              {additionalPayment.status !== 'COMPLETED' && (
                <div className="py-5 mb-2">
                  <Button
                    className="float-end"
                    onClick={() => handlePostPaidPayment(additionalPayment.id)}
                  >
                    추가 결제 하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Card>
  );
}
