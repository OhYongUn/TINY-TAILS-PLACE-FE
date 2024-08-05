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

const BookingForm: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [numPets, setNumPets] = useState<string>('');
  const { isLoading, error, availableRooms, performSearch } = useRoomSearch();

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

  const handleNumPetsChange = (value: string) => {
    setNumPets(value);
  };

  const findAvailableRooms = async () => {
    if (dateRange?.from && dateRange?.to && numPets) {
      const params = {
        checkIn: dateRange.from.toISOString(),
        checkOut: dateRange.to.toISOString(),
        numPets: parseInt(numPets),
      };
      console.log('parmas', params);
      await performSearch(params);
    } else {
      // You might want to handle this error in the UI
      console.error('Please select both date range and number of pets.');
    }
  };

  return (
    <section className="bg-background py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateRangePicker
          dateRange={dateRange}
          onDateChange={handleDateSelect}
          disabledDays={{ before: today }}
          fromDate={today}
          toDate={oneYearLater}
        />
        <PetSelector onValueChange={handleNumPetsChange} />
        <div className="col-span-1 md:col-span-2">
          <Button
            className="w-full"
            onClick={findAvailableRooms}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Find Available Rooms'}
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {availableRooms.length > 0 && <AvailableRooms rooms={availableRooms} />}
      {availableRooms.length === 0 && !isLoading && !error && (
        <p className="mt-4">No rooms available for the selected criteria.</p>
      )}
    </section>
  );
};

export default BookingForm;
