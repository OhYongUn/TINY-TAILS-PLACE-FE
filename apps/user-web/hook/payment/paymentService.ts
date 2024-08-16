import { useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import {
  ConfirmBookingResponseDto,
  CreateBookingDto,
  InitiateBookingResponseDto,
} from '@app/interface/payment/paymentInterface';
import { apiRequest } from '@app/interface/ApiResponse';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateBooking = async (
    bookingData: CreateBookingDto,
  ): Promise<InitiateBookingResponseDto> => {
    const response = await apiRequest<InitiateBookingResponseDto>(
      '/api/bookings/initialize',
      'POST',
      bookingData,
    );
    if (!response.success) {
      throw new Error(
        response.error?.message || '예약 초기화 중 오류가 발생했습니다.',
      );
    }

    if (!response.data) {
      throw new Error('예약 데이터를 받지 못했습니다.');
    }
    return response.data;
  };

  const confirmPayment = async (
    bookingId: string,
    paymentId: string,
    transactionId: string,
    amount: number,
  ): Promise<ConfirmBookingResponseDto> => {
    const response = await apiRequest<ConfirmBookingResponseDto>(
      '/api/bookings/confirm',
      'POST',
      {
        bookingId,
        paymentId,
        amount,
        transactionId,
      },
    );
    if (!response.success) {
      throw new Error(
        response.error?.message || '결제 확인 중 오류가 발생했습니다.',
      );
    }
    if (!response.data) {
      throw new Error('결제 확정을 실패하엿습니다.');
    }
    return response?.data;
  };

  const createBookingAndPayment = async (bookingDetails: CreateBookingDto) => {
    setIsLoading(true);
    setError(null);

    try {
      //  예약 초기화 및 결제 준비
      const { bookingId, paymentId, amount } =
        await initiateBooking(bookingDetails);
      console.log('bookingId', bookingId);
      console.log('paymentId', paymentId);
      console.log('amount', amount);
      // PortOne SDK
      const paymentResponse = await PortOne.requestPayment({
        storeId: 'store-be02ad9c-b6ad-4831-8f5d-0ba503c5d25c',
        channelKey: 'channel-key-faf8f27a-203a-4f4d-8e34-3750ca8a7a55',
        paymentId: paymentId,
        orderName: `객실 예약 - ${bookingDetails.roomDetailId}`,
        totalAmount: amount,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        customer: {
          customerId: bookingDetails.userId.toString(),
          fullName: bookingDetails.userName,
          email: 'test@naver.com',
          phoneNumber: '010-1234-1234',
        },
      });

      if (!paymentResponse) {
        throw new Error('결제 응답을 받지 못했습니다.');
      }
      if (paymentResponse.code != null) {
        return alert(paymentResponse.message);
      }
      //  결제 확인
      const { bookingId: confirmedBookingId, paymentId: confirmedPaymentId } =
        await confirmPayment(
          bookingId,
          paymentId,
          paymentResponse.txId,
          amount,
        );
      return {
        success: true,
        bookingId: confirmedBookingId,
        paymentId: confirmedPaymentId,
        txId: paymentResponse.txId,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { createBookingAndPayment, isLoading, error };
};
