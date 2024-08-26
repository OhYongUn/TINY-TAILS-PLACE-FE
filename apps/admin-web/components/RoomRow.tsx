import React from 'react';
import { format } from 'date-fns';

interface Room {
  number: string;
  status: RoomStatus[];
}

type RoomStatus = 'available' | 'booked' | 'cleaning' | 'maintenance';

const statusColors = {
  available: 'bg-green-200',
  booked: 'bg-red-200',
  cleaning: 'bg-yellow-200',
  maintenance: 'bg-gray-200',
};

interface RoomRowProps {
  room: Room;
  currentDate: Date;
}

export function RoomRow({ room, currentDate }: RoomRowProps) {
  return (
    <tr>
      <td className="border p-2 font-semibold">{room.number}</td>
      {room.status.map((status, day) => (
        <td
          key={day}
          className={`border p-2 ${statusColors[status]}`}
          title={`${room.number}호 ${format(new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1), 'yyyy-MM-dd')} : ${status}`}
        >
          <span className="sr-only">
            {room.number}호{' '}
            {format(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day + 1,
              ),
              'yyyy-MM-dd',
            )}{' '}
            : {status}
          </span>
        </td>
      ))}
    </tr>
  );
}
