import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { HistoryIcon } from '@repo/ui/components/ui/lucide-react';
import {
  ReservationDetailDto,
  BookingStatusMap,
} from '@app/types/reservation/type';
import { formatDate } from '@app/utils/utils';

interface HistoryDetailsProps {
  reservationDetail: ReservationDetailDto;
}

export function HistoryDetails({ reservationDetail }: HistoryDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HistoryIcon className="h-5 w-5" />
          예약 히스토리
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {reservationDetail.statusHistories.map((history, index) => (
          <div key={history.id} className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">상태:</span>
              <span>{BookingStatusMap[history.status] || history.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">변경 일시:</span>
              <span>{formatDate(history.createdAt)}</span>
            </div>
            {history.reason && (
              <div className="flex justify-between">
                <span className="font-semibold">사유:</span>
                <span>{history.reason}</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
