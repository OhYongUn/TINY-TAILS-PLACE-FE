import React from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { Room } from '@app/types/reservation/type';

const statusColors: { [key: string]: string } = {
  CONFIRMED: 'bg-green-200',
  CHECKED_IN: 'bg-red-200',
  CHECKED_OUT: 'bg-yellow-200',
};

interface RoomRowProps {
  room: Room;
  currentDate: Date;
  onCellDoubleClick: (
    roomNumber: string,
    date: string,
    bookingId: string | null,
  ) => void;
}

export function RoomRow({
  room,
  currentDate,
  onCellDoubleClick,
}: RoomRowProps) {
  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <tr>
      <td className="border p-2 font-semibold">{room.roomNumber}</td>
      {Array.from({ length: daysInMonth }, (_, day) => {
        const date = format(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1),
          'yyyy-MM-dd',
        );
        const statusObj = room.status.find((s) => s.date === date);
        const status = statusObj ? statusObj.status : '';
        const bookingId = statusObj ? statusObj.bookingId : null;
        return (
          <td
            key={day}
            className={`border p-2 ${statusColors[status] || ''}`}
            title={`${room.roomNumber}호 ${date} : ${status}`}
            onDoubleClick={() =>
              onCellDoubleClick(room.roomNumber, date, bookingId)
            }
          >
            <span className="sr-only">
              {room.roomNumber}호 {date} : {status}
            </span>
          </td>
        );
      })}
    </tr>
  );
}
