'use server';
import api from '@app/utils/api';

export async function postPaidPayment(paymentId: string, amount: number) {
  try {
    const data = {
      paymentId,
      amount,
    };
    const response = await api.patch('admin-payments/payment/paid', {
      paymentId: paymentId,
      amount: amount,
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Failed to post paid payment');
    }
  } catch (err: any) {
    throw new Error(err.message || 'An unexpected error occurred');
  }
}
