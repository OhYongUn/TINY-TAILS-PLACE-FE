'use client';

import { useState } from 'react';
import { TableCell, TableRow } from '@repo/ui/components/ui/table';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Eye } from '@repo/ui/components/ui/lucide-react';

import { format } from 'date-fns';
import { ReservationDetailDialog } from '@app/app/(home)/profile/_components/ReservationDetailDialog';
import { Bookings, BookingStatus } from '@app/interface/bookings/reservation';
import { getStatusInfo } from '@app/utills/utils';

interface ReservationTableRowProps {
  reservation: Bookings;
}

const ReservationTableRow = ({ reservation }: ReservationTableRowProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const statusInfo = getStatusInfo(reservation.status);

  return (
    <>
      <TableRow>
        <TableCell>{reservation.id}</TableCell>
        <TableCell>{reservation.roomDetail.room.name}</TableCell>
        <TableCell>
          {format(new Date(reservation.checkInDate), 'yyyy-MM-dd')}
        </TableCell>
        <TableCell>
          {format(new Date(reservation.checkOutDate), 'yyyy-MM-dd')}
        </TableCell>
        <TableCell>
          <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
        </TableCell>
        <TableCell>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            onClick={() => setIsDetailOpen(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            상세 보기
          </Button>
        </TableCell>
      </TableRow>
      {isDetailOpen && (
        <ReservationDetailDialog
          reservation={reservation}
          open={isDetailOpen}
          setIsOpen={setIsDetailOpen}
        />
      )}
    </>
  );
};

export default ReservationTableRow;
