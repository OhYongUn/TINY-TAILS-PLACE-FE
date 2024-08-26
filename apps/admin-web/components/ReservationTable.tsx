import React, { useState } from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { RoomRow } from './RoomRow';
import { Dialog } from '@repo/ui/components/ui/dialog';
import { ReservationDetail } from './ReservationDetail';
import {
  Room,
  ReservationDetailDto,
  ReservationDetailResponseDto,
} from '@app/types/reservation/type';
import { getReservationDetail } from '@app/actions/reservations/reservations-service';

interface ReservationTableProps {
  currentDate: Date;
  rooms: Room[];
}

export function ReservationTable({
  currentDate,
  rooms,
}: ReservationTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<ReservationDetailDto | null>(null);

  const daysInMonth = getDaysInMonth(currentDate);

  const handleCellDoubleClick = async (
    roomNumber: string,
    date: string,
    bookingId: string | null,
  ) => {
    if (!bookingId) {
      return;
    }
    try {
      const response: ReservationDetailResponseDto =
        await getReservationDetail(bookingId);
      if (response.success && response.data) {
        setSelectedBooking(response.data);
        setIsDialogOpen(true);
      } else {
        console.error('Failed to fetch reservation detail:', response.error);
      }
    } catch (error) {
      console.error('Error fetching reservation detail:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">객실</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="border p-2 text-sm">
                  {format(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      i + 1,
                    ),
                    'd',
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <RoomRow
                key={room.roomNumber}
                room={room}
                currentDate={currentDate}
                onCellDoubleClick={handleCellDoubleClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedBooking && (
          <ReservationDetail
            reservationDetail={selectedBooking}
            onClose={handleCloseDialog}
          />
        )}
      </Dialog>
    </>
  );
}
