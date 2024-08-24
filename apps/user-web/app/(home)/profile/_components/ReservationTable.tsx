'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@repo/ui/components/ui/table';
import ReservationTableRow from './ReservationTableRow';
import { Bookings } from '@app/interface/bookings/reservation';

interface ReservationTableProps {
  reservations: Bookings[];
}

const ReservationTable = ({ reservations }: ReservationTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>예약 번호</TableHead>
          <TableHead>방 이름</TableHead>
          <TableHead>체크인</TableHead>
          <TableHead>체크아웃</TableHead>
          <TableHead>상태</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(reservations) && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationTableRow
              key={reservation.id}
              reservation={reservation}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              예약 정보가 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReservationTable;
