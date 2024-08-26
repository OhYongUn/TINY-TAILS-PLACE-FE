'use cleint';
import React, { useState } from 'react';
import {
  format,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/ui/popover';
import { Calendar } from '@repo/ui/components/ui/calendar';

// 방 상태에 따른 색상 정의
const statusColors = {
  available: 'bg-green-200',
  booked: 'bg-red-200',
  cleaning: 'bg-yellow-200',
  maintenance: 'bg-gray-200',
};

type RoomStatus = keyof typeof statusColors;

interface Room {
  number: string;
  status: RoomStatus[];
}

// 샘플 데이터 (실제 사용 시 API에서 가져오거나 데이터베이스에서 조회해야 함)
const rooms: Room[] = [
  { number: '101', status: Array(31).fill('available') as RoomStatus[] },
  { number: '102', status: Array(31).fill('available') as RoomStatus[] },
  { number: '103', status: Array(31).fill('available') as RoomStatus[] },
  { number: '201', status: Array(31).fill('available') as RoomStatus[] },
  { number: '202', status: Array(31).fill('available') as RoomStatus[] },
];

// 샘플 예약 데이터 (실제 사용 시 API에서 가져와야 함)
const bookings = [
  { room: '101', startDay: 5, endDay: 10 },
  { room: '102', startDay: 1, endDay: 3 },
  { room: '103', startDay: 15, endDay: 20 },
  { room: '201', startDay: 7, endDay: 12 },
  { room: '202', startDay: 22, endDay: 25 },
];

export default function ReservationStatus() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // 예약 데이터를 rooms 배열에 적용
  const updateRoomStatus = () => {
    const updatedRooms = rooms.map((room) => ({
      ...room,
      status: Array(daysInMonth).fill('available') as RoomStatus[],
    }));

    bookings.forEach((booking) => {
      const roomIndex = updatedRooms.findIndex(
        (room) => room.number === booking.room,
      );
      if (roomIndex !== -1) {
        for (let i = booking.startDay - 1; i < booking.endDay; i++) {
          if (i < daysInMonth) {
            updatedRooms[roomIndex].status[i] = 'booked';
          }
        }
      }
    });

    return updatedRooms;
  };

  const updatedRooms = updateRoomStatus();

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">예약 현황</h1>
      <div className="flex items-center justify-between mb-4">
        <Button onClick={goToPreviousMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(currentDate, 'yyyy년 MM월')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={goToNextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
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
            {updatedRooms.map((room) => (
              <tr key={room.number}>
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
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex space-x-4">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center">
            <div className={`w-4 h-4 ${color} mr-2`}></div>
            <span className="text-sm">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
