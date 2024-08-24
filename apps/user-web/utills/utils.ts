import { BookingStatus } from '@app/interface/bookings/reservation';

export const getStatusInfo = (
  status: BookingStatus,
): {
  text: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} => {
  switch (status) {
    case BookingStatus.CONFIRMED:
      return { text: '결제완료', variant: 'default' };
    case BookingStatus.COMPLETED:
      return { text: '투숙완료', variant: 'secondary' };
    case BookingStatus.CANCELLED:
      return { text: '취소', variant: 'destructive' };
    default:
      return { text: '알 수 없음', variant: 'outline' };
  }
};
