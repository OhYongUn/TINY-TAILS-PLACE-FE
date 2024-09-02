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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';

interface HistoryDetailsProps {
  reservationDetail: ReservationDetailDto;
}

export function HistoryDetails({ reservationDetail }: HistoryDetailsProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HistoryIcon className="h-5 w-5" />
          예약 히스토리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>상태</TableHead>
              <TableHead>변경 일시</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservationDetail.statusHistories.map((history) => (
              <TableRow key={history.id}>
                <TableCell>
                  {BookingStatusMap[history.status] || history.status}
                </TableCell>
                <TableCell>{formatDate(history.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
