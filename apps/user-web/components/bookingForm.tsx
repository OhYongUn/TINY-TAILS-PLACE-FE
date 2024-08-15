// BookingForm.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { DateRange } from 'react-day-picker';
import DateRangePicker from './DateRangePicker';
import PetSelector from './PetSelector';
import AvailableRooms from './AvailableRooms';
import { Room } from '@app/interface/rooms/roomType';
import { useRoomSearch } from '@app/hook/room/roomServcie';
import { useBookingStore } from '@app/store/bookingStore';

const BookingForm = () => {
  const [numPets, setNumPets] = useState<string>('');
  const { isLoading, error, performSearch } = useRoomSearch();
  const { setAvailableRooms, setDateRange, dateRange } = useBookingStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneYearLater = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate(),
  );

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const formatDateToYYYYMMDD = (date: Date): string => {
    // @ts-ignore
    return date.toISOString().split('T')[0];
  };

  const findAvailableRooms = async () => {
    if (dateRange?.from && dateRange?.to) {
      const params = {
        checkIn: formatDateToYYYYMMDD(dateRange.from),
        checkOut: formatDateToYYYYMMDD(dateRange.to),
      };
      const results = await performSearch(params);
      setAvailableRooms(results);
    } else {
      console.error('Please select both date range and number of pets.');
    }
  };

  return (
    <section className="bg-background py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="md:col-span-2">
          <DateRangePicker
            dateRange={dateRange}
            onDateChange={handleDateSelect}
            disabledDays={{ before: today }}
            fromDate={today}
            toDate={oneYearLater}
          />
        </div>
        <div>
          <Button
            className="w-full h-12"
            onClick={findAvailableRooms}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Find Available Rooms'}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
  );
};

export default BookingForm;
