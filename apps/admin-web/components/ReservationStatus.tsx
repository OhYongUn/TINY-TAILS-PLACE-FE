// ReservationStatus.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MonthSelector } from '@app/components/MonthSelector';
import { ReservationTable } from '@app/components/ReservationTable';
import { StatusLegend } from '@app/components/StatusLegend';
import { getRoomStatus } from '@app/actions/reservations/reservations-api';
import { Room } from '@app/types/reservation/type';

export default function ReservationStatus() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Room[] | null>(null);

  const fetchRoomStatus = useCallback(async (date: Date) => {
    setError(null);
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const result = await getRoomStatus(year, month);
      if (result.success) {
        setReservations(result.data.rooms as Room[]);
      } else {
        setError(result.error || 'Failed to fetch room status');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
    }
  }, []);

  useEffect(() => {
    fetchRoomStatus(currentDate);
  }, [currentDate, fetchRoomStatus]);

  const handleDateChange = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white">
      <MonthSelector
        currentDate={currentDate}
        onDateChange={handleDateChange}
      />
      {reservations && (
        <ReservationTable currentDate={currentDate} rooms={reservations} />
      )}
      <StatusLegend />
    </div>
  );
}
