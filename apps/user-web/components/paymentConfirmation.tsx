import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/ui/alert-dialog';
import { usePayment } from '@app/hook/payment/paymentService';
import {
  BookingStatus,
  CreateBookingDto,
} from '@app/interface/payment/paymentInterface';
import useUserStore from '@app/store/userStore';

interface PaymentConfirmationProps {
  formData: any;
  basePrice: number;
  additionalFees: number;
  onClose: () => void;
}

const PaymentConfirmation = ({
  formData,
  basePrice,
  additionalFees,
  onClose,
}: PaymentConfirmationProps) => {
  const { createBookingAndPayment, isLoading, error } = usePayment();
  const { user, isLoggedIn } = useUserStore();
  const handlePaymentConfirm = async () => {
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }
    onClose();

    const data: CreateBookingDto = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      roomDetailId: parseInt(formData.roomId, 10),
      checkInDate: new Date(formData.checkInDate),
      checkOutDate: new Date(formData.checkOutDate),
      requestedLateCheckout: formData.requestedLateCheckout,
      requestedEarlyCheckin: formData.requestedEarlyCheckin,
      petCount: parseInt(formData.petCount, 10),
      basePrice: basePrice,
      additionalFees: additionalFees,
      totalPrice: basePrice + additionalFees,
      status: BookingStatus.PENDING,
      request: formData.request,
    };

    try {
      const result = await createBookingAndPayment(data);
      if (result?.success) {
        alert('결제 성공하엿습니다,');
      } else {
        alert('결제 실패하였습니다');
      }
      console.log('결제 리스폰스!!!!!!!!!', result);
    } catch (err) {
      console.error('결제 실패', err);
    }
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>결제 확인</AlertDialogTitle>
          <AlertDialogDescription>
            <p>실제 결제 금액: {basePrice.toLocaleString()}원</p>
            {additionalFees > 0 && (
              <p className="text-sm text-gray-500">
                * 추가 요금 {additionalFees.toLocaleString()}원은 현장에서
                결제됩니다.
              </p>
            )}
            결제를 진행하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => handlePaymentConfirm()}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentConfirmation;
