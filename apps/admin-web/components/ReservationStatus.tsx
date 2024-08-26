'use cleint';
import React, { useState } from 'react';
import {
  format,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import { MonthSelector } from '@app/components/MonthSelector';
import { ReservationTable } from '@app/components/ReservationTable';
import { StatusLegend } from '@app/components/StatusLegend';

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
            // @ts-ignore
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
      <MonthSelector
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <ReservationTable currentDate={currentDate} rooms={rooms} />
      <StatusLegend />
    </div>
  );
}
