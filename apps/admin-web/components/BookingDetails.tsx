import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { HomeIcon } from '@repo/ui/components/ui/lucide-react';
import {
  ReservationDetailDto,
  BookingStatusMap,
} from '@app/types/reservation/type';
import { formatDate, formatPhoneNumber, isEmptyObject } from '@app/utils/utils';
import { Button } from '@repo/ui/components/ui/button';
import { useReservationStore } from '@app/store/reservation-store';
import { approveBookingOption } from '@app/actions/reservations/reservations-service';
import { useAlert } from '@app/components/AlertDialogProvider';

interface BookingDetailsProps {
  reservationDetail: ReservationDetailDto;
}

export function BookingDetails({ reservationDetail }: BookingDetailsProps) {
  const {
    selectedReservationId,
    setLoading,
    fetchReservationList,
    fetchReservationDetail,
  } = useReservationStore();
  const { showAlert } = useAlert();

  const { base, bookingDetails, user, roomDetail } = reservationDetail;

  const handleOptions = async (action: string, bookingDetailId: number) => {
    try {
      setLoading(true);
      const result = await approveBookingOption(action, bookingDetailId);
      if (result.success) {
        showAlert('성공', result.message, 'success');
        await fetchReservationList();
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
      console.error('Failed to approve booking option:', error);
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
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5" />
          예약 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex justify-between">
          <span className="font-semibold">예약 번호:</span>
          <span>{base.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">상태:</span>
          <span>{BookingStatusMap[base.status] || base.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">체크인:</span>
          <span>{formatDate(base.checkInDate, 'short')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">체크아웃:</span>
          <span>{formatDate(base.checkOutDate, 'short')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">객실:</span>
          <span>
            {roomDetail.roomNumber} ({roomDetail.roomName})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">예약자:</span>
          <span>
            {user.name}
            {user.phone ? `(${formatPhoneNumber(user.phone)})` : ''}
          </span>
        </div>
        {bookingDetails && !isEmptyObject(bookingDetails) && (
          <>
            <div className="flex justify-between">
              <span className="font-semibold">반려동물 수:</span>
              <span>{bookingDetails.petCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">요청사항:</span>
              <span>{bookingDetails.request || '없음'}</span>
            </div>
            {bookingDetails.requestedLateCheckout && (
              <div className="flex justify-between items-center">
                <span className="font-semibold">레이트 체크아웃 요청:</span>
                <div className="flex items-center space-x-2">
                  {bookingDetails.actualLateCheckout ? (
                    <Badge variant="default">승인 완료</Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleOptions('lateCheckOut', bookingDetails.id)
                      }
                    >
                      승인
                    </Button>
                  )}
                </div>
              </div>
            )}

            {bookingDetails.requestedEarlyCheckin && (
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">얼리 체크인 요청:</span>
                <div className="flex items-center space-x-2">
                  {bookingDetails.actualEarlyCheckin ? (
                    <Badge variant="default">승인 완료</Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleOptions('earlyCheckin', bookingDetails.id)
                      }
                    >
                      승인
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
