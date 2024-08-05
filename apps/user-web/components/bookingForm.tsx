// BookingForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@repo/ui/components/ui/button';
import { DateRange } from 'react-day-picker';
import DateRangePicker from './DateRangePicker';
import PetSelector from './PetSelector';
import AvailableRooms from './AvailableRooms';

interface Room {
  id: number;
  name: string;
  capacity: number;
  price: number;
}

const BookingForm: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [numPets, setNumPets] = useState<string>('');
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  /*useEffect(() => {
    // 컴포넌트 마운트 시 비활성화할 날짜들을 가져옵니다
    const fetchDisabledDates = async () => {
      try {
        const response = await axios.get('/api/disabled-dates');
        setDisabledDates(
          response.data.map((dateString: string) => new Date(dateString)),
        );
      } catch (error) {
        console.error('Failed to fetch disabled dates:', error);
      }
    };

    fetchDisabledDates();
  }, []);*/

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleNumPetsChange = (value: string) => {
    setNumPets(value);
  };

  const findAvailableRooms = async () => {
    if (dateRange?.from && dateRange?.to && numPets) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post('/api/available-rooms', {
          checkIn: dateRange.from.toISOString(),
          checkOut: dateRange.to.toISOString(),
          numPets: parseInt(numPets),
        });

        setAvailableRooms(response.data);
      } catch (err) {
        setError('Failed to fetch available rooms. Please try again.');
        console.error('Error fetching available rooms:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please select both date range and number of pets.');
    }
  };
  const oneYearLater = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate(),
  );

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
