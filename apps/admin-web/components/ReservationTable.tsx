// ReservationTable.tsx
import React from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { RoomRow } from '@app/components/RoomRow';
import { Room } from './ReservationStatus';

interface ReservationTableProps {
  currentDate: Date;
  rooms: Room[];
}

export function ReservationTable({
  currentDate,
  rooms,
}: ReservationTableProps) {
  const daysInMonth = getDaysInMonth(currentDate);

  return (
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
