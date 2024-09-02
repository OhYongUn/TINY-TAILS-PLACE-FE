import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { BookingDetails } from './BookingDetails';
import { PaymentDetails } from './PaymentDetails';
import { HistoryDetails } from './HistoryDetails';
import { useReservationStore } from '@app/store/reservation-store';

export function ReservationDetailDialog() {
  const { isDialogOpen, reservationDetail, selectedDetailType, closeDialog } =
    useReservationStore();

  if (!reservationDetail) return null;

  const renderContent = () => {
    switch (selectedDetailType) {
      case 'bookingDetails':
        return <BookingDetails reservationDetail={reservationDetail} />;
      case 'payments':
        return <PaymentDetails reservationDetail={reservationDetail} />;
      case 'statusHistories':
        return <HistoryDetails reservationDetail={reservationDetail} />;
      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (selectedDetailType) {
      case 'bookingDetails':
        return '예약 정보';
      case 'payments':
        return '결제 정보';
      case 'statusHistories':
        return '예약 히스토리';
      default:
        return '상세 정보';
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
