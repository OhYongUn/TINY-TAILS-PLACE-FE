import { useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = async (paymentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const portone = await PortOne.loadModule('v2');
      await portone.initialize({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
      });

      const paymentResult = await portone.requestPayment({
        ...paymentData,
        orderName: paymentData.name,
      });

      if (paymentResult.status === 'SUCCESS') {
        // 결제 성공 처리
        console.log('결제 성공:', paymentResult);
        return paymentResult;
      } else {
        // 결제 실패 처리
        throw new Error(paymentResult.message || '결제에 실패했습니다.');
      }
    } catch (err) {
      setError(err.message || '결제 처리 중 오류가 발생했습니다.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { processPayment, isLoading, error };
};
